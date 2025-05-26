import { useState, useEffect } from 'react';

// Slab Layout Visualization Component
const SlabLayoutVisualization = ({ pieces, slabWidth, slabHeight, maxPiecesPerSlab, includeKerf, kerfWidth, showMaxLayout = false }) => {
  if (!pieces || pieces.length === 0) return null;

  const pieceWidth = pieces[0]?.width || 0;
  const pieceHeight = pieces[0]?.depth || 0;
  const kerf = includeKerf ? kerfWidth : 0;

  const generateOptimalLayout = () => {
    const layout = [];
    // Show the maximum pieces that can fit if showMaxLayout is true
    const targetPieces = showMaxLayout ? maxPiecesPerSlab : Math.min(pieces.length, maxPiecesPerSlab);
    
    // Calculate how many pieces fit in each orientation
    const verticalCols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf));
    const verticalRows = Math.floor((slabHeight + kerf) / (pieceHeight + kerf));
    const verticalTotal = verticalCols * verticalRows;
    
    const horizontalCols = Math.floor((slabWidth + kerf) / (pieceHeight + kerf));
    const horizontalRows = Math.floor((slabHeight + kerf) / (pieceWidth + kerf));
    const horizontalTotal = horizontalCols * horizontalRows;
    
    // Check if we can achieve the target with pure orientations
    if (verticalTotal >= targetPieces) {
      // Use vertical orientation
      for (let row = 0; row < verticalRows && layout.length < targetPieces; row++) {
        for (let col = 0; col < verticalCols && layout.length < targetPieces; col++) {
          layout.push({
            x: col * (pieceWidth + kerf),
            y: row * (pieceHeight + kerf),
            width: pieceWidth,
            height: pieceHeight,
            orientation: 'vertical',
            id: layout.length + 1
          });
        }
      }
    } else if (horizontalTotal >= targetPieces) {
      // Use horizontal orientation
      for (let row = 0; row < horizontalRows && layout.length < targetPieces; row++) {
        for (let col = 0; col < horizontalCols && layout.length < targetPieces; col++) {
          layout.push({
            x: col * (pieceHeight + kerf),
            y: row * (pieceWidth + kerf),
            width: pieceHeight,
            height: pieceWidth,
            orientation: 'horizontal',
            id: layout.length + 1
          });
        }
      }
    } else {
      // Mixed orientation - this is what achieves 8 pieces for 24x36 on 126x63
      // Try combination: some vertical (24x36) and some horizontal (36x24)
      
      // First, try placing vertical pieces in one row
      const vRow = Math.floor((slabHeight + kerf) / (pieceHeight + kerf)); // 1 row of 36" tall pieces
      const vCols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf)); // 5 pieces of 24" wide
      
      if (vRow > 0) {
        for (let col = 0; col < vCols && layout.length < targetPieces; col++) {
          layout.push({
            x: col * (pieceWidth + kerf),
            y: 0,
            width: pieceWidth,
            height: pieceHeight,
            orientation: 'vertical',
            id: layout.length + 1
          });
        }
        
        // Calculate remaining height after first row
        const usedHeight = pieceHeight + kerf;
        const remainingHeight = slabHeight - usedHeight;
        
        // Now place horizontal pieces in remaining space
        if (remainingHeight >= pieceWidth - kerf) {
          const hRows = Math.floor((remainingHeight + kerf) / (pieceWidth + kerf));
          const hCols = Math.floor((slabWidth + kerf) / (pieceHeight + kerf));
          
          for (let row = 0; row < hRows && layout.length < targetPieces; row++) {
            for (let col = 0; col < hCols && layout.length < targetPieces; col++) {
              layout.push({
                x: col * (pieceHeight + kerf),
                y: usedHeight + row * (pieceWidth + kerf),
                width: pieceHeight,
                height: pieceWidth,
                orientation: 'horizontal',
                id: layout.length + 1
              });
            }
          }
        }
      }
    }
    
    return layout;
  };

  const layoutPieces = generateOptimalLayout();
  
  // For a 126x63 slab with 24x36 pieces, this should show 4 columns × 2 rows = 8 pieces
  console.log('Layout debug:', {
    slabWidth, slabHeight,
    pieceWidth, pieceHeight,
    kerf,
    targetPieces: showMaxLayout ? maxPiecesPerSlab : Math.min(pieces.length, maxPiecesPerSlab),
    verticalCols: Math.floor((slabWidth + kerf) / (pieceWidth + kerf)),
    verticalRows: Math.floor((slabHeight + kerf) / (pieceHeight + kerf)),
    layoutPiecesCount: layoutPieces.length
  });
  
  const containerWidth = 400;
  const containerHeight = 250;
  const scaleX = containerWidth / slabWidth;
  const scaleY = containerHeight / slabHeight;
  const scale = Math.min(scaleX, scaleY) * 0.9;

  const scaledSlabWidth = slabWidth * scale;
  const scaledSlabHeight = slabHeight * scale;

  return (
    <div className="relative">
      <div className="mb-2 text-xs text-gray-500 text-center">
        Slab: {slabWidth}" × {slabHeight}"
      </div>
      
      <div 
        className="relative border-2 border-[#0A4F63] bg-[#E8F1F4] mx-auto" 
        style={{ 
          width: `${scaledSlabWidth}px`, 
          height: `${scaledSlabHeight}px`
        }}
      >
        {layoutPieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute border flex items-center justify-center text-xs font-semibold bg-[#40E0D0] bg-opacity-30 border-[#40E0D0]`}
            style={{
              left: `${piece.x * scale}px`,
              top: `${piece.y * scale}px`,
              width: `${piece.width * scale}px`,
              height: `${piece.height * scale}px`,
            }}
          >
            <div className="text-center">
              <div className="text-sm font-semibold">{piece.id}</div>
              <div className="text-[10px]">{piece.width}×{piece.height}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        {pieces.length < maxPiecesPerSlab ? 
          `Showing ${layoutPieces.length} of ${pieces.length} pieces ordered (max ${maxPiecesPerSlab}/slab)` :
          `Showing ${layoutPieces.length} pieces (max capacity per slab)`
        }
      </div>
    </div>
  );
};

export default function StoneTopEstimator() {
  const [stoneOptions, setStoneOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const correctPassword = 'stone123';
  const [showResults, setShowResults] = useState(false);

  // Enhanced settings
  const [includeKerf, setIncludeKerf] = useState(true);
  const [kerfWidth, setKerfWidth] = useState(0.125);
  const [breakageBuffer, setBreakageBuffer] = useState(10);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showVisualLayouts, setShowVisualLayouts] = useState(true);

  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [products, setProducts] = useState([
    { 
      stone: '', 
      width: '', 
      depth: '', 
      quantity: 1, 
      edgeDetail: 'Eased', 
      result: null, 
      id: Date.now(),
      customName: '',
      priority: 'normal',
      note: ''
    }
  ]);
  const [allResults, setAllResults] = useState([]);
  
  // Add email state variables
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  // Add save/load state
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);
  const [quoteName, setQuoteName] = useState('');

  useEffect(() => {
    // Load saved quotes from localStorage
    const saved = localStorage.getItem('aicSavedQuotes');
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }

    fetch("https://opensheet.elk.sh/1g8w934dZH-NEuKfK8wg_RZYiXyLSSf87H0Xwec6KAAc/Sheet1")
      .then((res) => res.json())
      .then((data) => {
        setStoneOptions(data);
        setProducts((prev) =>
          prev.map((p) => ({ ...p, stone: data[0]?.["Stone Type"] || '' }))
        );
      })
      .catch((error) => {
        console.error("Failed to load stone data:", error);
        setStoneOptions([]);
      });
  }, []);

  // Save quote function
  const saveQuote = () => {
    const quoteName = prompt('Enter a name for this quote:');
    if (!quoteName) return;

    const quoteData = {
      id: Date.now(),
      name: quoteName,
      date: new Date().toISOString(),
      userInfo,
      products: products.map(p => ({...p, result: null})), // Don't save results
      settings: {
        includeKerf,
        kerfWidth,
        breakageBuffer,
        showVisualLayouts
      }
    };

    const newSavedQuotes = [...savedQuotes, quoteData];
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem('aicSavedQuotes', JSON.stringify(newSavedQuotes));
    alert('Quote saved successfully!');
  };

  // Load quote function
  const loadQuote = (quote) => {
    setUserInfo(quote.userInfo);
    setProducts(quote.products);
    setIncludeKerf(quote.settings.includeKerf);
    setKerfWidth(quote.settings.kerfWidth);
    setBreakageBuffer(quote.settings.breakageBuffer);
    setShowVisualLayouts(quote.settings.showVisualLayouts);
    setShowSavedQuotes(false);
    alert('Quote loaded successfully!');
  };

  // Delete quote function
  const deleteQuote = (quoteId) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      const newSavedQuotes = savedQuotes.filter(q => q.id !== quoteId);
      setSavedQuotes(newSavedQuotes);
      localStorage.setItem('aicSavedQuotes', JSON.stringify(newSavedQuotes));
    }
  };

  // Calculate maximum pieces that can fit per slab with optimal mixed orientations
  const calculateMaxPiecesPerSlab = (pieceW, pieceH, slabW, slabH) => {
    const kerf = includeKerf ? kerfWidth : 0;
    let maxPieces = 0;

    // Option 1: All pieces in orientation 1 (w × h)
    const fit1W = Math.floor((slabW + kerf) / (pieceW + kerf));
    const fit1H = Math.floor((slabH + kerf) / (pieceH + kerf));
    const option1 = fit1W * fit1H;

    // Option 2: All pieces in orientation 2 (h × w)  
    const fit2W = Math.floor((slabW + kerf) / (pieceH + kerf));
    const fit2H = Math.floor((slabH + kerf) / (pieceW + kerf));
    const option2 = fit2W * fit2H;

    maxPieces = Math.max(option1, option2);

    // Debug log
    console.log('Max pieces calculation:', {
      pieceW, pieceH, slabW, slabH, kerf,
      option1: `${fit1W}×${fit1H}=${option1}`,
      option2: `${fit2W}×${fit2H}=${option2}`,
      maxPieces
    });

    // Option 3: Mixed orientations
    for (let rows1 = 0; rows1 <= Math.floor((slabH + kerf) / (pieceH + kerf)); rows1++) {
      const usedHeight1 = Math.max(0, rows1 * (pieceH + kerf) - kerf);
      const remainingHeight = slabH - usedHeight1;
      
      const pieces1 = rows1 * Math.floor((slabW + kerf) / (pieceW + kerf));
      
      if (remainingHeight >= pieceW) {
        const rows2 = Math.floor((remainingHeight + kerf) / (pieceW + kerf));
        const pieces2 = rows2 * Math.floor((slabW + kerf) / (pieceH + kerf));
        maxPieces = Math.max(maxPieces, pieces1 + pieces2);
      } else {
        maxPieces = Math.max(maxPieces, pieces1);
      }
    }

    for (let rows2 = 0; rows2 <= Math.floor((slabH + kerf) / (pieceW + kerf)); rows2++) {
      const usedHeight2 = Math.max(0, rows2 * (pieceW + kerf) - kerf);
      const remainingHeight = slabH - usedHeight2;
      
      const pieces2 = rows2 * Math.floor((slabW + kerf) / (pieceH + kerf));
      
      if (remainingHeight >= pieceH) {
        const rows1 = Math.floor((remainingHeight + kerf) / (pieceH + kerf));
        const pieces1 = rows1 * Math.floor((slabW + kerf) / (pieceW + kerf));
        maxPieces = Math.max(maxPieces, pieces1 + pieces2);
      } else {
        maxPieces = Math.max(maxPieces, pieces2);
      }
    }

    return maxPieces;
  };

  // Enhanced drawing upload with Claude backend
  const handleDrawingUpload = async (e, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setLoadingAI(true);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      reader.onload = async () => {
        try {
          // Extract base64 data
          const base64Data = reader.result.split(',')[1];
          
          // Call API with JSON body
          const response = await fetch('/api/claude-extract-dimensions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Data
            })
          });

          const result = await response.json();
          
          if (result.success && result.data.pieces) {
            handleClaudeMultiplePiecesExtraction(result.data, index);
          } else {
            const errorMsg = result.error || "Analysis failed";
            const suggestions = result.suggestions ? "\n\nSuggestions:\n• " + result.suggestions.join("\n• ") : "";
            alert(`❌ AI Analysis Failed\n\n${errorMsg}${suggestions}`);
          }
        } catch (error) {
          console.error("Claude analysis error:", error);
          alert("❌ Failed to analyze drawing: " + error.message);
        } finally {
          setLoadingAI(false);
        }
      };
      
      reader.onerror = () => {
        setLoadingAI(false);
        alert("❌ Failed to read file");
      };
      
    } catch (error) {
      console.error("File processing error:", error);
      setLoadingAI(false);
      alert("❌ Failed to process file: " + error.message);
    }
  };

  const handleClaudeMultiplePiecesExtraction = (claudeData, currentIndex) => {
    console.log("Claude extracted data:", claudeData);
    
    const { pieces, summary } = claudeData;
    
    const groupedPieces = {};
    
    pieces.forEach(piece => {
      const key = `${piece.width}x${piece.depth}x${piece.edgeDetail}`;
      if (groupedPieces[key]) {
        groupedPieces[key].quantity += 1;
        groupedPieces[key].names.push(piece.name);
      } else {
        groupedPieces[key] = {
          width: piece.width,
          depth: piece.depth,
          quantity: 1,
          names: [piece.name],
          edgeDetail: piece.edgeDetail || 'Eased',
          type: piece.type || 'countertop',
          notes: piece.notes || ''
        };
      }
    });

    const newProducts = [];
    let productCounter = 1;

    for (let i = 0; i < currentIndex; i++) {
      newProducts.push(products[i]);
    }

    Object.keys(groupedPieces).forEach(key => {
      const group = groupedPieces[key];
      
      let productName;
      if (group.quantity > 1) {
        const baseName = group.names[0] || group.type;
        productName = `${baseName} (${group.quantity}x)`;
      } else {
        productName = group.names[0] || `${group.type} ${productCounter}`;
      }
      
      newProducts.push({
        stone: products[currentIndex].stone,
        width: group.width.toString(),
        depth: group.depth.toString(),
        quantity: group.quantity,
        edgeDetail: group.edgeDetail,
        result: null,
        id: Date.now() + productCounter,
        customName: productName,
        priority: group.type === 'island' ? 'high' : 'normal',
        note: group.notes + (group.quantity > 1 ? ` | Combined ${group.quantity} identical pieces` : ''),
        aiExtracted: true,
        pieceType: group.type
      });
      productCounter++;
    });

    for (let i = currentIndex + 1; i < products.length; i++) {
      newProducts.push(products[i]);
    }

    setProducts(newProducts);
    
    const totalPieces = pieces.length;
    const uniqueSizes = Object.keys(groupedPieces).length;
    const confidence = summary?.confidence || 'medium';
    const drawingType = summary?.drawingType || 'unknown';
    
    alert(`🤖 Claude AI Successfully Analyzed Drawing!\n\n` +
          `📐 Drawing Type: ${drawingType.charAt(0).toUpperCase() + drawingType.slice(1)}\n` +
          `✅ Found: ${totalPieces} pieces (${uniqueSizes} unique sizes)\n` +
          `🎯 Confidence: ${confidence.charAt(0).toUpperCase() + confidence.slice(1)}\n\n` +
          `📋 Products Created:\n${Object.keys(groupedPieces).map(key => {
            const group = groupedPieces[key];
            return `• ${group.names[0]} - ${group.width}"×${group.depth}" (${group.quantity}x)`;
          }).join('\n')}`);
  };

  const updateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { 
        stone: stoneOptions[0]?.["Stone Type"] || '', 
        width: '', 
        depth: '', 
        quantity: 1, 
        edgeDetail: 'Eased', 
        result: null, 
        id: Date.now(),
        customName: '',
        priority: 'normal',
        note: ''
      }
    ]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // New PDF Generation Function
  const generateQuotePDF = () => {
    console.log('generateQuotePDF function called!');
    console.log('allResults data:', allResults);
    
    if (!allResults || allResults.length === 0) {
      alert("Please calculate estimates first");
      return;
    }

    // Calculate totals
    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    const avgEfficiency = allResults.length > 0 ? 
      (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';

    // Create a new window
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    
    if (!printWindow) {
      console.log('Popup blocked, trying alternative method...');
      // Alternative: Replace current page content
      showPrintView();
      return;
    }

    // Build the HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AIC Surfaces Quote</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; margin: 0; }
          .container { max-width: 800px; margin: 0 auto; }
          h1, h2 { text-align: center; }
          h1 { color: #0A4F63; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background: #0A4F63; color: white; }
          .total-row { background: #f0f0f0; font-weight: bold; }
          .info-box { background: #f5f5f5; padding: 20px; margin: 20px 0; }
          .stats { text-align: center; margin: 40px 0; }
          .stat-box { display: inline-block; margin: 0 20px; padding: 20px; background: #e8f4f8; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>AIC SURFACES</h1>
          <h2>OPTIMIZED STONE QUOTE</h2>
          <p style="text-align: center;">Date: ${new Date().toLocaleDateString()}</p>
          
          <div class="info-box">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${userInfo.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${userInfo.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${userInfo.phone || 'N/A'}</p>
          </div>
          
          <h3>Quote Details</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stone</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Slabs</th>
                <th>Efficiency</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${allResults.map((p, i) => `
                <tr>
                  <td>${p.customName || `Product ${i + 1}`}</td>
                  <td>${p.stone}</td>
                  <td>${p.width}×${p.depth}"</td>
                  <td style="text-align: center;">${p.quantity}</td>
                  <td style="text-align: center;">${p.result?.totalSlabsNeeded || 0}</td>
                  <td style="text-align: center;">${p.result?.efficiency?.toFixed(1) || '0'}%</td>
                  <td style="text-align: right;">${p.result?.finalPrice?.toFixed(2) || '0.00'}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="6" style="text-align: right;">Total:</td>
                <td style="text-align: right;">${totalPrice}</td>
              </tr>
            </tfoot>
          </table>
          
          <div class="stats">
            <div class="stat-box">
              <h4>Total Slabs</h4>
              <p style="font-size: 24px; font-weight: bold; margin: 0;">${totalSlabs}</p>
            </div>
            <div class="stat-box">
              <h4>Average Efficiency</h4>
              <p style="font-size: 24px; font-weight: bold; margin: 0;">${avgEfficiency}%</p>
            </div>
          </div>
          
          <hr>
          <p style="text-align: center;">This quote is valid for 30 days</p>
          <p style="text-align: center;">Generated by AIC Surfaces Stone Estimator</p>
          
          <div class="no-print" style="text-align: center; margin-top: 40px;">
            <button onclick="window.print()" style="padding: 10px 30px; background: #0A4F63; color: white; border: none; cursor: pointer;">
              Print / Save as PDF
            </button>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  // Alternative method if popup is blocked
  const showPrintView = () => {
    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    
    // Store current content
    const originalContent = document.body.innerHTML;
    
    // Create print view
    document.body.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 40px;">
        <h1 style="text-align: center; color: #0A4F63;">AIC SURFACES - QUOTE</h1>
        <p style="text-align: center;">Customer: ${userInfo.name || 'N/A'} | Date: ${new Date().toLocaleDateString()}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 40px 0;">
          <tr style="background: #0A4F63; color: white;">
            <th style="border: 1px solid #ddd; padding: 10px;">Product</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Stone</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Size</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Qty</th>
            <th style="border: 1px solid #ddd; padding: 10px;">Price</th>
          </tr>
          ${allResults.map(p => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">${p.customName || 'Product'}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${p.stone}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${p.width}×${p.depth}"</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${p.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">${(p.result?.finalPrice || 0).toFixed(2)}</td>
            </tr>
          `).join('')}
          <tr style="background: #f0f0f0; font-weight: bold;">
            <td colspan="4" style="border: 1px solid #ddd; padding: 10px; text-align: right;">Total:</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">${totalPrice}</td>
          </tr>
        </table>
        
        <p style="text-align: center; font-size: 18px;">Total Slabs: ${totalSlabs}</p>
        
        <div style="text-align: center; margin-top: 40px;">
          <button onclick="window.print()" style="padding: 15px 40px; background: #0A4F63; color: white; border: none; font-size: 18px; cursor: pointer; margin-right: 10px;">
            Print / Save as PDF
          </button>
          <button onclick="location.reload()" style="padding: 15px 40px; background: #666; color: white; border: none; font-size: 18px; cursor: pointer;">
            Go Back
          </button>
        </div>
      </div>
    `;
    
    // Auto-focus on print
    window.print();
  };

  const calculateAll = () => {
    console.log("Calculate button clicked!");
    
    const results = products.map((product) => {
      const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
      if (!stone) return { ...product, result: null };

      const slabCost = parseFloat(stone["Slab Cost"]);
      const fabCost = parseFloat(stone["Fab Cost"]);
      const markup = parseFloat(stone["Mark Up"]);
      const w = parseFloat(product.width);
      const d = parseFloat(product.depth);
      const quantity = parseInt(product.quantity);

      if (!w || !d || isNaN(slabCost) || isNaN(fabCost) || isNaN(markup)) return { ...product, result: null };

      const slabWidth = parseFloat(stone["Slab Width"]);
      const slabHeight = parseFloat(stone["Slab Height"]);

      const pieces = Array(quantity).fill().map((_, i) => ({
        id: i + 1,
        width: w,
        depth: d,
        name: `${product.stone} #${i + 1}`
      }));

      const maxPiecesPerSlab = calculateMaxPiecesPerSlab(w, d, slabWidth, slabHeight);
      
      const area = w * d;
      const usableAreaSqft = (area / 144) * quantity;
      const totalSlabsNeeded = Math.ceil(quantity / maxPiecesPerSlab);
      const totalSlabArea = totalSlabsNeeded * slabWidth * slabHeight;
      const totalUsedArea = pieces.reduce((sum, p) => sum + p.width * p.depth, 0);
      const efficiency = totalSlabArea > 0 ? (totalUsedArea / totalSlabArea) * 100 : 0;
      
      const materialCost = (slabCost * totalSlabsNeeded) * (1 + breakageBuffer/100);
      const fabricationCost = usableAreaSqft * fabCost;
      const rawCost = materialCost + fabricationCost;
      const finalPrice = rawCost * markup;

      return {
        ...product,
        result: {
          usableAreaSqft,
          totalSlabsNeeded,
          efficiency,
          materialCost,
          fabricationCost,
          rawCost,
          finalPrice,
          topsPerSlab: maxPiecesPerSlab
        }
      };
    });

    const updatedProducts = products.map((product, index) => ({
      ...product,
      result: results[index]?.result || null
    }));
    setProducts(updatedProducts);
    setAllResults(results);
    setShowResults(true);
  };

  const generatePDF = async () => {
    if (allResults.length === 0) {
      alert("Please calculate estimates first");
      return;
    }

    if (!window.html2pdf) {
      alert("PDF generator is still loading. Please try again in a moment.");
      return;
    }

    // Create a container div that will be converted to PDF
    const element = document.createElement('div');
    element.id = 'pdf-content';
    element.style.cssText = `
      padding: 40px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: #000;
      background-color: #fff;
      width: 800px;
      max-width: 100%;
      margin: 0 auto;
    `;
    
    // Calculate totals
    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    const avgEfficiency = allResults.length > 0 ? 
      (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';
    
    // Build the HTML content without the logo for now
    let htmlContent = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 32px; font-weight: bold; margin: 20px 0 10px 0; color: #1e40af;">AIC SURFACES</h1>
        <h2 style="font-size: 22px; margin: 10px 0; color: #333;">OPTIMIZED STONE QUOTE</h2>
        <p style="margin: 5px 0; color: #666; font-size: 16px;">Date: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <h3 style="font-size: 20px; font-weight: bold; margin: 0 0 15px 0; color: #1e40af;">Customer Information</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; width: 120px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${userInfo.name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;">${userInfo.email || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0;">${userInfo.phone || 'N/A'}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 20px; font-weight: bold; margin: 0 0 20px 0; color: #1e40af;">Quote Details</h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #fff; font-size: 13px;">
          <thead>
            <tr style="background-color: #e5e7eb;">
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: left; font-weight: 600;">Product</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: left; font-weight: 600;">Stone</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: center; font-weight: 600;">Size</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: center; font-weight: 600;">Qty</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: left; font-weight: 600;">Edge</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: center; font-weight: 600;">Slabs</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: center; font-weight: 600;">Eff %</th>
              <th style="border: 1px solid #d1d5db; padding: 12px 8px; text-align: right; font-weight: 600;">Price</th>
            </tr>
          </thead>
          <tbody>`;
    
    // Add each product row
    allResults.forEach((p, index) => {
      htmlContent += `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px;">${p.customName || `Product ${index + 1}`}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px;">${p.stone || 'N/A'}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px; text-align: center;">${p.width}×${p.depth}"</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px; text-align: center;">${p.quantity}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px;">${p.edgeDetail}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px; text-align: center;">${p.result?.totalSlabsNeeded || 0}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px; text-align: center;">${p.result?.efficiency ? p.result.efficiency.toFixed(1) : '0'}%</td>
              <td style="border: 1px solid #d1d5db; padding: 10px 8px; text-align: right; font-weight: 600; color: #059669;">${p.result?.finalPrice ? p.result.finalPrice.toFixed(2) : '0.00'}</td>
            </tr>`;
      
      if (p.note) {
        htmlContent += `
            <tr>
              <td colspan="8" style="border: 1px solid #d1d5db; padding: 10px 8px; font-style: italic; background-color: #fffbeb; color: #92400e; font-size: 12px;">
                <strong>Note:</strong> ${p.note}
              </td>
            </tr>`;
      }
    });
    
    // Add totals row
    htmlContent += `
          </tbody>
          <tfoot>
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <td colspan="7" style="border: 1px solid #d1d5db; padding: 14px 8px; text-align: right; font-size: 16px;">Total:</td>
              <td style="border: 1px solid #d1d5db; padding: 14px 8px; text-align: right; font-size: 16px; color: #059669;">${totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin-top: 40px; display: flex; justify-content: space-around; text-align: center; gap: 20px;">
        <div style="padding: 25px; background-color: #dbeafe; border-radius: 8px; flex: 1;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">Total Slabs</h4>
          <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1e40af;">${totalSlabs}</p>
        </div>
        <div style="padding: 25px; background-color: #d1fae5; border-radius: 8px; flex: 1;">
          <h4 style="margin: 0 0 10px 0; color: #059669; font-size: 16px;">Avg Efficiency</h4>
          <p style="margin: 0; font-size: 28px; font-weight: bold; color: #059669;">${avgEfficiency}%</p>
        </div>
        <div style="padding: 25px; background-color: #e9d5ff; border-radius: 8px; flex: 1;">
          <h4 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 16px;">Status</h4>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #7c3aed;">Optimized</p>
        </div>
      </div>
      
      <div style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
        <p style="margin: 5px 0;">This quote is valid for 30 days from ${new Date().toLocaleDateString()}</p>
        <p style="margin: 5px 0;">Generated by AIC Surfaces Stone Estimator</p>
        <p style="margin: 5px 0;">Developed by Roy Kariok</p>
      </div>
    `;
    
    // Set the HTML content
    element.innerHTML = htmlContent;
    
    // Append to body temporarily
    document.body.appendChild(element);
    
    // PDF options
    const opt = {
      margin: 10,
      filename: `AIC_Quote_${userInfo.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };
    
    // Generate PDF
    try {
      await window.html2pdf()
        .set(opt)
        .from(element)
        .save();
      document.body.removeChild(element);
    } catch (error) {
      console.error('PDF generation error:', error);
      document.body.removeChild(element);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // EmailJS implementation - NO API NEEDED!
  const sendEmailToClient = async () => {
    if (!userInfo.email || !userInfo.name) {
      alert("Please fill in customer name and email first!");
      return;
    }

    if (allResults.length === 0) {
      alert("Please calculate estimates first!");
      return;
    }

    setSendingEmail(true);
    setEmailStatus('Sending email...');

    try {
      // Load EmailJS if not already loaded
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      // Initialize EmailJS with your credentials
      window.emailjs.init("GiLTtkDDw2VZi0isD");
      
      // Calculate totals
      const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
      const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
      const avgEfficiency = allResults.length > 0 ? 
        (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';
      
      // Prepare email data
      const templateParams = {
        to_email: userInfo.email,
        to_name: userInfo.name,
        phone: userInfo.phone || 'Not provided',
        total_price: '$' + totalPrice,
        total_slabs: totalSlabs.toString(),
        average_efficiency: avgEfficiency + '%',
        products_list: allResults.map(p => 
          `- ${p.customName || 'Product'}: ${p.stone} ${p.width}"×${p.depth}" (Qty: ${p.quantity}) - $${p.result?.finalPrice?.toFixed(2) || '0.00'}`
        ).join('\n'),
        quote_date: new Date().toLocaleDateString()
      };

      // Send email using EmailJS
      const response = await window.emailjs.send(
        'service_4xwxsbp',
        'template_pw68h0p',
        templateParams
      );

      if (response.status === 200) {
        setEmailStatus('✅ Email sent successfully!');
        alert(`✅ Quote sent successfully to ${userInfo.email}!\n\nThe customer will receive a detailed quote with all products, pricing, and optimization details.`);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus('❌ Failed to send email');
      alert(`❌ Failed to send email: ${error.message || 'Unknown error'}\n\nPlease check your EmailJS configuration and try again.`);
    } finally {
      setSendingEmail(false);
      // Clear status after 5 seconds
      setTimeout(() => setEmailStatus(''), 5000);
    }
  };

  // Toggle component
  const Toggle = ({ checked, onChange }) => (
    <div 
      className={`w-9 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${
        checked ? 'bg-[#0A4F63]' : 'bg-[#D8E3E9]'
      }`}
      onClick={onChange}
    >
      <div 
        className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all duration-300 shadow-sm ${
          checked ? 'left-[18px] bg-[#40E0D0]' : 'left-0.5'
        }`}
      />
    </div>
  );

  // Saved Quotes Modal
  if (showSavedQuotes) {
    return (
      <div className="min-h-screen bg-[#F0F4F7]">
        <header className="bg-white border-b border-[#D8E3E9]">
          <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/AIC.jpg" 
                alt="AIC Logo" 
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <h1 className="text-xl font-bold text-[#0A4F63] font-serif tracking-wide">AIC Surfaces</h1>
                <p className="text-xs text-[#5A8FA0] uppercase tracking-wider">Saved Quotes</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto p-8">
          <button
            onClick={() => setShowSavedQuotes(false)}
            className="flex items-center gap-2 px-4 py-2 border border-[#D8E3E9] text-[#0A4F63] text-xs font-medium hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all mb-6"
          >
            ← Back to Estimator
          </button>

          <h2 className="text-2xl font-serif mb-6 text-[#0A4F63]">Saved Quotes</h2>

          {savedQuotes.length === 0 ? (
            <div className="bg-white border border-[#D8E3E9] p-8 text-center">
              <p className="text-[#5A8FA0]">No saved quotes found.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {savedQuotes.map((quote) => (
                <div key={quote.id} className="bg-white border border-[#D8E3E9] p-6 hover:border-[#40E0D0] transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-[#0A4F63]">{quote.name}</h3>
                      <p className="text-sm text-[#5A8FA0]">
                        Saved on: {new Date(quote.date).toLocaleDateString()} at {new Date(quote.date).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-[#5A8FA0] mt-1">
                        Customer: {quote.userInfo.name || 'N/A'} | Products: {quote.products.length}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadQuote(quote)}
                        className="px-4 py-2 bg-[#0A4F63] text-[#40E0D0] text-xs font-medium uppercase tracking-wider hover:bg-[#40E0D0] hover:text-[#0A4F63] transition-all"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 text-xs font-medium uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F0F4F7]">
        {/* Header */}
        <header className="bg-white border-b border-[#D8E3E9]">
          <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/AIC.jpg" 
                alt="AIC Logo" 
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <h1 className="text-xl font-bold text-[#0A4F63] font-serif tracking-wide">AIC Surfaces</h1>
                <p className="text-xs text-[#5A8FA0] uppercase tracking-wider">Premium Stone Fabrication</p>
              </div>
            </div>
          </div>
        </header>

        {/* Results Container */}
        <div className="max-w-[1400px] mx-auto p-8">
          <button
            onClick={() => setShowResults(false)}
            className="flex items-center gap-2 px-4 py-2 border border-[#D8E3E9] text-[#0A4F63] text-xs font-medium hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all mb-4"
          >
            ← Back to Products
          </button>
          
          <h2 className="text-2xl font-serif mb-8 text-[#0A4F63]">Optimized Results</h2>
          
          {/* Summary Cards - with smaller text */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-[#D8E3E9] p-6 text-center">
              <div className="text-2xl font-bold text-[#40E0D0] font-serif mb-2">
                {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
              </div>
              <div className="text-xs text-[#5A8FA0] uppercase tracking-wider">Total Slabs Needed</div>
            </div>
            <div className="bg-white border border-[#D8E3E9] p-6 text-center">
              <div className="text-2xl font-bold text-[#40E0D0] font-serif mb-2">
                {allResults.length > 0 ? 
                  (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : 
                  '0'
                }%
              </div>
              <div className="text-xs text-[#5A8FA0] uppercase tracking-wider">Average Efficiency</div>
            </div>
            <div className="bg-white border border-[#D8E3E9] p-6 text-center">
              <div className="text-2xl font-bold text-[#40E0D0] font-serif mb-2">
                ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
              </div>
              <div className="text-xs text-[#5A8FA0] uppercase tracking-wider">Total Cost</div>
            </div>
          </div>

          {/* Slab Layout Visualization */}
          {showVisualLayouts && allResults.map((product, productIndex) => {
            if (!product.result) return null;
            
            const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
            const slabWidth = parseFloat(stone?.["Slab Width"]) || 126;
            const slabHeight = parseFloat(stone?.["Slab Height"]) || 63;
            
            return (
              <div key={productIndex} className="bg-white border border-[#D8E3E9] p-6 mb-6">
                <h3 className="text-base font-semibold text-[#0A4F63] font-serif mb-4">
                  Layout Preview: {product.customName || `Product ${productIndex + 1}`} - {product.stone} ({product.width}x{product.depth})
                </h3>
                
                <div className="text-center p-8 bg-[#F0F4F7] border border-[#D8E3E9]">
                  <SlabLayoutVisualization 
                    pieces={Array(Math.min(parseInt(product.quantity) || 1, product.result.topsPerSlab)).fill().map((_, i) => ({
                      id: i + 1,
                      width: parseFloat(product.width) || 0,
                      depth: parseFloat(product.depth) || 0,
                      name: `${product.stone} #${i + 1}`
                    }))}
                    slabWidth={slabWidth}
                    slabHeight={slabHeight}
                    maxPiecesPerSlab={product.result.topsPerSlab}
                    includeKerf={includeKerf}
                    kerfWidth={kerfWidth}
                    showMaxLayout={false}
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8 mt-6">
                  <div></div>
                  <div className="bg-[#F0F4F7] p-4 border border-[#D8E3E9]">
                    <h4 className="text-sm font-semibold mb-4 text-[#0A4F63]">Layout Analysis</h4>
                    <div className="text-xs space-y-2">
                      <div>✓ Vertical: {product.width}×{product.depth}</div>
                      <div>✓ Kerf: {kerfWidth}"</div>
                      <div className="mt-4 pt-4 border-t border-[#D8E3E9] space-y-1">
                        <div><strong>Max Pieces/Slab:</strong> {product.result.topsPerSlab}</div>
                        <div><strong>Total Quantity:</strong> {product.quantity}</div>
                        <div><strong>Efficiency:</strong> <span className={`font-semibold ${
                          product.result.efficiency > 80 ? 'text-green-600' : 
                          product.result.efficiency > 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{product.result.efficiency?.toFixed(1) || '0'}%</span></div>
                        <div><strong>Slabs Needed:</strong> {product.result.totalSlabsNeeded}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Results Table */}
          <div className="bg-white border border-[#D8E3E9] overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Product</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Stone</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Size</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Qty</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Edge</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Area</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Per Slab</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Slabs</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Eff %</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Material</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Fab</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Cost</th>
                  <th className="bg-[#0A4F63] text-[#40E0D0] px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider border-b-2 border-[#40E0D0]">Total</th>
                </tr>
              </thead>
              <tbody>
                {allResults.map((p, i) => (
                  <tr key={i} className="hover:bg-[#F0F4F7] text-xs text-[#0A4F63]">
                    <td className="px-3 py-3 border-b border-[#E8F1F4]">{p.customName || `Product ${i + 1}`}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4]">{p.stone}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4]">{p.width}×{p.depth}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-center">{p.quantity}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4]">{p.edgeDetail}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-center">{p.result?.usableAreaSqft?.toFixed(1)}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-center text-purple-700 font-semibold">{p.result?.topsPerSlab || '-'}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-center text-blue-600 font-semibold">{p.result?.totalSlabsNeeded || '-'}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-center">
                      <span className={`font-semibold ${
                        (p.result?.efficiency || 0) > 80 ? 'text-green-600' : 
                        (p.result?.efficiency || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {p.result?.efficiency?.toFixed(0) || '0'}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-right">${p.result?.materialCost?.toFixed(0) || '0'}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-right">${p.result?.fabricationCost?.toFixed(0) || '0'}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-right">${p.result?.rawCost?.toFixed(0) || '0'}</td>
                    <td className="px-3 py-3 border-b border-[#E8F1F4] text-right font-semibold text-green-600">${p.result?.finalPrice?.toFixed(0) || '0'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#F0F4F7] font-semibold">
                  <td colSpan={9} className="px-4 py-4 text-right border-t-2 border-[#D8E3E9]">Totals:</td>
                  <td className="px-4 py-4 text-right text-blue-600 border-t-2 border-[#D8E3E9]">
                    ${allResults.reduce((sum, p) => sum + (p.result?.materialCost || 0), 0).toFixed(0)}
                  </td>
                  <td className="px-4 py-4 text-right text-orange-600 border-t-2 border-[#D8E3E9]">
                    ${allResults.reduce((sum, p) => sum + (p.result?.fabricationCost || 0), 0).toFixed(0)}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 border-t-2 border-[#D8E3E9]">
                    ${allResults.reduce((sum, p) => sum + (p.result?.rawCost || 0), 0).toFixed(0)}
                  </td>
                  <td className="px-4 py-4 text-right text-green-600 text-sm font-bold border-t-2 border-[#D8E3E9]">
                    ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8 pb-16">
            <button
              onClick={() => {
                console.log('PDF button clicked!');
                generateQuotePDF();
              }}
              className="px-6 py-2 bg-white text-[#0A4F63] border border-[#D8E3E9] text-xs font-medium uppercase tracking-wider hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all"
            >
              📄 Generate PDF
            </button>
            <button
              onClick={sendEmailToClient}
              disabled={sendingEmail || !userInfo.email}
              className={`px-6 py-2 bg-white text-[#0A4F63] border border-[#D8E3E9] text-xs font-medium uppercase tracking-wider transition-all ${
                sendingEmail || !userInfo.email 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-[#40E0D0] hover:text-[#40E0D0]'
              }`}
            >
              {sendingEmail ? 'Sending...' : '📧 Email Quote'}
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="px-6 py-2 bg-[#0A4F63] text-[#40E0D0] border border-[#0A4F63] text-xs font-medium uppercase tracking-wider hover:bg-[#40E0D0] hover:text-[#0A4F63] transition-all"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#D8E3E9]">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/AIC.jpg" 
              alt="AIC Logo" 
              className="w-10 h-10 object-cover rounded"
            />
            <div>
              <h1 className="text-xl font-bold text-[#0A4F63] font-serif tracking-wide">AIC Surfaces</h1>
              <p className="text-xs text-[#5A8FA0] uppercase tracking-wider">Premium Stone Fabrication</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveQuote}
              className="px-4 py-2 bg-white text-[#0A4F63] border border-[#D8E3E9] text-xs font-medium uppercase tracking-wider hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all"
            >
              💾 Save Quote
            </button>
            <button
              onClick={() => setShowSavedQuotes(true)}
              className="px-4 py-2 bg-white text-[#0A4F63] border border-[#D8E3E9] text-xs font-medium uppercase tracking-wider hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all"
            >
              📂 Load Quote ({savedQuotes.length})
            </button>
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <nav className="max-w-[1400px] mx-auto px-8 py-6 flex justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#0A4F63] text-[#40E0D0] flex items-center justify-center text-xs">✓</span>
        </div>
        <div className="w-24 h-px bg-[#D8E3E9] self-center"></div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#40E0D0] text-[#0A4F63] flex items-center justify-center text-xs font-medium">2</span>
        </div>
        <div className="w-24 h-px bg-[#D8E3E9] self-center"></div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full border border-[#D8E3E9] text-[#5A8FA0] flex items-center justify-center text-xs">3</span>
        </div>
        <div className="w-24 h-px bg-[#D8E3E9] self-center"></div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full border border-[#D8E3E9] text-[#5A8FA0] flex items-center justify-center text-xs">4</span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-[300px_1fr] gap-8 pb-24">
        {/* Sidebar */}
        <aside className="bg-white border border-[#D8E3E9] p-6 h-fit sticky top-4">
          <h2 className="text-base font-bold text-[#0A4F63] font-serif mb-6">Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#E8F1F4]">
              <span className="text-xs font-medium text-[#0A4F63]">Include Kerf</span>
              <Toggle checked={includeKerf} onChange={() => setIncludeKerf(!includeKerf)} />
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[#E8F1F4]">
              <span className="text-xs font-medium text-[#0A4F63]">Visual Preview</span>
              <Toggle checked={showVisualLayouts} onChange={() => setShowVisualLayouts(!showVisualLayouts)} />
            </div>
            
            <div className="mt-4">
              <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Kerf Width</label>
              <select
                value={kerfWidth}
                onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                disabled={!includeKerf}
                className="w-full px-3 py-2 bg-white border border-[#D8E3E9] text-xs text-[#0A4F63] focus:outline-none focus:border-[#40E0D0] disabled:opacity-50"
              >
                <option value={0.125}>1/8" (0.125) - Standard</option>
                <option value={0.1875}>3/16" (0.1875) - Thick Material</option>
                <option value={0.25}>1/4" (0.25) - Heavy Duty</option>
                <option value={0.09375}>3/32" (0.094) - Thin Blade</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Breakage Buffer (%)</label>
              <select
                value={breakageBuffer}
                onChange={(e) => setBreakageBuffer(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#D8E3E9] text-xs text-[#0A4F63] focus:outline-none focus:border-[#40E0D0]"
              >
                <option value={5}>5% - Conservative</option>
                <option value={10}>10% - Standard</option>
                <option value={15}>15% - High Risk</option>
                <option value={20}>20% - Very High Risk</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          <div className="space-y-4">
            {/* Products */}
            {products.map((product, index) => (
              <div key={product.id} className="bg-white border border-[#D8E3E9] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-[#0A4F63] font-serif">
                    {product.customName || `Product ${index + 1}`} - {product.stone || 'Select Stone'}
                  </h3>
                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(index)}
                      className="w-6 h-6 rounded-full border border-[#D8E3E9] text-[#5A8FA0] hover:border-[#40E0D0] hover:text-[#40E0D0] flex items-center justify-center text-sm transition-all"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Stone Type</label>
                    <select
                      value={product.stone}
                      onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    >
                      <option value="">Select...</option>
                      {stoneOptions.map((stone, i) => (
                        <option key={i} value={stone["Stone Type"]}>{stone["Stone Type"]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Width (in)</label>
                    <input
                      type="number"
                      value={product.width}
                      onChange={(e) => updateProduct(index, 'width', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Depth (in)</label>
                    <input
                      type="number"
                      value={product.depth}
                      onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Quantity</label>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Edge Detail</label>
                    <select
                      value={product.edgeDetail}
                      onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    >
                      <option value="Eased">Eased</option>
                      <option value="1.5 mitered">1.5" mitered</option>
                      <option value="Bullnose">Bullnose</option>
                      <option value="Ogee">Ogee</option>
                      <option value="Beveled">Beveled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Priority</label>
                    <select
                      value={product.priority}
                      onChange={(e) => updateProduct(index, 'priority', e.target.value)}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Custom Name</label>
                    <input
                      type="text"
                      value={product.customName}
                      onChange={(e) => updateProduct(index, 'customName', e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Upload Drawing</label>
                    <input
                      type="file"
                      accept="image/*,.pdf,.dwg,.dxf"
                      onChange={(e) => handleDrawingUpload(e, index)}
                      disabled={loadingAI}
                      className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all file:mr-2 file:px-2 file:py-1 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[#40E0D0] file:text-[#0A4F63] hover:file:bg-[#0A4F63] hover:file:text-[#40E0D0]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Notes</label>
                  <textarea
                    value={product.note}
                    onChange={(e) => updateProduct(index, 'note', e.target.value)}
                    placeholder="Add any special instructions..."
                    rows={2}
                    className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all resize-none"
                  />
                </div>
                
                {loadingAI && index === products.findIndex(p => p.id === product.id) && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <div>
                        <div className="text-blue-800 font-medium">🤖 Claude AI is analyzing your drawing...</div>
                        <div className="text-blue-600 text-sm">Extracting dimensions and identifying all pieces</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Product Button */}
            <button
              onClick={addProduct}
              className="w-full py-3 border border-dashed border-[#40E0D0] text-[#40E0D0] text-xs font-medium uppercase tracking-wider hover:bg-[#40E0D0] hover:text-[#0A4F63] hover:border-solid transition-all"
            >
              + Add Another Product
            </button>

            {/* Contact Section */}
            <div className="bg-white border border-[#D8E3E9] p-6">
              <h3 className="text-base font-semibold text-[#0A4F63] font-serif mb-4">Contact Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Email *</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#5A8FA0] uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 bg-[#F0F4F7] border border-transparent text-xs text-[#0A4F63] focus:outline-none focus:bg-white focus:border-[#40E0D0] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D8E3E9] py-3 shadow-lg z-50">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <div></div>
          <div className="flex gap-2">
            <button
              onClick={addProduct}
              className="px-6 py-2 bg-white text-[#0A4F63] border border-[#D8E3E9] text-xs font-medium uppercase tracking-wider hover:border-[#40E0D0] hover:text-[#40E0D0] transition-all"
            >
              Add Another Product
            </button>
            <button
              onClick={calculateAll}
              className="px-6 py-2 bg-[#0A4F63] text-[#40E0D0] border border-[#0A4F63] text-xs font-medium uppercase tracking-wider hover:bg-[#40E0D0] hover:text-[#0A4F63] transition-all"
            >
              Calculate Quote
            </button>
          </div>
        </div>
      </div>

      {/* Email status message */}
      {emailStatus && (
        <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-center font-medium animate-pulse ${
          emailStatus.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 
          emailStatus.includes('❌') ? 'bg-red-100 text-red-800 border border-red-300' : 
          'bg-blue-100 text-blue-800 border border-blue-300'
        }`}>
          {emailStatus}
        </div>
      )}

      {/* Admin Mode */}
      {!adminMode && (
        <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-[#D8E3E9] z-50">
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
              className="px-3 py-2 border border-[#D8E3E9] text-xs focus:outline-none focus:border-[#40E0D0]"
            />
            <button
              onClick={() => setAdminMode(adminPassword === correctPassword)}
              className="px-4 py-2 bg-[#0A4F63] text-[#40E0D0] text-xs font-medium uppercase tracking-wider hover:bg-[#40E0D0] hover:text-[#0A4F63] transition-all"
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
