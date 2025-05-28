import { useState, useEffect } from 'react';

// Icon Components
const CheckCircle = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Calculator = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const FileText = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Mail = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Save = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const FolderOpen = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
  </svg>
);

const ChevronRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Plus = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const X = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Upload = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const Sparkles = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const TrendingUp = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const DollarSign = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Package = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const BarChart3 = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Info = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircle = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Modern Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

// Modern Button Component
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-sm',
    outline: 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    sm: 'px-3 py-1.5 text-xs'
  };
  
  return (
    <button
      className={`font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Slab Layout Visualization Component with animations
const SlabLayoutVisualization = ({ pieces, slabWidth, slabHeight, maxPiecesPerSlab, includeKerf, kerfWidth, showMaxLayout = false }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [pieces]);
  
  if (!pieces || pieces.length === 0) return null;

  const pieceWidth = pieces[0]?.width || 0;
  const pieceHeight = pieces[0]?.depth || 0;
  const kerf = includeKerf ? kerfWidth : 0;

  const generateOptimalLayout = () => {
    const layout = [];
    const targetPieces = showMaxLayout ? maxPiecesPerSlab : Math.min(pieces.length, maxPiecesPerSlab);
    
    const verticalCols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf));
    const verticalRows = Math.floor((slabHeight + kerf) / (pieceHeight + kerf));
    const verticalTotal = verticalCols * verticalRows;
    
    const horizontalCols = Math.floor((slabWidth + kerf) / (pieceHeight + kerf));
    const horizontalRows = Math.floor((slabHeight + kerf) / (pieceWidth + kerf));
    const horizontalTotal = horizontalCols * horizontalRows;
    
    if (verticalTotal >= targetPieces) {
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
      const vRow = Math.floor((slabHeight + kerf) / (pieceHeight + kerf));
      const vCols = Math.floor((slabWidth + kerf) / (pieceWidth + kerf));
      
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
        
        const usedHeight = pieceHeight + kerf;
        const remainingHeight = slabHeight - usedHeight;
        
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
  
  const containerWidth = 500;
  const containerHeight = 300;
  const scaleX = containerWidth / slabWidth;
  const scaleY = containerHeight / slabHeight;
  const scale = Math.min(scaleX, scaleY) * 0.85;

  const scaledSlabWidth = slabWidth * scale;
  const scaledSlabHeight = slabHeight * scale;

  // Generate grid lines
  const gridLines = [];
  const gridSpacing = 12; // inches
  for (let x = gridSpacing; x < slabWidth; x += gridSpacing) {
    gridLines.push({ x1: x * scale, y1: 0, x2: x * scale, y2: scaledSlabHeight });
  }
  for (let y = gridSpacing; y < slabHeight; y += gridSpacing) {
    gridLines.push({ x1: 0, y1: y * scale, x2: scaledSlabWidth, y2: y * scale });
  }

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <Package className="w-4 h-4" />
        <span>Slab Dimensions: {slabWidth}" × {slabHeight}"</span>
      </div>
      
      <div 
        className="relative mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner overflow-hidden"
        style={{ 
          width: `${scaledSlabWidth}px`, 
          height: `${scaledSlabHeight}px`
        }}
      >
        {/* Grid Background */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          {gridLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="2,4"
            />
          ))}
        </svg>
        
        {/* Slab Border */}
        <div className="absolute inset-0 border-2 border-slate-400 rounded-lg pointer-events-none" />
        
        {/* Pieces */}
        {layoutPieces.map((piece, index) => (
          <div
            key={piece.id}
            className={`absolute flex flex-col items-center justify-center text-xs font-medium rounded transition-all duration-300 ${
              isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{
              left: `${piece.x * scale}px`,
              top: `${piece.y * scale}px`,
              width: `${piece.width * scale - 2}px`,
              height: `${piece.height * scale - 2}px`,
              transitionDelay: `${index * 50}ms`,
              background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
              border: '2px solid #059669',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div className="text-white font-bold text-sm">{piece.id}</div>
            <div className="text-emerald-100 text-[10px]">{piece.width}×{piece.height}"</div>
            {piece.orientation === 'horizontal' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white">
                R
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded border border-emerald-600"></div>
          <span>Standard Orientation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded border border-emerald-600 relative">
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <span>Rotated 90°</span>
        </div>
      </div>
      
      <div className="mt-2 text-center text-sm text-gray-600">
        {pieces.length < maxPiecesPerSlab ? 
          `Showing ${layoutPieces.length} of ${pieces.length} pieces (max ${maxPiecesPerSlab} per slab)` :
          `Showing ${layoutPieces.length} pieces (maximum capacity)`
        }
      </div>
    </div>
  );
};

// Modern Toggle Component
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center justify-between cursor-pointer group">
    {label && <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>}
    <div 
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        checked ? 'bg-gradient-to-r from-teal-500 to-teal-600' : 'bg-gray-200'
      }`}
      onClick={onChange}
    >
      <div 
        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 shadow-sm ${
          checked ? 'left-5' : 'left-0.5'
        }`}
      />
    </div>
  </label>
);

