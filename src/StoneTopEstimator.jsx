import { useState, useEffect } from 'react';

// Modern styled Slab Layout Visualization Component
const SlabLayoutVisualization = ({ pieces, slabWidth, slabHeight, maxPiecesPerSlab, includeKerf, kerfWidth }) => {
  if (!pieces || pieces.length === 0) return null;

  const pieceWidth = pieces[0]?.width || 0;
  const pieceHeight = pieces[0]?.depth || 0;
  const kerf = includeKerf ? kerfWidth : 0;

  const generateOptimalLayout = () => {
    const layout = [];
    const targetPieces = Math.min(pieces.length, maxPiecesPerSlab);
    
    const orientation1Fits = Math.floor((slabWidth + kerf) / (pieceWidth + kerf)) * Math.floor((slabHeight + kerf) / (pieceHeight + kerf));
    const orientation2Fits = Math.floor((slabWidth + kerf) / (pieceHeight + kerf)) * Math.floor((slabHeight + kerf) / (pieceWidth + kerf));
    
    if (orientation1Fits >= targetPieces) {
      const cols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf));
      const rows = Math.ceil(targetPieces / cols);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols && layout.length < targetPieces; col++) {
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
    } else if (orientation2Fits >= targetPieces) {
      const cols = Math.floor((slabWidth + kerf) / (pieceHeight + kerf));
      const rows = Math.ceil(targetPieces / cols);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols && layout.length < targetPieces; col++) {
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
      const verticalCols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf));
      const verticalRows = Math.floor((slabHeight + kerf) / (pieceHeight + kerf));
      const maxVertical = verticalCols * verticalRows;
      
      if (maxVertical >= targetPieces) {
        for (let row = 0; row < verticalRows; row++) {
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
      }
    }
    
    return layout;
  };

  const layoutPieces = generateOptimalLayout();
  
  const containerWidth = 400;
  const containerHeight = 250;
  const scaleX = containerWidth / slabWidth;
  const scaleY = containerHeight / slabHeight;
  const scale = Math.min(scaleX, scaleY) * 0.9;

  const scaledSlabWidth = slabWidth * scale;
  const scaledSlabHeight = slabHeight * scale;

  return (
    <div className="relative bg-white rounded-xl p-4 border border-gray-200">
      <div className="mb-3 text-sm text-gray-600 text-center font-medium">
        Slab: {slabWidth}" × {slabHeight}"
      </div>
      
      <div 
        className="relative border-2 border-gray-300 bg-gray-50 mx-auto rounded-lg" 
        style={{ 
          width: `${scaledSlabWidth}px`, 
          height: `${scaledSlabHeight}px`
        }}
      >
        {layoutPieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute border-2 flex items-center justify-center text-xs font-semibold rounded ${
              piece.orientation === 'vertical' 
                ? 'bg-gray-100 border-gray-400 text-gray-700' 
                : 'bg-gray-200 border-gray-500 text-gray-800'
            }`}
            style={{
              left: `${piece.x * scale}px`,
              top: `${piece.y * scale}px`,
              width: `${piece.width * scale}px`,
              height: `${piece.height * scale}px`,
            }}
          >
            <div className="text-center">
              <div className="font-bold">{piece.id}</div>
              <div className="text-xs opacity-75">{piece.width}×{piece.height}</div>
            </div>
          </div>
        ))}
        
        {includeKerf && kerf > 0 && layoutPieces.length > 1 && (
          <>
            {Array.from(new Set(layoutPieces.map(p => p.x + p.width))).map((x, i) => (
              <div
                key={`v-kerf-${i}`}
                className="absolute bg-red-400 opacity-50"
                style={{
                  left: `${x * scale}px`,
                  top: '0px',
                  width: `${kerf * scale}px`,
                  height: `${scaledSlabHeight}px`,
                }}
              />
            ))}
            {Array.from(new Set(layoutPieces.map(p => p.y + p.height))).map((y, i) => (
              <div
                key={`h-kerf-${i}`}
                className="absolute bg-red-400 opacity-50"
                style={{
                  left: '0px',
                  top: `${y * scale}px`,
                  width: `${scaledSlabWidth}px`,
                  height: `${kerf * scale}px`,
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Showing {layoutPieces.length} of {pieces.length} pieces (max {maxPiecesPerSlab}/slab)
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

  // Progress tracking
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Load html2pdf from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(script);

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
    setCurrentStep(4);
  };

  const generatePDF = () => {
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
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.fontSize = '14px';
    element.style.color = '#000';
    element.style.backgroundColor = '#fff';
    element.style.width = '210mm'; // A4 width
    
    // Build the HTML content as a string first
    let htmlContent = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #000;">AIC SURFACES</h1>
        <h2 style="font-size: 20px; margin: 10px 0; color: #333;">OPTIMIZED STONE QUOTE</h2>
        <p style="margin: 5px 0; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
        <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #000;">Customer Information</h3>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 5px 0;"><strong>Name:</strong></td>
            <td style="padding: 5px 0;">${userInfo.name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Email:</strong></td>
            <td style="padding: 5px 0;">${userInfo.email || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Phone:</strong></td>
            <td style="padding: 5px 0;">${userInfo.phone || 'N/A'}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #000;">Quote Details</h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #fff;">
          <thead>
            <tr style="background-color: #e5e7eb;">
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-weight: 600;">Product</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-weight: 600;">Stone</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: center; font-weight: 600;">Size</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: center; font-weight: 600;">Qty</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-weight: 600;">Edge</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: center; font-weight: 600;">Slabs</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: center; font-weight: 600;">Eff %</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: 600;">Price</th>
            </tr>
          </thead>
          <tbody>`;
    
    // Add each product row
    allResults.forEach((p, index) => {
      htmlContent += `
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 10px;">${p.customName || `Product ${index + 1}`}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px;">${p.stone || 'N/A'}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;">${p.width}×${p.depth}"</td>
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;">${p.quantity}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px;">${p.edgeDetail}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;">${p.result?.totalSlabsNeeded || 0}</td>
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: center;">${p.result?.efficiency ? p.result.efficiency.toFixed(1) : '0'}%</td>
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: 600;">${p.result?.finalPrice ? p.result.finalPrice.toFixed(2) : '0.00'}</td>
            </tr>`;
      
      if (p.note) {
        htmlContent += `
            <tr>
              <td colspan="8" style="border: 1px solid #d1d5db; padding: 10px; font-style: italic; background-color: #fffbeb; color: #92400e;">
                <strong>Note:</strong> ${p.note}
              </td>
            </tr>`;
      }
    });
    
    // Calculate totals
    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    const avgEfficiency = allResults.length > 0 ? 
      (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';
    
    // Add totals row
    htmlContent += `
          </tbody>
          <tfoot>
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <td colspan="7" style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-size: 16px;">Total:</td>
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-size: 16px;">${totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin-top: 30px; display: flex; justify-content: space-around; text-align: center;">
        <div style="padding: 20px; background-color: #f3f4f6; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #000; font-size: 14px;">Total Slabs</h4>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #000;">${totalSlabs}</p>
        </div>
        <div style="padding: 20px; background-color: #f3f4f6; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #000; font-size: 14px;">Avg Efficiency</h4>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #10b981;">${avgEfficiency}%</p>
        </div>
        <div style="padding: 20px; background-color: #f3f4f6; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #000; font-size: 14px;">Status</h4>
          <p style="margin: 0; font-size: 20px; font-weight: bold; color: #000;">Optimized</p>
        </div>
      </div>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280;">
        <p style="margin: 5px 0;">This quote is valid for 30 days from ${new Date().toLocaleDateString()}</p>
        <p style="margin: 5px 0;">Generated by AIC Surfaces Stone Estimator</p>
        <p style="margin: 5px 0; font-size: 12px;">Developed by Roy Kariok</p>
      </div>
    `;
    
    // Set the HTML content
    element.innerHTML = htmlContent;
    
    // Append to body temporarily (helps with rendering)
    document.body.appendChild(element);
    
    // PDF options
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `AIC_Quote_${userInfo.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate PDF
    window.html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // Remove the element from body after PDF is generated
        document.body.removeChild(element);
      })
      .catch((error) => {
        console.error('PDF generation error:', error);
        document.body.removeChild(element);
        alert('Failed to generate PDF. Please try again.');
      });
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Clean Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
                AIC
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AIC SURFACES</h1>
                <p className="text-sm text-gray-500">Stone Estimator with Slab Optimization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!adminMode && (
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Admin Password"
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    onClick={() => setAdminMode(adminPassword === correctPassword)}
                    className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Admin
                  </button>
                </div>
              )}
              <span className="text-sm text-gray-500">by Roy Kariok</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-8">
          {['Settings', 'Products', 'Contact', 'Results'].map((step, index) => (
            <div key={step} className="flex-1 relative">
              {index < 3 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              )}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  index + 1 < currentStep ? 'bg-green-500 text-white' :
                  index + 1 === currentStep ? 'bg-black text-white' :
                  'bg-white border-2 border-gray-300 text-gray-400'
                }`}>
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  index + 1 <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Optimization Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Include Kerf</span>
                  <button
                    onClick={() => setIncludeKerf(!includeKerf)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      includeKerf ? 'bg-black' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      includeKerf ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kerf Width</label>
                  <select
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={!includeKerf}
                  >
                    <option value={0.125}>1/8" (0.125) - Standard</option>
                    <option value={0.1875}>3/16" (0.1875) - Thick Material</option>
                    <option value={0.25}>1/4" (0.25) - Heavy Duty</option>
                    <option value={0.09375}>3/32" (0.094) - Thin Blade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breakage Buffer</label>
                  <select
                    value={breakageBuffer}
                    onChange={(e) => setBreakageBuffer(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value={5}>5% - Conservative</option>
                    <option value={10}>10% - Standard</option>
                    <option value={15}>15% - High Risk</option>
                    <option value={20}>20% - Very High Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Theoretical', action: () => { setIncludeKerf(false); setBreakageBuffer(5); }},
                      { name: 'Production', action: () => { setIncludeKerf(true); setKerfWidth(0.125); setBreakageBuffer(10); }},
                      { name: 'Conservative', action: () => { setIncludeKerf(true); setKerfWidth(0.1875); setBreakageBuffer(15); }}
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-black hover:text-white text-gray-700 rounded-md border border-gray-200 transition-colors"
                        onClick={preset.action}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Visual Layouts</span>
                    <button
                      onClick={() => setShowVisualLayouts(!showVisualLayouts)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        showVisualLayouts ? 'bg-black' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        showVisualLayouts ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            {allResults.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Current Estimate</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">Slabs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {allResults.length > 0 ? 
                        Math.round(allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length) : 
                        0}%
                    </div>
                    <div className="text-xs text-gray-500 font-medium">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ${(allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0) / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-gray-500 font-medium">Total</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Products Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md uppercase tracking-wide">
                  {products.length} ITEMS
                </span>
              </div>

              <div className="space-y-4">
                {products.map((product, index) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-base font-semibold text-gray-900">
                          {product.customName || `Product ${index + 1}`}
                        </h3>
                        {product.priority === 'high' && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">High Priority</span>
                        )}
                        {product.priority === 'low' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Low Priority</span>
                        )}
                      </div>
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="w-7 h-7 rounded-md bg-gray-100 hover:bg-red-500 hover:text-white text-gray-400 flex items-center justify-center transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stone Type</label>
                        <select
                          value={product.stone}
                          onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="">Select Stone Type...</option>
                          {stoneOptions.map((stone, i) => (
                            <option key={i} value={stone["Stone Type"]}>{stone["Stone Type"]}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Width (in)</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={product.width}
                            onChange={(e) => updateProduct(index, 'width', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Depth (in)</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={product.depth}
                            onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            placeholder="1"
                            value={product.quantity}
                            onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Edge Detail</label>
                          <select
                            value={product.edgeDetail}
                            onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          >
                            <option value="Eased">Eased</option>
                            <option value="1.5 mitered">1.5" mitered</option>
                            <option value="Bullnose">Bullnose</option>
                            <option value="Ogee">Ogee</option>
                            <option value="Beveled">Beveled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={product.priority}
                            onChange={(e) => updateProduct(index, 'priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                        <textarea
                          placeholder="Add any special instructions..."
                          value={product.note}
                          onChange={(e) => updateProduct(index, 'note', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          rows={2}
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*,.pdf,.dwg,.dxf"
                          onChange={(e) => handleDrawingUpload(e, index)}
                          className="hidden"
                          id={`file-upload-${index}`}
                          disabled={loadingAI}
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer block ${
                            loadingAI ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {loadingAI ? (
                            <div className="flex items-center justify-center space-x-3">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                              <div className="text-gray-700 font-medium">🤖 AI analyzing...</div>
                            </div>
                          ) : (
                            <>
                              <div className="text-gray-400 text-2xl mb-1">📎</div>
                              <div className="text-sm text-gray-600 font-medium">Upload drawing (optional)</div>
                              <div className="text-xs text-gray-500 mt-1">AI will extract dimensions automatically</div>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addProduct}
                className="w-full mt-4 px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">+</span> Add Product
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              {allResults.length > 0 && !userInfo.email && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">⚠️ Email address is required to send quotes</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                      allResults.length > 0 && !userInfo.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            {allResults.length > 0 && showVisualLayouts && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Layout Visualization</h2>
                <div className="space-y-6">
                  {allResults.map((product, index) => {
                    if (!product.result) return null;
                    const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
                    const slabWidth = parseFloat(stone?.["Slab Width"]) || 126;
                    const slabHeight = parseFloat(stone?.["Slab Height"]) || 63;
                    
                    return (
                      <div key={index} className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          {product.customName || `Product ${index + 1}`} - {product.stone} ({product.width}×{product.depth})
                        </h4>
                        
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="flex-1">
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
                            />
                          </div>
                          
                          <div className="w-full lg:w-64 bg-white p-4 rounded-lg border border-gray-200">
                            <h5 className="font-semibold mb-3 text-gray-800">Layout Analysis</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-100 border-2 border-gray-400 rounded"></div>
                                <span>Vertical: {product.width}×{product.depth}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-200 border-2 border-gray-500 rounded"></div>
                                <span>Horizontal: {product.depth}×{product.width}</span>
                              </div>
                              {includeKerf && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                                  <span>Kerf: {kerfWidth}"</span>
                                </div>
                              )}
                              
                              <div className="pt-2 border-t space-y-1">
                                <div><strong>Max Pieces/Slab:</strong> {product.result.topsPerSlab}</div>
                                <div><strong>Total Quantity:</strong> {product.quantity}</div>
                                <div><strong>Efficiency:</strong> <span className="text-green-600 font-semibold">{product.result.efficiency?.toFixed(1) || '0'}%</span></div>
                                <div><strong>Slabs Needed:</strong> {product.result.totalSlabsNeeded}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {product.note && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <strong className="text-yellow-800">Notes:</strong>
                            <p className="text-sm text-yellow-700 mt-1">{product.note}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Table */}
            {allResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculation Results</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Product</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Stone</th>
                        <th className="text-center py-3 px-2 font-medium text-gray-700">Size</th>
                        <th className="text-center py-3 px-2 font-medium text-gray-700">Qty</th>
                        <th className="text-center py-3 px-2 font-medium text-gray-700">Slabs</th>
                        <th className="text-center py-3 px-2 font-medium text-gray-700">Eff %</th>
                        <th className="text-right py-3 px-2 font-medium text-gray-700">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allResults.map((p, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="font-medium text-gray-900">{p.customName || `Product ${i + 1}`}</div>
                            {p.note && <div className="text-xs text-gray-500 mt-0.5">{p.note}</div>}
                          </td>
                          <td className="py-3 px-2 text-gray-600">{p.stone}</td>
                          <td className="py-3 px-2 text-center text-gray-600">{p.width}×{p.depth}</td>
                          <td className="py-3 px-2 text-center text-gray-600">{p.quantity}</td>
                          <td className="py-3 px-2 text-center font-semibold text-gray-900">{p.result?.totalSlabsNeeded || '-'}</td>
                          <td className="py-3 px-2 text-center">
                            <span className={`font-semibold ${
                              (p.result?.efficiency || 0) > 80 ? 'text-green-600' : 
                              (p.result?.efficiency || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {p.result?.efficiency?.toFixed(0) || '0'}%
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-gray-900">
                            ${p.result?.finalPrice?.toFixed(2) || '0.00'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan={6} className="py-3 px-2 text-right font-semibold text-gray-700">Total:</td>
                        <td className="py-3 px-2 text-right font-bold text-lg text-gray-900">
                          ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Summary Cards */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <h4 className="text-sm font-medium text-gray-600">Total Slabs Needed</h4>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <h4 className="text-sm font-medium text-gray-600">Average Efficiency</h4>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {allResults.length > 0 ? 
                        (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : 
                        '0'
                      }%
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <h4 className="text-sm font-medium text-gray-600">Material Savings</h4>
                    <p className="text-xl font-bold text-gray-900 mt-1">Optimized!</p>
                    <p className="text-xs text-gray-500">vs. Standard Calculation</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-3">
              {allResults.length > 0 && (
                <>
                  <button
                    onClick={generatePDF}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <span>📄</span> Generate PDF
                  </button>
                  <button
                    onClick={sendEmailToClient}
                    disabled={sendingEmail || !userInfo.email}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      sendingEmail || !userInfo.email
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>📧</span> {sendingEmail ? 'Sending...' : 'Email Quote'}
                  </button>
                </>
              )}
              <button
                onClick={calculateAll}
                className="px-8 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <span>⚡</span> Calculate Optimization
              </button>
            </div>
          </div>
        </div>

        {/* Email Status */}
        {emailStatus && (
          <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all ${
            emailStatus.includes('✅') ? 'bg-green-500 text-white' :
            emailStatus.includes('❌') ? 'bg-red-500 text-white' :
            'bg-gray-800 text-white'
          }`}>
            {emailStatus}
          </div>
        )}
      </div>
    </div>
  );
}
