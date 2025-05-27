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
        showVisualLayouts
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
    generateQuotePDF();
  };

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
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
      
      window.emailjs.init("GiLTtkDDw2VZi0isD");
      
      const totalPrice = allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2);
      const totalSlabs = allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0);
      const avgEfficiency = allResults.length > 0 ? 
        (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0';
      
      // Create beautiful HTML email content matching PDF design
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AIC Surfaces Quote</title>
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
              color: #1a1a1a;
              line-height: 1.6;
              background-color: #f5f5f5;
            }
            
            .email-container {
              max-width: 850px;
              margin: 0 auto;
              background-color: #ffffff;
            }
            
            .email-content {
              padding: 40px;
            }
            
            /* Header Section */
            .header {
              display: table;
              width: 100%;
              margin-bottom: 40px;
              padding-bottom: 30px;
              border-bottom: 3px solid #e5e7eb;
            }
            
            .logo-section {
              display: table-cell;
              vertical-align: middle;
              width: 50%;
            }
            
            .logo {
              width: 80px;
              height: 80px;
              object-fit: cover;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              display: inline-block;
              vertical-align: middle;
              margin-right: 20px;
            }
            
            .company-info {
              display: inline-block;
              vertical-align: middle;
            }
            
            .company-info h1 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 32px;
              color: #0f766e;
              margin-bottom: 4px;
            }
            
            .company-info p {
              color: #6b7280;
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            
            .quote-info {
              display: table-cell;
              text-align: right;
              vertical-align: middle;
              width: 50%;
            }
            
            .quote-info h2 {
              font-size: 24px;
              color: #0f766e;
              font-weight: 600;
              margin-bottom: 4px;
            }
            
            .quote-info p {
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
              text-align: center;
            }
            
            .trust-item {
              display: inline-block;
              margin: 0 15px;
              font-size: 14px;
              color: #0f766e;
              font-weight: 500;
            }
            
            .trust-item .icon {
              color: #10b981;
              font-weight: bold;
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
            }
            
            .customer-grid {
              width: 100%;
            }
            
            .customer-grid td {
              padding: 8px 20px 8px 0;
              vertical-align: top;
            }
            
            .customer-field label {
              font-size: 12px;
              font-weight: 500;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              display: block;
              margin-bottom: 4px;
            }
            
            .customer-field .value {
              font-size: 16px;
              color: #1f2937;
              font-weight: 500;
            }
            
            /* Summary Cards */
            .summary-cards {
              margin-bottom: 30px;
              width: 100%;
            }
            
            .summary-cards td {
              padding: 10px;
              width: 33.333%;
            }
            
            .summary-card {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 12px;
              padding: 24px;
              text-align: center;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .summary-card.primary {
              background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
              color: white;
              border: none;
            }
            
            .summary-card .value {
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 4px;
              line-height: 1;
            }
            
            .summary-card .label {
              font-size: 13px;
              font-weight: 500;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            
            .summary-card.primary .label {
              color: #a7f3d0;
            }
            
            /* Products Section */
            .products-section {
              margin-bottom: 30px;
            }
            
            .section-header {
              margin-bottom: 20px;
            }
            
            .section-header h3 {
              font-size: 20px;
              font-weight: 600;
              color: #1f2937;
              display: inline;
              margin-left: 8px;
            }
            
            .product-card {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 16px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            
            .product-header {
              margin-bottom: 16px;
            }
            
            .product-header td {
              vertical-align: middle;
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
              text-align: right;
            }
            
            .product-details {
              width: 100%;
              font-size: 14px;
            }
            
            .product-details td {
              padding: 8px 16px 8px 0;
              vertical-align: top;
            }
            
            .detail-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              display: block;
              margin-bottom: 2px;
            }
            
            .detail-value {
              font-size: 14px;
              font-weight: 600;
              color: #1f2937;
            }
            
            .efficiency-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
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
            
            .product-note {
              margin-top: 12px;
              padding: 12px;
              background: #fef3c7;
              border-radius: 8px;
              font-size: 13px;
              color: #92400e;
            }
            
            /* CTA Button */
            .cta-section {
              text-align: center;
              margin: 40px 0;
            }
            
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
              color: white;
              padding: 16px 40px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            /* Footer Section */
            .footer {
              margin-top: 60px;
              padding-top: 30px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
            }
            
            .footer p {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 8px;
            }
            
            .contact-info {
              margin: 20px 0;
            }
            
            .contact-item {
              display: inline-block;
              margin: 0 15px;
              color: #4b5563;
              font-size: 14px;
            }
            
            .tagline {
              font-style: italic;
              color: #9ca3af;
              font-size: 13px;
              margin-top: 20px;
            }
            
            /* Mobile Responsive */
            @media only screen and (max-width: 600px) {
              .email-content { padding: 20px; }
              .header { display: block; }
              .logo-section, .quote-info { display: block; width: 100%; text-align: center; margin-bottom: 20px; }
              .company-info h1 { font-size: 24px; }
              .trust-item { display: block; margin: 5px 0; }
              .summary-cards td { display: block; width: 100%; padding: 5px; }
              .product-details td { display: block; width: 100%; padding: 4px 0; }
              .contact-item { display: block; margin: 5px 0; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-content">
              <!-- Header -->
              <div class="header">
                <div class="logo-section">
                  <img src="${window.location.origin}/AIC.jpg" alt="AIC Surfaces" class="logo" />
                  <div class="company-info">
                    <h1>AIC SURFACES</h1>
                    <p>Premium Stone Fabrication</p>
                  </div>
                </div>
                <div class="quote-info">
                  <h2>QUOTE #${Date.now().toString().slice(-6)}</h2>
                  <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              
              <!-- Trust Markers -->
              <div class="trust-markers">
                <span class="trust-item">
                  <span class="icon">✓</span> Licensed & Insured
                </span>
                <span class="trust-item">
                  <span class="icon">✓</span> 20+ Years Experience
                </span>
                <span class="trust-item">
                  <span class="icon">✓</span> AI-Optimized Layouts
                </span>
                <span class="trust-item">
                  <span class="icon">✓</span> Best Price Guarantee
                </span>
              </div>
              
              <!-- Customer Information -->
              <div class="customer-section">
                <h3>👤 Customer Information</h3>
                <table class="customer-grid">
                  <tr>
                    <td>
                      <div class="customer-field">
                        <label>Full Name</label>
                        <div class="value">${userInfo.name || 'Not Provided'}</div>
                      </div>
                    </td>
                    <td>
                      <div class="customer-field">
                        <label>Email Address</label>
                        <div class="value">${userInfo.email || 'Not Provided'}</div>
                      </div>
                    </td>
                    <td>
                      <div class="customer-field">
                        <label>Phone Number</label>
                        <div class="value">${userInfo.phone || 'Not Provided'}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Summary Cards -->
              <table class="summary-cards">
                <tr>
                  <td>
                    <div class="summary-card primary">
                      <div class="value">${totalPrice}</div>
                      <div class="label">Total Investment</div>
                    </div>
                  </td>
                  <td>
                    <div class="summary-card">
                      <div class="value">${totalSlabs}</div>
                      <div class="label">Slabs Required</div>
                    </div>
                  </td>
                  <td>
                    <div class="summary-card">
                      <div class="value">${avgEfficiency}%</div>
                      <div class="label">Avg. Efficiency</div>
                    </div>
                  </td>
                </tr>
              </table>
              
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
                      <table class="product-header" width="100%">
                        <tr>
                          <td>
                            <div class="product-name">${p.customName || `Product ${i + 1}`}</div>
                          </td>
                          <td>
                            <div class="product-price">${p.result?.finalPrice?.toFixed(2) || '0.00'}</div>
                          </td>
                        </tr>
                      </table>
                      <table class="product-details">
                        <tr>
                          <td>
                            <div class="detail-label">Stone Type</div>
                            <div class="detail-value">${p.stone}</div>
                          </td>
                          <td>
                            <div class="detail-label">Dimensions</div>
                            <div class="detail-value">${p.width}" × ${p.depth}"</div>
                          </td>
                          <td>
                            <div class="detail-label">Quantity</div>
                            <div class="detail-value">${p.quantity} pieces</div>
                          </td>
                          <td>
                            <div class="detail-label">Edge Detail</div>
                            <div class="detail-value">${p.edgeDetail}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="detail-label">Area</div>
                            <div class="detail-value">${p.result?.usableAreaSqft?.toFixed(1) || '0'} sq ft</div>
                          </td>
                          <td>
                            <div class="detail-label">Slabs</div>
                            <div class="detail-value">${p.result?.totalSlabsNeeded || '0'}</div>
                          </td>
                          <td>
                            <div class="detail-label">Per Slab</div>
                            <div class="detail-value">${p.result?.topsPerSlab || '0'} pieces</div>
                          </td>
                          <td>
                            <div class="detail-label">Efficiency</div>
                            <div class="detail-value">
                              <span class="efficiency-badge ${effClass}">
                                ${p.result?.efficiency?.toFixed(0) || '0'}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      </table>
                      ${p.note ? `
                        <div class="product-note">
                          <strong>Note:</strong> ${p.note}
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
              
              <!-- CTA Button -->
              <div class="cta-section">
                <a href="mailto:quotes@aicsurfaces.com?subject=Quote%20${Date.now().toString().slice(-6)}%20Acceptance" class="cta-button">
                  Accept Quote & Schedule Consultation
                </a>
              </div>
              
              <!-- Footer -->
              <div class="footer">
                <p><strong>This quote is valid for 30 days from the date above</strong></p>
                <p>Prices subject to material availability and final measurements</p>
                
                <div class="contact-info">
                  <span class="contact-item">📞 (555) 123-4567</span>
                  <span class="contact-item">✉️ quotes@aicsurfaces.com</span>
                  <span class="contact-item">🌐 www.aicsurfaces.com</span>
                </div>
                
                <p class="tagline">Generated by AIC Surfaces Stone Estimator • Powered by AI Optimization</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #4b5563; margin-bottom: 30px;">Dear ${userInfo.name},</p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              Thank you for choosing AIC Surfaces! We're excited to present your personalized stone fabrication quote, 
              optimized using our advanced AI layout system to minimize waste and maximize value.
            </p>
            
            <div style="background: #f9fafb; border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center;">
              <h2 style="color: #0f766e; margin: 0 0 20px 0; font-size: 24px;">Your Quote Summary</h2>
              
              <div style="display: inline-block; margin: 0 15px;">
                <div style="color: #14b8a6; font-size: 36px; font-weight: bold;">${totalPrice}</div>
                <div style="color: #6b7280; font-size: 14px;">Total Investment</div>
              </div>
              
              <div style="display: inline-block; margin: 0 15px;">
                <div style="color: #14b8a6; font-size: 36px; font-weight: bold;">${totalSlabs}</div>
                <div style="color: #6b7280; font-size: 14px;">Slabs Required</div>
              </div>
              
              <div style="display: inline-block; margin: 0 15px;">
                <div style="color: #14b8a6; font-size: 36px; font-weight: bold;">${avgEfficiency}%</div>
                <div style="color: #6b7280; font-size: 14px;">Material Efficiency</div>
              </div>
            </div>
            
            <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #1f2937; margin: 0 0 16px 0; font-size: 18px;">Products in Your Quote:</h3>
              ${allResults.map(p => `
                <div style="border-bottom: 1px solid #e5e7eb; padding: 12px 0;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <strong style="color: #1f2937;">${p.customName || 'Product'}</strong>
                      <div style="color: #6b7280; font-size: 14px;">${p.stone} • ${p.width}"×${p.depth}" • Qty: ${p.quantity}</div>
                    </div>
                    <div style="color: #059669; font-size: 20px; font-weight: bold;">${p.result?.finalPrice?.toFixed(2) || '0.00'}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="display: inline-block; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Accept Quote & Schedule Consultation
              </a>
            </div>
            
            <div style="border-top: 2px solid #e5e7eb; padding-top: 30px; margin-top: 40px;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                <strong>Next Steps:</strong><br />
                1. Review your quote details<br />
                2. Click the button above to accept<br />
                3. We'll contact you within 24 hours to schedule your template<br />
                4. Your dream countertops will be ready in 2-3 weeks!
              </p>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 20px; text-align: center;">
                This quote is valid for 30 days • Questions? Call (555) 123-4567<br />
                Generated on ${new Date().toLocaleDateString()} • Powered by AI Optimization
              </p>
            </div>
          </div>
        </div>
      \`;
      
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
        quote_date: new Date().toLocaleDateString(),
        html_content: emailHTML // Add the HTML content
      };

      const response = await window.emailjs.send(
        'service_4xwxsbp',
        'template_pw68h0p',
        templateParams
      );

      if (response.status === 200) {
        setEmailStatus('✅ Email sent successfully!');
        alert(`✅ Quote sent successfully to ${userInfo.email}!\n\nThe customer will receive a beautifully formatted quote with all details.`);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus('❌ Failed to send email');
      alert(`❌ Failed to send email: ${error.message || 'Unknown error'}\n\nPlease check your EmailJS configuration and try again.`);
    } finally {
      setSendingEmail(false);
      setTimeout(() => setEmailStatus(''), 5000);
    }
  };

  if (showSavedQuotes) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/AIC.jpg" alt="AIC Logo" className="w-12 h-12 rounded-xl shadow-sm" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                    AIC Surfaces
                  </h1>
                  <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Saved Quotes</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => setShowSavedQuotes(false)}
            variant="ghost"
            className="mb-6"
          >
            ← Back to Estimator
          </Button>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Saved Quotes</h2>

          {savedQuotes.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No saved quotes found.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {savedQuotes.map((quote) => (
                <Card key={quote.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{quote.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Saved on: {new Date(quote.date).toLocaleDateString()} at {new Date(quote.date).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Customer: {quote.userInfo.name || 'N/A'} • Products: {quote.products.length}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => loadQuote(quote)} size="sm">
                        Load Quote
                      </Button>
                      <Button
                        onClick={() => deleteQuote(quote.id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/AIC.jpg" alt="AIC Logo" className="w-12 h-12 rounded-xl shadow-sm" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                    AIC Surfaces
                  </h1>
                  <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Premium Stone Fabrication</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Results Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            onClick={() => setShowResults(false)}
            variant="ghost"
            className="mb-6"
          >
            ← Back to Products
          </Button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-teal-600" />
            Optimized Results
          </h2>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-teal-50 to-white border-teal-200">
              <DollarSign className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-teal-700">
                ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
              </div>
              <div className="text-sm text-teal-600 font-medium mt-1">Total Investment</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-700">
                {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
              </div>
              <div className="text-sm text-blue-600 font-medium mt-1">Total Slabs Needed</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
              <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-emerald-700">
                {allResults.length > 0 ? 
                  (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : 
                  '0'
                }%
              </div>
              <div className="text-sm text-emerald-600 font-medium mt-1">Average Efficiency</div>
            </Card>
          </div>

          {/* Slab Layout Visualization */}
          {showVisualLayouts && (
            <div className="space-y-6 mb-8">
              {allResults.map((product, productIndex) => {
                if (!product.result) return null;
                
                const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
                const slabWidth = parseFloat(stone?.["Slab Width"]) || 126;
                const slabHeight = parseFloat(stone?.["Slab Height"]) || 63;
                
                const pieces = Array(parseInt(product.quantity) || 1).fill().map((_, i) => ({
                  id: i + 1,
                  width: parseFloat(product.width) || 0,
                  depth: parseFloat(product.depth) || 0,
                  name: `${product.stone} #${i + 1}`
                }));
                
                return (
                  <Card key={productIndex} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-teal-600" />
                      Layout Visualization: {product.customName || `Product ${productIndex + 1}`}
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-8">
                      <SlabLayoutVisualization 
                        pieces={pieces}
                        slabWidth={slabWidth}
                        slabHeight={slabHeight}
                        maxPiecesPerSlab={product.result.topsPerSlab}
                        includeKerf={includeKerf}
                        kerfWidth={kerfWidth}
                        showMaxLayout={false}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Layout Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Piece Size:</span>
                            <span className="font-medium">{product.width}" × {product.depth}"</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Slab Size:</span>
                            <span className="font-medium">{slabWidth}" × {slabHeight}"</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kerf Width:</span>
                            <span className="font-medium">{includeKerf ? `${kerfWidth}"` : 'Not included'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-4 border border-teal-200">
                        <h4 className="text-sm font-semibold text-teal-700 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Optimization Results
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-teal-600">Max Pieces/Slab:</span>
                            <span className="font-bold text-teal-700">{product.result.topsPerSlab}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-teal-600">Total Quantity:</span>
                            <span className="font-bold text-teal-700">{product.quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-teal-600">Efficiency:</span>
                            <span className={`font-bold ${
                              product.result.efficiency > 80 ? 'text-green-600' : 
                              product.result.efficiency > 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>{product.result.efficiency?.toFixed(1) || '0'}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-teal-600">Slabs Needed:</span>
                            <span className="font-bold text-teal-700">{product.result.totalSlabsNeeded}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Results Cards */}
          <div className="space-y-4 mb-8">
            {allResults.map((p, i) => {
              const stone = stoneOptions.find(s => s["Stone Type"] === p.stone);
              const markup = parseFloat(stone?.["Mark Up"]) || 1;
              
              return (
                <Card key={i} className="p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {p.customName || `Product ${i + 1}`}
                      </h3>
                      <p className="text-gray-600 text-sm">{p.stone}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 flex-1">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Size</p>
                        <p className="font-semibold text-gray-900">{p.width}×{p.depth}"</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Qty</p>
                        <p className="font-semibold text-gray-900">{p.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Edge</p>
                        <p className="font-semibold text-gray-900 text-sm">{p.edgeDetail}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</p>
                        <p className="font-semibold text-gray-900">{p.result?.usableAreaSqft?.toFixed(1)} ft²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Per Slab</p>
                        <p className="font-semibold text-purple-600">{p.result?.topsPerSlab || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Slabs</p>
                        <p className="font-semibold text-blue-600">{p.result?.totalSlabsNeeded || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Efficiency</p>
                        <p className={`font-bold ${
                          (p.result?.efficiency || 0) > 80 ? 'text-green-600' : 
                          (p.result?.efficiency || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {p.result?.efficiency?.toFixed(0) || '0'}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Material</p>
                        <p className="font-semibold text-blue-600">${((p.result?.materialCost || 0) * markup)?.toFixed(0) || '0'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fab</p>
                        <p className="font-semibold text-orange-600">${(p.result?.fabricationCost || 0)?.toFixed(0) || '0'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
                        <p className="font-bold text-green-600 text-lg">${p.result?.finalPrice?.toFixed(0) || '0'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {p.note && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">Note:</span> {p.note}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Total Summary */}
          <Card className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-teal-100 text-sm uppercase tracking-wider">Grand Total</p>
                <p className="text-4xl font-bold">
                  ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-teal-100 text-sm">
                  Material: ${allResults.reduce((sum, p) => {
                    const stone = stoneOptions.find(s => s["Stone Type"] === p.stone);
                    const markup = parseFloat(stone?.["Mark Up"]) || 1;
                    return sum + ((p.result?.materialCost || 0) * markup);
                  }, 0).toFixed(0)} • 
                  Fabrication: ${allResults.reduce((sum, p) => sum + (p.result?.fabricationCost || 0), 0).toFixed(0)}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              onClick={generateQuotePDF}
              size="lg"
              variant="outline"
            >
              <FileText className="w-5 h-5" />
              Generate PDF
            </Button>
            <Button
              onClick={sendEmailToClient}
              disabled={sendingEmail || !userInfo.email}
              size="lg"
              variant="outline"
            >
              <Mail className="w-5 h-5" />
              {sendingEmail ? 'Sending...' : 'Email Quote'}
            </Button>
            <Button
              onClick={() => setShowResults(false)}
              size="lg"
            >
              Back to Edit
            </Button>
          </div>

          {/* Trust Markers */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Licensed & Insured
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                20+ Years Experience
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                AI-Optimized Layouts
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Accurate as of {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/aic.jpg" alt="AIC Logo" className="w-12 h-12 rounded-xl shadow-sm" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                  AIC Surfaces
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Premium Stone Fabrication</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={saveQuote}
                variant="outline"
                size="sm"
              >
                <Save className="w-4 h-4" />
                Save Quote
              </Button>
              <Button
                onClick={() => setShowSavedQuotes(true)}
                variant="outline"
                size="sm"
              >
                <FolderOpen className="w-4 h-4" />
                Load Quote ({savedQuotes.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Customer Info</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Products</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center">
              <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-400">Calculate</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center">
              <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm font-medium text-gray-400">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
              
              <div className="space-y-6">
                <Toggle 
                  label="Include Kerf" 
                  checked={includeKerf} 
                  onChange={() => setIncludeKerf(!includeKerf)} 
                />
                
                <Toggle 
                  label="Visual Preview" 
                  checked={showVisualLayouts} 
                  onChange={() => setShowVisualLayouts(!showVisualLayouts)} 
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kerf Width
                  </label>
                  <select
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(parseFloat(e.target.value))}
                    disabled={!includeKerf}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
                  >
                    <option value={0.125}>1/8" (0.125) - Standard</option>
                    <option value={0.1875}>3/16" (0.1875) - Thick</option>
                    <option value={0.25}>1/4" (0.25) - Heavy Duty</option>
                    <option value={0.09375}>3/32" (0.094) - Thin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breakage Buffer
                  </label>
                  <select
                    value={breakageBuffer}
                    onChange={(e) => setBreakageBuffer(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value={5}>5% - Conservative</option>
                    <option value={10}>10% - Standard</option>
                    <option value={15}>15% - High Risk</option>
                    <option value={20}>20% - Very High Risk</option>
                  </select>
                </div>
              </div>

              {/* Trust Markers in Sidebar */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AI-Powered Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant Accurate Quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>20+ Years Industry Experience</span>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-teal-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>

            {/* Products */}
            {products.map((product, index) => (
              <Card key={product.id} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.customName || `Product ${index + 1}`}
                  </h3>
                  {products.length > 1 && (
                    <Button
                      onClick={() => removeProduct(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stone Type
                    </label>
                    <select
                      value={product.stone}
                      onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      {stoneOptions.map((stone, i) => (
                        <option key={i} value={stone["Stone Type"]}>{stone["Stone Type"]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (inches)
                    </label>
                    <input
                      type="number"
                      value={product.width}
                      onChange={(e) => updateProduct(index, 'width', e.target.value)}
                      placeholder="24"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Depth (inches)
                    </label>
                    <input
                      type="number"
                      value={product.depth}
                      onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                      placeholder="36"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                      min="1"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Edge Detail
                    </label>
                    <select
                      value={product.edgeDetail}
                      onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="Eased">Eased</option>
                      <option value="1.5 mitered">1.5" Mitered</option>
                      <option value="Bullnose">Bullnose</option>
                      <option value="Ogee">Ogee</option>
                      <option value="Beveled">Beveled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={product.priority}
                      onChange={(e) => updateProduct(index, 'priority', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Name
                    </label>
                    <input
                      type="text"
                      value={product.customName}
                      onChange={(e) => updateProduct(index, 'customName', e.target.value)}
                      placeholder="Kitchen Island"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Drawing
                    </label>
                    <label className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      {loadingAI ? 'Analyzing...' : 'Choose File'}
                      <input
                        type="file"
                        accept="image/*,.pdf,.dwg,.dxf"
                        onChange={(e) => handleDrawingUpload(e, index)}
                        disabled={loadingAI}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={product.note}
                    onChange={(e) => updateProduct(index, 'note', e.target.value)}
                    placeholder="Add any special instructions..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>
                
                {loadingAI && index === products.findIndex(p => p.id === product.id) && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <div>
                        <div className="text-blue-800 font-medium">🤖 Claude AI is analyzing your drawing...</div>
                        <div className="text-blue-600 text-sm">Extracting dimensions and identifying all pieces</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            {/* Add Product Button */}
            <button
              onClick={addProduct}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Add Another Product
            </button>
          </main>
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? 's' : ''} added
            </p>
            <div className="flex gap-3">
              <Button
                onClick={addProduct}
                variant="outline"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
              <Button
                onClick={calculateAll}
                size="lg"
                className="shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculate Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Email status message */}
      {emailStatus && (
        <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-center font-medium shadow-lg animate-pulse ${
          emailStatus.includes('✅') ? 'bg-green-100 text-green-800 border border-green-300' : 
          emailStatus.includes('❌') ? 'bg-red-100 text-red-800 border border-red-300' : 
          'bg-blue-100 text-blue-800 border border-blue-300'
        }`}>
          {emailStatus}
        </div>
      )}
    </div>
  );
}
