import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// Helper function to determine media type
function determineMediaType(base64Data) {
  if (base64Data.startsWith('/9j/')) return 'image/jpeg';
  if (base64Data.startsWith('iVBORw0KGgo')) return 'image/png';
  if (base64Data.startsWith('R0lGODlh')) return 'image/gif';
  if (base64Data.startsWith('UklGR')) return 'image/webp';
  return 'image/jpeg'; // Default
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Processing Claude extraction request...');

    // Parse the FormData
    const formData = await req.formData ? req.formData() : req.body;
    
    // Get the uploaded image
    let imageData;
    
    if (req.formData) {
      // If using FormData
      const imageFile = formData.get('image');
      if (!imageFile) {
        return res.status(400).json({ 
          success: false, 
          error: 'No image provided' 
        });
      }
      
      // Convert to base64
      const buffer = await imageFile.arrayBuffer();
      imageData = Buffer.from(buffer).toString('base64');
    } else {
      // If using JSON body
      imageData = req.body.image;
      if (!imageData) {
        return res.status(400).json({ 
          success: false, 
          error: 'No image provided' 
        });
      }
    }

    // Enhanced prompt for stone fabrication drawings
    const analysisPrompt = `You are an expert stone fabrication analyst. Analyze this technical drawing and extract ALL stone pieces with their dimensions.

INSTRUCTIONS:
1. Find EVERY piece that needs to be cut from stone
2. Extract exact dimensions in inches (convert if needed)
3. Identify piece names/labels if visible
4. Detect edge treatments (look for edge callouts)
5. Note any special requirements or details
6. Group pieces by type (countertop, island, backsplash, etc.)

IMPORTANT GUIDELINES:
- Be precise with measurements
- If dimensions are unclear, mark as "unclear" 
- Include ALL pieces, even small ones
- Look for dimension lines, callouts, and labels
- Consider typical stone fabrication pieces

REQUIRED JSON OUTPUT FORMAT:
{
  "success": true,
  "data": {
    "pieces": [
      {
        "name": "piece_name_or_description",
        "width": number_in_inches,
        "depth": number_in_inches,
        "edgeDetail": "Eased|Bullnose|Ogee|1.5 mitered|Beveled",
        "notes": "any_special_requirements_or_details",
        "type": "countertop|island|backsplash|vanity|other",
        "area": calculated_square_feet
      }
    ],
    "summary": {
      "totalPieces": number,
      "totalArea": total_square_feet,
      "drawingType": "kitchen|bathroom|commercial|other",
      "confidence": "high|medium|low"
    }
  }
}

If you cannot find clear dimensions, return:
{
  "success": false,
  "error": "Could not extract clear dimensions from drawing",
  "suggestions": ["specific_issues_found"]
}

Analyze the drawing now and return ONLY the JSON response:`;

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.1,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: determineMediaType(imageData),
              data: imageData
            }
          },
          {
            type: 'text',
            text: analysisPrompt
          }
        ]
      }]
    });

    console.log('Claude API response received');

    // Parse Claude's response
    const claudeResponse = response.content[0].text;
    
    // Extract JSON from Claude's response
    const jsonMatch = claudeResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Claude response');
    }

    const extractedData = JSON.parse(jsonMatch[0]);
    
    // Validate and enhance the response
    if (extractedData.success && extractedData.data && extractedData.data.pieces) {
      // Calculate areas and validate data
      extractedData.data.pieces = extractedData.data.pieces.map(piece => ({
        ...piece,
        area: piece.area || (piece.width * piece.depth / 144),
        width: Number(piece.width),
        depth: Number(piece.depth),
        edgeDetail: piece.edgeDetail || 'Eased'
      }));

      // Add metadata
      extractedData.data.extractedAt = new Date().toISOString();
      extractedData.data.aiModel = 'claude-3-5-sonnet';
      extractedData.data.version = '2.0';
    }

    console.log('Sending successful response');
    return res.status(200).json(extractedData);

  } catch (error) {
    console.error('Claude API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Analysis failed',
      details: error.message,
      suggestions: [
        'Ensure the drawing has clear dimension lines',
        'Check if text is readable',
        'Try uploading a higher resolution image',
        'Verify the drawing shows stone fabrication details'
      ]
    });
  }
}