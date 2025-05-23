import { useState, useEffect } from 'react';

// Slab Layout Visualization Component
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
      // Mixed orientation logic - simplified for now
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
    <div className="relative">
      <div className="mb-2 text-sm text-gray-600 text-center">
        Slab: {slabWidth}" × {slabHeight}"
      </div>
      
      <div 
        className="relative border-2 border-gray-800 bg-gray-100 mx-auto" 
        style={{ 
          width: `${scaledSlabWidth}px`, 
          height: `${scaledSlabHeight}px`
        }}
      >
        {layoutPieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute border-2 flex items-center justify-center text-xs font-semibold ${
              piece.orientation === 'vertical' 
                ? 'bg-blue-200 border-blue-600 text-blue-800' 
                : 'bg-orange-200 border-orange-600 text-orange-800'
            }`}
            style={{
              left: `${piece.x * scale}px`,
              top: `${piece.y * scale}px`,
              width: `${piece.width * scale}px`,
              height: `${piece.height * scale}px`,
            }}
          >
            <div className="text-center">
              <div>{piece.id}</div>
              <div className="text-xs">{piece.width}×{piece.height}</div>
            </div>
          </div>
        ))}
        
        {includeKerf && kerf > 0 && layoutPieces.length > 1 && (
          <>
            {Array.from(new Set(layoutPieces.map(p => p.x + p.width))).map((x, i) => (
              <div
                key={`v-kerf-${i}`}
                className="absolute bg-red-300 opacity-70"
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
                className="absolute bg-red-300 opacity-70"
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
      
      <div className="mt-2 text-xs text-gray-500 text-center">
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
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #1e40af;">AIC SURFACES</h1>
        <h2 style="font-size: 20px; margin: 10px 0; color: #333;">OPTIMIZED STONE QUOTE</h2>
        <p style="margin: 5px 0; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
        <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1e40af;">Customer Information</h3>
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
        <h3 style="font-size: 18px; font-weight: bold; margin: 0 0 15px 0; color: #1e40af;">Quote Details</h3>
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
              <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; font-weight: 600; color: #059669;">${p.result?.finalPrice ? p.result.finalPrice.toFixed(2) : '0.00'}</td>
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
              <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-size: 16px; color: #059669;">${totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin-top: 30px; display: flex; justify-content: space-around; text-align: center;">
        <div style="padding: 20px; background-color: #dbeafe; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af; font-size: 14px;">Total Slabs</h4>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1e40af;">${totalSlabs}</p>
        </div>
        <div style="padding: 20px; background-color: #d1fae5; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #059669; font-size: 14px;">Avg Efficiency</h4>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">${avgEfficiency}%</p>
        </div>
        <div style="padding: 20px; background-color: #e9d5ff; border-radius: 8px; flex: 1; margin: 0 10px;">
          <h4 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 14px;">Status</h4>
          <p style="margin: 0; font-size: 20px; font-weight: bold; color: #7c3aed;">Optimized</p>
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


       total_price: '$' + totalPrice,

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl space-y-6 text-center">
        
        <div className="text-center mb-4">
          {/* Remove or replace logo reference */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AIC SURFACES</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Stone Estimator with Slab Optimization</h2>
          <p className="text-base font-medium text-gray-600">Developed by Roy Kariok</p>
        </div>

        {!adminMode && (
          <div className="mb-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
              className="border px-4 py-2 rounded"
            />
            <button
              onClick={() => setAdminMode(adminPassword === correctPassword)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enter Admin Mode
            </button>
          </div>
        )}

        {/* Advanced Settings Panel */}
        <div className="bg-blue-50 p-4 rounded shadow-md space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-800">Optimization Settings</h2>
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAdvancedSettings ? '▼ Hide Advanced' : '▶ Show Advanced'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeKerf"
                checked={includeKerf}
                onChange={(e) => setIncludeKerf(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="includeKerf" className="font-medium">
                Include Kerf (Saw Blade Width)
              </label>
              {includeKerf && (
                <span className="text-sm text-gray-600">({kerfWidth}")</span>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              <strong>Current Mode:</strong> {includeKerf ? 'Production (with kerf)' : 'Theoretical (no kerf)'}
            </div>
          </div>

          {showAdvancedSettings && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kerf Width (inches)</label>
                  <select
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                    className="border px-3 py-2 rounded w-full text-sm"
                    disabled={!includeKerf}
                  >
                    <option value={0.125}>1/8" (0.125) - Standard</option>
                    <option value={0.1875}>3/16" (0.1875) - Thick Material</option>
                    <option value={0.25}>1/4" (0.25) - Heavy Duty</option>
                    <option value={0.09375}>3/32" (0.094) - Thin Blade</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Breakage Buffer (%)</label>
                  <select
                    value={breakageBuffer}
                    onChange={(e) => setBreakageBuffer(parseInt(e.target.value))}
                    className="border px-3 py-2 rounded w-full text-sm"
                  >
                    <option value={5}>5% - Conservative</option>
                    <option value={10}>10% - Standard</option>
                    <option value={15}>15% - High Risk</option>
                    <option value={20}>20% - Very High Risk</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Quick Presets</label>
                  <select
                    onChange={(e) => {
                      const preset = e.target.value;
                      if (preset === 'production') {
                        setIncludeKerf(true);
                        setKerfWidth(0.125);
                        setBreakageBuffer(10);
                      } else if (preset === 'theoretical') {
                        setIncludeKerf(false);
                        setBreakageBuffer(5);
                      } else if (preset === 'conservative') {
                        setIncludeKerf(true);
                        setKerfWidth(0.1875);
                        setBreakageBuffer(15);
                      }
                    }}
                    className="border px-3 py-2 rounded w-full text-sm"
                  >
                    <option value="">Select Preset...</option>
                    <option value="theoretical">Theoretical Maximum</option>
                    <option value="production">Production Standard</option>
                    <option value="conservative">Conservative Estimate</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {products.map((product, index) => (
          <div key={product.id} className="bg-gray-50 p-4 rounded shadow space-y-4 text-left relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-700">
                  {product.customName || `Product ${index + 1}`}
                </h3>
                {product.priority === 'high' && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High Priority</span>
                )}
                {product.priority === 'low' && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Low Priority</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 font-bold text-xl hover:text-red-800"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <select
                value={product.stone}
                onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="">Select Stone Type...</option>
                {stoneOptions.map((stone, i) => (
                  <option key={i} value={stone["Stone Type"]}>{stone["Stone Type"]}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Width (in)"
                value={product.width}
                onChange={(e) => updateProduct(index, 'width', e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Depth (in)"
                value={product.depth}
                onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                className="border px-4 py-2 rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <select
                value={product.edgeDetail}
                onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="Eased">Eased</option>
                <option value="1.5 mitered">1.5" mitered</option>
                <option value="Bullnose">Bullnose</option>
                <option value="Ogee">Ogee</option>
                <option value="Beveled">Beveled</option>
              </select>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf,.dwg,.dxf"
                  onChange={(e) => handleDrawingUpload(e, index)}
                  className="border px-4 py-2 rounded w-full"
                  disabled={loadingAI}
                />
                {loadingAI && (
                  <div className="absolute inset-0 bg-blue-50 border-2 border-blue-200 border-dashed rounded flex items-center justify-center">
                    <div className="text-blue-600 font-medium text-sm">
                      🤖 AI analyzing...
                    </div>
                  </div>
                )}
              </div>
            </div>

            {loadingAI && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <div className="text-blue-800 font-medium">🤖 Claude AI is analyzing your drawing...</div>
                    <div className="text-blue-600 text-sm">Extracting dimensions and identifying all pieces</div>
                  </div>
                </div>
              </div>
            )}

            <textarea
              placeholder="Notes (optional)"
              value={product.note || ""}
              onChange={(e) => updateProduct(index, 'note', e.target.value)}
              className="w-full border p-2 rounded mt-2"
              rows={2}
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Another Product
          </button>
          
          <button
            onClick={calculateAll}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            Calculate with Optimization
          </button>
          
          {allResults.length > 0 && (
            <>
              <button
                onClick={generatePDF}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                📄 Generate PDF
              </button>
              
              <button
                onClick={sendEmailToClient}
                disabled={sendingEmail || !userInfo.email}
                className={`px-6 py-3 text-white rounded font-semibold transition-all ${
                  sendingEmail || !userInfo.email 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {sendingEmail ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  '📧 Email Quote'
                )}
              </button>
            </>
          )}
        </div>

        {/* Email status message */}
        {emailStatus && (
          <div className={`mt-4 p-4 rounded-lg text-center font-medium animate-pulse ${
            emailStatus.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 
            emailStatus.includes('❌') ? 'bg-red-100 text-red-800 border border-red-300' : 
            'bg-blue-100 text-blue-800 border border-blue-300'
          }`}>
            {emailStatus}
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded shadow-md space-y-4 text-left">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          {allResults.length > 0 && !userInfo.email && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded mb-4">
              ⚠️ Email address is required to send quotes
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={userInfo?.name || ""}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={userInfo?.email || ""}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className={`border px-4 py-2 rounded w-full ${
                allResults.length > 0 && !userInfo.email ? 'border-red-500' : ''
              }`}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={userInfo?.phone || ""}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        {/* Results Section */}
        {allResults.length > 0 && (
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Optimized Results 
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({includeKerf ? `Production Mode (${kerfWidth}" kerf)` : 'Theoretical Mode (no kerf)'})
                </span>
              </h3>
              
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={showVisualLayouts}
                    onChange={(e) => setShowVisualLayouts(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Show Visual Layouts</span>
                </label>
              </div>
            </div>

            {/* Visual Layouts */}
            {showVisualLayouts && (
              <div className="mb-6 space-y-6">
                {allResults.map((product, productIndex) => {
                  if (!product.result) return null;
                  
                  const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
                  const slabWidth = parseFloat(stone?.["Slab Width"]) || 126;
                  const slabHeight = parseFloat(stone?.["Slab Height"]) || 63;
                  
                  return (
                    <div key={productIndex} className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Layout Preview: {product.customName || `Product ${productIndex + 1}`} - {product.stone} ({product.width}x{product.depth})
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
                        
                        <div className="w-full lg:w-64 bg-gray-50 p-4 rounded">
                          <h5 className="font-semibold mb-3">Layout Analysis</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-blue-200 border-2 border-blue-600"></div>
                              <span>Vertical: {product.width}x{product.depth}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-orange-200 border-2 border-orange-600"></div>
                              <span>Horizontal: {product.depth}x{product.width}</span>
                            </div>
                            {includeKerf && (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-red-200 border border-red-400"></div>
                                <span>Kerf: {kerfWidth}"</span>
                              </div>
                            )}
                            
                            <div className="pt-2 border-t space-y-1">
                              <div><strong>Max Pieces/Slab:</strong> {product.result.topsPerSlab}</div>
                              <div><strong>Total Quantity:</strong> {product.quantity}</div>
                              <div><strong>Efficiency:</strong> <span className="text-green-600 font-semibold">{product.result.efficiency?.toFixed(1) || '0'}%</span></div>
                              <div><strong>Slabs Needed:</strong> {product.result.totalSlabsNeeded}</div>
                              
                              {product.priority && product.priority !== 'normal' && (
                                <div className="pt-1">
                                  <strong>Priority:</strong> 
                                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                                    product.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {product.priority === 'high' ? 'High' : 'Low'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {product.note && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <strong className="text-yellow-800">Notes:</strong>
                          <p className="text-sm text-yellow-700 mt-1">{product.note}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Results Table - UPDATED RESPONSIVE VERSION */}
            <div className="overflow-hidden">
              <table className="w-full border-collapse border text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">Product</th>
                    <th className="border px-2 py-2">Stone</th>
                    <th className="border px-2 py-2">Size</th>
                    <th className="border px-2 py-2">Qty</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Edge</th>
                    <th className="border px-2 py-2 hidden lg:table-cell">Area</th>
                    <th className="border px-2 py-2">Per Slab</th>
                    <th className="border px-2 py-2">Slabs</th>
                    <th className="border px-2 py-2">Eff %</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Material</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Fab</th>
                    <th className="border px-2 py-2 hidden lg:table-cell">Cost</th>
                    <th className="border px-2 py-2 font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {allResults.map((p, i) => (
                    <tr key={i} className="text-center hover:bg-gray-50">
                      <td className="border px-2 py-2 text-left">
                        <div className="font-medium text-xs">
                          {p.customName || `Product ${i + 1}`}
                        </div>
                        {p.note && (
                          <div className="text-xs text-gray-600 mt-1 hidden xl:block">{p.note}</div>
                        )}
                      </td>
                      <td className="border px-2 py-2 text-xs">{p.stone}</td>
                      <td className="border px-2 py-2 text-xs">{p.width}×{p.depth}</td>
                      <td className="border px-2 py-2">{p.quantity}</td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">{p.edgeDetail}</td>
                      <td className="border px-2 py-2 hidden lg:table-cell">{p.result?.usableAreaSqft?.toFixed(1)}</td>
                      <td className="border px-2 py-2 font-semibold text-purple-600">
                        {p.result?.topsPerSlab || '-'}
                      </td>
                      <td className="border px-2 py-2 font-semibold text-blue-600">
                        {p.result?.totalSlabsNeeded || '-'}
                      </td>
                      <td className="border px-2 py-2">
                        <span className={`font-semibold ${
                          (p.result?.efficiency || 0) > 80 ? 'text-green-600' : 
                          (p.result?.efficiency || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {p.result?.efficiency?.toFixed(0) || '0'}
                        </span>
                      </td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">
                        ${p.result?.materialCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">
                        ${p.result?.fabricationCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 text-xs hidden lg:table-cell">
                        ${p.result?.rawCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 font-bold text-green-600">
                        ${p.result?.finalPrice?.toFixed(0) || '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={9} className="border px-2 py-2 text-right">Totals:</td>
                    <td className="border px-2 py-2 text-center text-blue-700 hidden md:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.materialCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-orange-600 hidden md:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.fabricationCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-gray-700 hidden lg:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.rawCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-green-600 text-sm">
                      ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile-Friendly Summary Cards (shown on small screens) */}
            <div className="md:hidden mt-4 space-y-3">
              {allResults.map((p, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{p.customName || `Product ${i + 1}`}</h4>
                    <span className="text-green-600 font-bold">${p.result?.finalPrice?.toFixed(0)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Stone: {p.stone}</div>
                    <div>Size: {p.width}×{p.depth}</div>
                    <div>Quantity: {p.quantity}</div>
                    <div>Slabs: {p.result?.totalSlabsNeeded || '-'}</div>
                    <div>Per Slab: {p.result?.topsPerSlab || '-'}</div>
                    <div>Efficiency: {p.result?.efficiency?.toFixed(0) || '0'}%</div>
                  </div>
                  {p.note && <div className="mt-2 text-xs text-gray-500">{p.note}</div>}
                </div>
              ))}
            </div>

            {/* Summary Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800">Total Slabs Needed</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-semibold text-green-800">Average Efficiency</h4>
                <p className="text-2xl font-bold text-green-600">
                  {allResults.length > 0 ? 
                    (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : 
                    '0'
                  }%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-semibold text-purple-800">Material Savings</h4>
                <p className="text-sm text-purple-600">vs. Standard Calculation</p>
                <p className="text-xl font-bold text-purple-600">Optimized!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} + totalPrice,
        total_slabs: totalSlabs.toString(),
        average_efficiency: avgEfficiency + '%',
        products_list: allResults.map(p => 
          `- ${p.customName || 'Product'}: ${p.stone} ${p.width}"×${p.depth}" (Qty: ${p.quantity}) - ${p.result?.finalPrice?.toFixed(2) || '0.00'}`
        ).join('\n'),
        quote_date: new Date().toLocaleDateString(),
        // Add HTML content with logo
        html_content: `
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://claudetool.vercel.app/aic.jpg" alt="AIC Surfaces Logo" style="max-width: 200px; height: auto; margin: 0 auto 20px;">
            <h1 style="color: #1e40af; font-size: 28px; margin: 0;">AIC SURFACES</h1>
            <p style="color: #666; font-size: 16px; margin: 5px 0;">Professional Stone Fabrication Quote</p>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #333; font-size: 20px; margin: 0 0 10px;">Dear ${userInfo.name},</h2>
            <p style="color: #555; line-height: 1.6;">Thank you for choosing AIC Surfaces for your stone fabrication needs. We're pleased to provide you with a customized quote using our advanced slab optimization technology.</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin: 0 0 15px;">Quote Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Total Price:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #059669; font-size: 20px; font-weight: bold;">${totalPrice}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Total Slabs Needed:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${totalSlabs}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;"><strong>Average Efficiency:</strong></td>
                <td style="padding: 10px 0; text-align: right;">${avgEfficiency}%</td>
              </tr>
            </table>
          </div>
          <div style="background: #f0f4f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin: 0 0 15px;">Products Included:</h3>
            <div style="white-space: pre-line; color: #555; line-height: 1.8;">${allResults.map(p => 
              `• ${p.customName || 'Product'}: ${p.stone} ${p.width}"×${p.depth}" (Qty: ${p.quantity}) - ${p.result?.finalPrice?.toFixed(2) || '0.00'}`
            ).join('\n')}</div>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #666; margin: 5px 0;">This quote is valid for 30 days from ${new Date().toLocaleDateString()}</p>
            <p style="color: #999; font-size: 14px; margin: 5px 0;">Generated by AIC Surfaces Stone Estimator</p>
          </div>
        `
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl space-y-6 text-center">
        
        <div className="text-center mb-4">
          {/* Remove or replace logo reference */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AIC SURFACES</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Stone Estimator with Slab Optimization</h2>
          <p className="text-base font-medium text-gray-600">Developed by Roy Kariok</p>
        </div>

        {!adminMode && (
          <div className="mb-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
              className="border px-4 py-2 rounded"
            />
            <button
              onClick={() => setAdminMode(adminPassword === correctPassword)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enter Admin Mode
            </button>
          </div>
        )}

        {/* Advanced Settings Panel */}
        <div className="bg-blue-50 p-4 rounded shadow-md space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-800">Optimization Settings</h2>
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAdvancedSettings ? '▼ Hide Advanced' : '▶ Show Advanced'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="includeKerf"
                checked={includeKerf}
                onChange={(e) => setIncludeKerf(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="includeKerf" className="font-medium">
                Include Kerf (Saw Blade Width)
              </label>
              {includeKerf && (
                <span className="text-sm text-gray-600">({kerfWidth}")</span>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              <strong>Current Mode:</strong> {includeKerf ? 'Production (with kerf)' : 'Theoretical (no kerf)'}
            </div>
          </div>

          {showAdvancedSettings && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kerf Width (inches)</label>
                  <select
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                    className="border px-3 py-2 rounded w-full text-sm"
                    disabled={!includeKerf}
                  >
                    <option value={0.125}>1/8" (0.125) - Standard</option>
                    <option value={0.1875}>3/16" (0.1875) - Thick Material</option>
                    <option value={0.25}>1/4" (0.25) - Heavy Duty</option>
                    <option value={0.09375}>3/32" (0.094) - Thin Blade</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Breakage Buffer (%)</label>
                  <select
                    value={breakageBuffer}
                    onChange={(e) => setBreakageBuffer(parseInt(e.target.value))}
                    className="border px-3 py-2 rounded w-full text-sm"
                  >
                    <option value={5}>5% - Conservative</option>
                    <option value={10}>10% - Standard</option>
                    <option value={15}>15% - High Risk</option>
                    <option value={20}>20% - Very High Risk</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Quick Presets</label>
                  <select
                    onChange={(e) => {
                      const preset = e.target.value;
                      if (preset === 'production') {
                        setIncludeKerf(true);
                        setKerfWidth(0.125);
                        setBreakageBuffer(10);
                      } else if (preset === 'theoretical') {
                        setIncludeKerf(false);
                        setBreakageBuffer(5);
                      } else if (preset === 'conservative') {
                        setIncludeKerf(true);
                        setKerfWidth(0.1875);
                        setBreakageBuffer(15);
                      }
                    }}
                    className="border px-3 py-2 rounded w-full text-sm"
                  >
                    <option value="">Select Preset...</option>
                    <option value="theoretical">Theoretical Maximum</option>
                    <option value="production">Production Standard</option>
                    <option value="conservative">Conservative Estimate</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {products.map((product, index) => (
          <div key={product.id} className="bg-gray-50 p-4 rounded shadow space-y-4 text-left relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-700">
                  {product.customName || `Product ${index + 1}`}
                </h3>
                {product.priority === 'high' && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High Priority</span>
                )}
                {product.priority === 'low' && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Low Priority</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 font-bold text-xl hover:text-red-800"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <select
                value={product.stone}
                onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="">Select Stone Type...</option>
                {stoneOptions.map((stone, i) => (
                  <option key={i} value={stone["Stone Type"]}>{stone["Stone Type"]}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Width (in)"
                value={product.width}
                onChange={(e) => updateProduct(index, 'width', e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Depth (in)"
                value={product.depth}
                onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                className="border px-4 py-2 rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <select
                value={product.edgeDetail}
                onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                className="border px-4 py-2 rounded"
              >
                <option value="Eased">Eased</option>
                <option value="1.5 mitered">1.5" mitered</option>
                <option value="Bullnose">Bullnose</option>
                <option value="Ogee">Ogee</option>
                <option value="Beveled">Beveled</option>
              </select>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf,.dwg,.dxf"
                  onChange={(e) => handleDrawingUpload(e, index)}
                  className="border px-4 py-2 rounded w-full"
                  disabled={loadingAI}
                />
                {loadingAI && (
                  <div className="absolute inset-0 bg-blue-50 border-2 border-blue-200 border-dashed rounded flex items-center justify-center">
                    <div className="text-blue-600 font-medium text-sm">
                      🤖 AI analyzing...
                    </div>
                  </div>
                )}
              </div>
            </div>

            {loadingAI && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <div className="text-blue-800 font-medium">🤖 Claude AI is analyzing your drawing...</div>
                    <div className="text-blue-600 text-sm">Extracting dimensions and identifying all pieces</div>
                  </div>
                </div>
              </div>
            )}

            <textarea
              placeholder="Notes (optional)"
              value={product.note || ""}
              onChange={(e) => updateProduct(index, 'note', e.target.value)}
              className="w-full border p-2 rounded mt-2"
              rows={2}
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Another Product
          </button>
          
          <button
            onClick={calculateAll}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            Calculate with Optimization
          </button>
          
          {allResults.length > 0 && (
            <>
              <button
                onClick={generatePDF}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              >
                📄 Generate PDF
              </button>
              
              <button
                onClick={sendEmailToClient}
                disabled={sendingEmail || !userInfo.email}
                className={`px-6 py-3 text-white rounded font-semibold transition-all ${
                  sendingEmail || !userInfo.email 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {sendingEmail ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  '📧 Email Quote'
                )}
              </button>
            </>
          )}
        </div>

        {/* Email status message */}
        {emailStatus && (
          <div className={`mt-4 p-4 rounded-lg text-center font-medium animate-pulse ${
            emailStatus.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 
            emailStatus.includes('❌') ? 'bg-red-100 text-red-800 border border-red-300' : 
            'bg-blue-100 text-blue-800 border border-blue-300'
          }`}>
            {emailStatus}
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded shadow-md space-y-4 text-left">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          {allResults.length > 0 && !userInfo.email && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded mb-4">
              ⚠️ Email address is required to send quotes
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={userInfo?.name || ""}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="border px-4 py-2 rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={userInfo?.email || ""}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className={`border px-4 py-2 rounded w-full ${
                allResults.length > 0 && !userInfo.email ? 'border-red-500' : ''
              }`}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={userInfo?.phone || ""}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        {/* Results Section */}
        {allResults.length > 0 && (
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Optimized Results 
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({includeKerf ? `Production Mode (${kerfWidth}" kerf)` : 'Theoretical Mode (no kerf)'})
                </span>
              </h3>
              
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={showVisualLayouts}
                    onChange={(e) => setShowVisualLayouts(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Show Visual Layouts</span>
                </label>
              </div>
            </div>

            {/* Visual Layouts */}
            {showVisualLayouts && (
              <div className="mb-6 space-y-6">
                {allResults.map((product, productIndex) => {
                  if (!product.result) return null;
                  
                  const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
                  const slabWidth = parseFloat(stone?.["Slab Width"]) || 126;
                  const slabHeight = parseFloat(stone?.["Slab Height"]) || 63;
                  
                  return (
                    <div key={productIndex} className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Layout Preview: {product.customName || `Product ${productIndex + 1}`} - {product.stone} ({product.width}x{product.depth})
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
                        
                        <div className="w-full lg:w-64 bg-gray-50 p-4 rounded">
                          <h5 className="font-semibold mb-3">Layout Analysis</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-blue-200 border-2 border-blue-600"></div>
                              <span>Vertical: {product.width}x{product.depth}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-orange-200 border-2 border-orange-600"></div>
                              <span>Horizontal: {product.depth}x{product.width}</span>
                            </div>
                            {includeKerf && (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-red-200 border border-red-400"></div>
                                <span>Kerf: {kerfWidth}"</span>
                              </div>
                            )}
                            
                            <div className="pt-2 border-t space-y-1">
                              <div><strong>Max Pieces/Slab:</strong> {product.result.topsPerSlab}</div>
                              <div><strong>Total Quantity:</strong> {product.quantity}</div>
                              <div><strong>Efficiency:</strong> <span className="text-green-600 font-semibold">{product.result.efficiency?.toFixed(1) || '0'}%</span></div>
                              <div><strong>Slabs Needed:</strong> {product.result.totalSlabsNeeded}</div>
                              
                              {product.priority && product.priority !== 'normal' && (
                                <div className="pt-1">
                                  <strong>Priority:</strong> 
                                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                                    product.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {product.priority === 'high' ? 'High' : 'Low'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {product.note && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <strong className="text-yellow-800">Notes:</strong>
                          <p className="text-sm text-yellow-700 mt-1">{product.note}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Results Table - UPDATED RESPONSIVE VERSION */}
            <div className="overflow-hidden">
              <table className="w-full border-collapse border text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">Product</th>
                    <th className="border px-2 py-2">Stone</th>
                    <th className="border px-2 py-2">Size</th>
                    <th className="border px-2 py-2">Qty</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Edge</th>
                    <th className="border px-2 py-2 hidden lg:table-cell">Area</th>
                    <th className="border px-2 py-2">Per Slab</th>
                    <th className="border px-2 py-2">Slabs</th>
                    <th className="border px-2 py-2">Eff %</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Material</th>
                    <th className="border px-2 py-2 hidden md:table-cell">Fab</th>
                    <th className="border px-2 py-2 hidden lg:table-cell">Cost</th>
                    <th className="border px-2 py-2 font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {allResults.map((p, i) => (
                    <tr key={i} className="text-center hover:bg-gray-50">
                      <td className="border px-2 py-2 text-left">
                        <div className="font-medium text-xs">
                          {p.customName || `Product ${i + 1}`}
                        </div>
                        {p.note && (
                          <div className="text-xs text-gray-600 mt-1 hidden xl:block">{p.note}</div>
                        )}
                      </td>
                      <td className="border px-2 py-2 text-xs">{p.stone}</td>
                      <td className="border px-2 py-2 text-xs">{p.width}×{p.depth}</td>
                      <td className="border px-2 py-2">{p.quantity}</td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">{p.edgeDetail}</td>
                      <td className="border px-2 py-2 hidden lg:table-cell">{p.result?.usableAreaSqft?.toFixed(1)}</td>
                      <td className="border px-2 py-2 font-semibold text-purple-600">
                        {p.result?.topsPerSlab || '-'}
                      </td>
                      <td className="border px-2 py-2 font-semibold text-blue-600">
                        {p.result?.totalSlabsNeeded || '-'}
                      </td>
                      <td className="border px-2 py-2">
                        <span className={`font-semibold ${
                          (p.result?.efficiency || 0) > 80 ? 'text-green-600' : 
                          (p.result?.efficiency || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {p.result?.efficiency?.toFixed(0) || '0'}
                        </span>
                      </td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">
                        ${p.result?.materialCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 text-xs hidden md:table-cell">
                        ${p.result?.fabricationCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 text-xs hidden lg:table-cell">
                        ${p.result?.rawCost?.toFixed(0) || '0'}
                      </td>
                      <td className="border px-2 py-2 font-bold text-green-600">
                        ${p.result?.finalPrice?.toFixed(0) || '0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={9} className="border px-2 py-2 text-right">Totals:</td>
                    <td className="border px-2 py-2 text-center text-blue-700 hidden md:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.materialCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-orange-600 hidden md:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.fabricationCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-gray-700 hidden lg:table-cell">
                      ${allResults.reduce((sum, p) => sum + (p.result?.rawCost || 0), 0).toFixed(0)}
                    </td>
                    <td className="border px-2 py-2 text-center text-green-600 text-sm">
                      ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile-Friendly Summary Cards (shown on small screens) */}
            <div className="md:hidden mt-4 space-y-3">
              {allResults.map((p, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{p.customName || `Product ${i + 1}`}</h4>
                    <span className="text-green-600 font-bold">${p.result?.finalPrice?.toFixed(0)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>Stone: {p.stone}</div>
                    <div>Size: {p.width}×{p.depth}</div>
                    <div>Quantity: {p.quantity}</div>
                    <div>Slabs: {p.result?.totalSlabsNeeded || '-'}</div>
                    <div>Per Slab: {p.result?.topsPerSlab || '-'}</div>
                    <div>Efficiency: {p.result?.efficiency?.toFixed(0) || '0'}%</div>
                  </div>
                  {p.note && <div className="mt-2 text-xs text-gray-500">{p.note}</div>}
                </div>
              ))}
            </div>

            {/* Summary Statistics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800">Total Slabs Needed</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-semibold text-green-800">Average Efficiency</h4>
                <p className="text-2xl font-bold text-green-600">
                  {allResults.length > 0 ? 
                    (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : 
                    '0'
                  }%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-semibold text-purple-800">Material Savings</h4>
                <p className="text-sm text-purple-600">vs. Standard Calculation</p>
                <p className="text-xl font-bold text-purple-600">Optimized!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