export default function StoneTopEstimator() {
  const [stoneOptions, setStoneOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const correctPassword = 'stone123';
  const [showResults, setShowResults] = useState(false);

  const [includeKerf, setIncludeKerf] = useState(true);
  const [kerfWidth, setKerfWidth] = useState(0.125);
  const [breakageBuffer, setBreakageBuffer] = useState(10);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showVisualLayouts, setShowVisualLayouts] = useState(true);
  const [optimizeAcrossProducts, setOptimizeAcrossProducts] = useState(false);

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
  
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const [savedQuotes, setSavedQuotes] = useState([]);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);
  const [quoteName, setQuoteName] = useState('');

  useEffect(() => {
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

  const saveQuote = () => {
    const quoteName = prompt('Enter a name for this quote:');
    if (!quoteName) return;

    const quoteData = {
      id: Date.now(),
      name: quoteName,
      date: new Date().toISOString(),
      userInfo,
      products: products.map(p => ({...p, result: null})),
      settings: {
        includeKerf,
        kerfWidth,
        breakageBuffer,
        showVisualLayouts,
        optimizeAcrossProducts
      }
    };

    const newSavedQuotes = [...savedQuotes, quoteData];
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem('aicSavedQuotes', JSON.stringify(newSavedQuotes));
    alert('Quote saved successfully!');
  };

  const loadQuote = (quote) => {
    setUserInfo(quote.userInfo);
    setProducts(quote.products);
    setIncludeKerf(quote.settings.includeKerf);
    setKerfWidth(quote.settings.kerfWidth);
    setBreakageBuffer(quote.settings.breakageBuffer);
    setShowVisualLayouts(quote.settings.showVisualLayouts);
    setOptimizeAcrossProducts(quote.settings.optimizeAcrossProducts || false);
    setShowSavedQuotes(false);
    alert('Quote loaded successfully!');
  };

  const deleteQuote = (quoteId) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      const newSavedQuotes = savedQuotes.filter(q => q.id !== quoteId);
      setSavedQuotes(newSavedQuotes);
      localStorage.setItem('aicSavedQuotes', JSON.stringify(newSavedQuotes));
    }
  };

  const calculateMaxPiecesPerSlab = (pieceW, pieceH, slabW, slabH) => {
    const kerf = includeKerf ? kerfWidth : 0;
    let maxPieces = 0;

    const fit1W = Math.floor((slabW + kerf) / (pieceW + kerf));
    const fit1H = Math.floor((slabH + kerf) / (pieceH + kerf));
    const option1 = fit1W * fit1H;

    const fit2W = Math.floor((slabW + kerf) / (pieceH + kerf));
    const fit2H = Math.floor((slabH + kerf) / (pieceW + kerf));
    const option2 = fit2W * fit2H;

    maxPieces = Math.max(option1, option2);

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

  const handleDrawingUpload = async (e, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setLoadingAI(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1];
          
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

  const generateQuotePDF = () => {
    console.log('generateQuotePDF function called!');
    
    if (!allResults || allResults.length === 0) {
      alert("Please calculate estimates first");
      return;
    }

    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    const avgEfficiency = allResults.length > 0 ? 
      (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';

    const printWindow = window.open('', '_blank', 'width=900,height=800');
    
    if (!printWindow) {
      console.log('Popup blocked, trying alternative method...');
      showPrintView();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AIC Surfaces - Premium Stone Quote</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            color: #1a1a1a;
            line-height: 1.6;
            background: #ffffff;
          }
          
          .page-container {
            max-width: 850px;
            margin: 0 auto;
            padding: 40px;
            background: white;
          }
          
          /* Header Section */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #e5e7eb;
          }
          
          .logo-section {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .logo {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .company-info h1 {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            color: #0f766e;
            margin-bottom: 4px;
          }
          
          .company-info p {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.05em;
          }
          
          .quote-number {
            text-align: right;
          }
          
          .quote-number h2 {
            font-size: 24px;
            color: #0f766e;
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .quote-number p {
            color: #6b7280;
            font-size: 14px;
          }
          
          /* Trust Markers */
          .trust-markers {
            background: #f0fdfa;
            border: 1px solid #5eead4;
            border-radius: 12px;
            padding: 16px 24px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-around;
            gap: 30px;
          }
          
          .trust-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #0f766e;
            font-weight: 500;
          }
          
          .trust-item .icon {
            color: #10b981;
            font-size: 18px;
          }
          
          /* Customer Section */
          .customer-section {
            background: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .customer-section h3 {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .customer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          
          .customer-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .customer-field label {
            font-size: 12px;
            font-weight: 500;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .customer-field value {
            font-size: 16px;
            color: #1f2937;
            font-weight: 500;
          }
          
          /* Summary Cards */
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .summary-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .summary-card.primary {
            background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
            color: white;
            border: none;
          }
          
          .summary-card.primary .label { color: #a7f3d0; }
          
          .summary-card .value {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          
          .summary-card .label {
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          /* Products Section */
          .products-section {
            margin-bottom: 30px;
          }
          
          .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .section-header h3 {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .product-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            position: relative;
          }
          
          .product-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .product-name {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .product-price {
            font-size: 24px;
            font-weight: 700;
            color: #059669;
          }
          
          .product-details {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          
          .detail-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .detail-value {
            font-size: 14px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .efficiency-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
          }
          
          .efficiency-high {
            background: #d1fae5;
            color: #065f46;
          }
          
          .efficiency-medium {
            background: #fef3c7;
            color: #92400e;
          }
          
          .efficiency-low {
            background: #fee2e2;
            color: #991b1b;
          }
          
          .optimized-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #14b8a6;
            color: white;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
          }
          
          /* Footer Section */
          .footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
          }
          
          .footer-content {
            margin-bottom: 20px;
          }
          
          .footer-content p {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4b5563;
            font-size: 14px;
          }
          
          .tagline {
            font-style: italic;
            color: #9ca3af;
            font-size: 13px;
            margin-top: 20px;
          }
          
          @media print { 
            .no-print { display: none !important; }
            body { background: white; }
            .page-container { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <!-- Header -->
          <div class="header">
            <div class="logo-section">
              <img src="${window.location.origin}/AIC.jpg" alt="AIC Surfaces" class="logo" onerror="this.style.display='none'" />
              <div class="company-info">
                <h1>AIC SURFACES</h1>
                <p>PREMIUM STONE FABRICATION</p>
              </div>
            </div>
            <div class="quote-number">
              <h2>QUOTE #${Date.now().toString().slice(-6)}</h2>
              <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          
          <!-- Trust Markers -->
          <div class="trust-markers">
            <div class="trust-item">
              <span class="icon">✓</span>
              <span>Licensed & Insured</span>
            </div>
            <div class="trust-item">
              <span class="icon">✓</span>
              <span>20+ Years Experience</span>
            </div>
            <div class="trust-item">
              <span class="icon">✓</span>
              <span>AI-Optimized Layouts</span>
            </div>
            <div class="trust-item">
              <span class="icon">✓</span>
              <span>Best Price Guarantee</span>
            </div>
          </div>
          
          <!-- Customer Information -->
          <div class="customer-section">
            <h3>
              <span>👤</span>
              Customer Information
            </h3>
            <div class="customer-grid">
              <div class="customer-field">
                <label>Full Name</label>
                <value>${userInfo.name || 'Not Provided'}</value>
              </div>
              <div class="customer-field">
                <label>Email Address</label>
                <value>${userInfo.email || 'Not Provided'}</value>
              </div>
              <div class="customer-field">
                <label>Phone Number</label>
                <value>${userInfo.phone || 'Not Provided'}</value>
              </div>
            </div>
          </div>
          
          <!-- Summary Cards -->
          <div class="summary-cards">
            <div class="summary-card primary">
              <div class="value">$${totalPrice}</div>
              <div class="label">Total Investment</div>
            </div>
            <div class="summary-card">
              <div class="value">${totalSlabs}</div>
              <div class="label">Slabs Required</div>
            </div>
            <div class="summary-card">
              <div class="value">${avgEfficiency}%</div>
              <div class="label">Avg. Efficiency</div>
            </div>
          </div>
          
          <!-- Products -->
          <div class="products-section">
            <div class="section-header">
              <span style="font-size: 24px;">📦</span>
              <h3>Quote Details</h3>
            </div>
            
            ${allResults.map((p, i) => {
              const effClass = p.result?.efficiency > 80 ? 'efficiency-high' : 
                              p.result?.efficiency > 60 ? 'efficiency-medium' : 'efficiency-low';
              return `
                <div class="product-card">
                  ${p.result?.sharedSlabs ? '<div class="optimized-badge">Optimized</div>' : ''}
                  <div class="product-header">
                    <div class="product-name">${p.customName || `Product ${i + 1}`}</div>
                    <div class="product-price">$${p.result?.finalPrice?.toFixed(2) || '0.00'}</div>
                  </div>
                  <div class="product-details">
                    <div class="detail-item">
                      <div class="detail-label">Stone Type</div>
                      <div class="detail-value">${p.stone}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Dimensions</div>
                      <div class="detail-value">${p.width}" × ${p.depth}"</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Quantity</div>
                      <div class="detail-value">${p.quantity} pieces</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Edge Detail</div>
                      <div class="detail-value">${p.edgeDetail}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Area</div>
                      <div class="detail-value">${p.result?.usableAreaSqft?.toFixed(1) || '0'} sq ft</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Slabs</div>
                      <div class="detail-value">${p.result?.totalSlabsNeeded || '0'}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Per Slab</div>
                      <div class="detail-value">${p.result?.topsPerSlab || '0'} pieces</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Efficiency</div>
                      <div class="detail-value">
                        <span class="efficiency-badge ${effClass}">
                          ${p.result?.efficiency?.toFixed(0) || '0'}%
                        </span>
                      </div>
                    </div>
                  </div>
                  ${p.note ? `
                    <div style="margin-top: 12px; padding: 12px; background: #fef3c7; border-radius: 8px; font-size: 13px; color: #92400e;">
                      <strong>Note:</strong> ${p.note}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
          
          ${optimizeAcrossProducts ? `
            <div style="background: #f0fdfa; border: 1px solid #5eead4; border-radius: 8px; padding: 16px; margin-bottom: 30px; text-align: center;">
              <p style="color: #0f766e; font-size: 14px; margin: 0;">
                <strong>✨ Cross-Product Optimization Enabled</strong><br>
                <span style="font-size: 13px;">Products with the same stone type have been optimized to share slabs when possible, maximizing material efficiency.</span>
              </p>
            </div>
          ` : ''}
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-content">
              <p><strong>This quote is valid for 30 days from the date above</strong></p>
              <p>Prices subject to material availability and final measurements</p>
              
              <div class="contact-info">
                <div class="contact-item">
                  <span>📞</span>
                  <span>(555) 123-4567</span>
                </div>
                <div class="contact-item">
                  <span>✉️</span>
                  <span>quotes@aicsurfaces.com</span>
                </div>
                <div class="contact-item">
                  <span>🌐</span>
                  <span>www.aicsurfaces.com</span>
                </div>
              </div>
            </div>
            
            <p class="tagline">Generated by AIC Surfaces Stone Estimator • Powered by AI Optimization</p>
          </div>
        </div>
        
        <div class="no-print" style="text-align: center; margin: 40px;">
          <button onclick="window.print()" style="
            padding: 16px 40px;
            background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          ">
            Print / Save as PDF
          </button>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  const showPrintView = () => {
    const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
    const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
    
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: -apple-system, sans-serif;">
        <h1 style="text-align: center; color: #0f766e; font-size: 32px;">AIC SURFACES - QUOTE</h1>
        <p style="text-align: center; color: #6b7280;">Customer: ${userInfo.name || 'N/A'} | Date: ${new Date().toLocaleDateString()}</p>
        
        <div style="margin: 40px 0; padding: 20px; background: #f0fdfa; border-radius: 12px; text-align: center;">
          <h2 style="color: #0f766e; margin-bottom: 10px;">Total: $${totalPrice}</h2>
          <p style="color: #14b8a6;">Slabs Required: ${totalSlabs}</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
          <button onclick="window.print()" style="
            padding: 16px 40px;
            background: #0f766e;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            margin-right: 10px;
          ">
            Print / Save as PDF
          </button>
          <button onclick="location.reload()" style="
            padding: 16px 40px;
            background: #6b7280;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
          ">
            Go Back
          </button>
        </div>
      </div>
    `;
    
    window.print();
  };

  const calculateAll = () => {
    console.log("Calculate button clicked!");
    
    if (optimizeAcrossProducts) {
      // Group products by stone type
      const productsByStone = {};
      products.forEach((product, index) => {
        if (!product.stone || !product.width || !product.depth) return;
        
        if (!productsByStone[product.stone]) {
          productsByStone[product.stone] = [];
        }
        
        const quantity = parseInt(product.quantity) || 1;
        for (let i = 0; i < quantity; i++) {
          productsByStone[product.stone].push({
            ...product,
            originalIndex: index,
            pieceIndex: i,
            quantity: 1,
            individualPiece: true
          });
        }
      });
      
      const results = [];
      
      // Process each stone type group
      Object.keys(productsByStone).forEach(stoneType => {
        const stoneProducts = productsByStone[stoneType];
        const stone = stoneOptions.find(s => s["Stone Type"] === stoneType);
        if (!stone) return;
        
        const slabCost = parseFloat(stone["Slab Cost"]);
        const fabCost = parseFloat(stone["Fab Cost"]);
        const markup = parseFloat(stone["Mark Up"]);
        const slabWidth = parseFloat(stone["Slab Width"]);
        const slabHeight = parseFloat(stone["Slab Height"]);
        
        // Sort products by area (largest first) for better packing
        stoneProducts.sort((a, b) => {
          const areaA = parseFloat(a.width) * parseFloat(a.depth);
          const areaB = parseFloat(b.width) * parseFloat(b.depth);
          return areaB - areaA;
        });
        
        // Pack products into slabs
        const slabs = [];
        const kerf = includeKerf ? kerfWidth : 0;
        
        stoneProducts.forEach(product => {
          const w = parseFloat(product.width);
          const d = parseFloat(product.depth);
          let placed = false;
          
          // Try to fit in existing slabs
          for (let slab of slabs) {
            // Check if product fits in any remaining space
            const fits = canFitInSlab(slab, w, d, slabWidth, slabHeight, kerf);
            if (fits) {
              slab.products.push(product);
              slab.usedArea += w * d;
              placed = true;
              break;
            }
          }
          
          // If doesn't fit in any existing slab, create new one
          if (!placed) {
            slabs.push({
              products: [product],
              usedArea: w * d
            });
          }
        });
        
        // Calculate costs for this stone type
        const totalSlabsNeeded = slabs.length;
        const totalUsedArea = stoneProducts.reduce((sum, p) => 
          sum + parseFloat(p.width) * parseFloat(p.depth), 0
        );
        const totalSlabArea = totalSlabsNeeded * slabWidth * slabHeight;
        const efficiency = totalSlabArea > 0 ? (totalUsedArea / totalSlabArea) * 100 : 0;
        
        const materialCost = (slabCost * totalSlabsNeeded) * (1 + breakageBuffer/100);
        const totalUsableAreaSqft = totalUsedArea / 144;
        const fabricationCost = totalUsableAreaSqft * fabCost;
        const rawCost = materialCost + fabricationCost;
        const finalPrice = rawCost * markup;
        
        // Assign results back to original products
        products.forEach((product, index) => {
          if (product.stone === stoneType) {
            const productPieces = stoneProducts.filter(p => p.originalIndex === index);
            const productArea = productPieces.reduce((sum, p) => 
              sum + parseFloat(p.width) * parseFloat(p.depth), 0
            );
            const productUsableAreaSqft = productArea / 144;
            
            // Calculate proportional costs
            const productMaterialCost = (productArea / totalUsedArea) * materialCost;
            const productFabCost = productUsableAreaSqft * fabCost;
            const productRawCost = productMaterialCost + productFabCost;
            const productFinalPrice = productRawCost * markup;
            
            // Find which slabs contain this product's pieces
            const productSlabs = slabs.filter(slab => 
              slab.products.some(p => p.originalIndex === index)
            );
            
            results[index] = {
              ...product,
              result: {
                usableAreaSqft: productUsableAreaSqft,
                totalSlabsNeeded: productSlabs.length,
                efficiency: efficiency,
                materialCost: productMaterialCost,
                fabricationCost: productFabCost,
                rawCost: productRawCost,
                finalPrice: productFinalPrice,
                topsPerSlab: Math.ceil(productPieces.length / productSlabs.length),
                sharedSlabs: productSlabs.length < productPieces.length,
                optimizedGroup: stoneType
              }
            };
          }
        });
