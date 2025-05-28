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

// Enhanced Multi-Product Slab Layout Visualization
const MultiProductSlabVisualization = ({ optimization, slabIndex, slabWidth, slabHeight, includeKerf, kerfWidth }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!optimization || !optimization.slabs || !optimization.slabs[slabIndex]) return null;
  
  const slab = optimization.slabs[slabIndex];
  const containerWidth = 500;
  const containerHeight = 300;
  const scaleX = containerWidth / slabWidth;
  const scaleY = containerHeight / slabHeight;
  const scale = Math.min(scaleX, scaleY) * 0.85;

  const scaledSlabWidth = slabWidth * scale;
  const scaledSlabHeight = slabHeight * scale;

  // Color palette for different products
  const colors = [
    { bg: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)', border: '#059669' },
    { bg: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)', border: '#2563eb' },
    { bg: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)', border: '#dc2626' },
    { bg: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)', border: '#ca8a04' },
    { bg: 'linear-gradient(135deg, #c084fc 0%, #a78bfa 100%)', border: '#7c3aed' },
    { bg: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)', border: '#ea580c' }
  ];

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-center gap-2 text-sm text-gray-600">
        <Package className="w-4 h-4" />
        <span>Slab {slabIndex + 1} - Optimized Layout</span>
      </div>
      
      <div 
        className="relative mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner overflow-hidden"
        style={{ 
          width: `${scaledSlabWidth}px`, 
          height: `${scaledSlabHeight}px`
        }}
      >
        {/* Slab Border */}
        <div className="absolute inset-0 border-2 border-slate-400 rounded-lg pointer-events-none" />
        
        {/* Pieces */}
        {slab.pieces.map((piece, index) => {
          const colorIndex = piece.productIndex % colors.length;
          const color = colors[colorIndex];
          
          return (
            <div
              key={`${piece.pieceId}-${index}`}
              className={`absolute flex flex-col items-center justify-center text-xs font-medium rounded transition-all duration-300 ${
                isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{
                left: `${piece.x * scale}px`,
                top: `${piece.y * scale}px`,
                width: `${piece.placedWidth * scale - 2}px`,
                height: `${piece.placedHeight * scale - 2}px`,
                transitionDelay: `${index * 50}ms`,
                background: color.bg,
                border: `2px solid ${color.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div className="text-white font-bold text-[10px]">{piece.productName}</div>
              <div className="text-white text-[9px] opacity-90">
                {piece.width}×{piece.depth}"
              </div>
              {piece.rotated && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center text-[8px] font-bold" 
                     style={{ color: color.border }}>
                  R
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 text-center text-sm text-gray-600">
        {slab.pieces.length} pieces from {new Set(slab.pieces.map(p => p.productIndex)).size} different products
      </div>
    </div>
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
      note: '',
      optimizeWithOthers: false
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
            grid-template-columns: repeat(4, minmax(140px, 1fr));
            gap: 24px;
            row-gap: 20px;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
          }
          
          .detail-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            white-space: nowrap;
          }
          
          .detail-value {
            font-size: 14px;
            font-weight: 600;
            color: #1f2937;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
            .company-info {
              display: inline-block;
              vertical-align: middle;
            }
            
            .company-info h1 {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              color: #0f766e;
              margin-bottom: 4px;
              margin-top: 0;
            }
            
            .company-info p {
              color: #6b7280;
              font-size: 14px;
              font-weight: 500;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              margin: 0;
            }
            
            .quote-number {
              display: table-cell;
              text-align: right;
              vertical-align: middle;
              width: 40%;
            }
            
            .quote-number h2 {
              font-size: 24px;
              color: #0f766e;
              font-weight: 600;
              margin-bottom: 4px;
              margin-top: 0;
            }
            
            .quote-number p {
              color: #6b7280;
              font-size: 14px;
              margin: 0;
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
              font-size: 18px;
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
              margin-top: 0;
            }
            
            .customer-grid {
              width: 100%;
              border-collapse: collapse;
            }
            
            .customer-grid td {
              padding: 0 20px 0 0;
              vertical-align: top;
              width: 33.33%;
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
              border-collapse: separate;
              border-spacing: 20px 0;
            }
            
            .summary-cards td {
              width: 33.333%;
              padding: 0;
            }
            
            .summary-card {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 12px;
              padding: 24px;
              text-align: center;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              height: 100%;
            }
            
            .summary-card.primary {
              background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
              color: white;
              border: none;
            }
            
            .summary-card .value {
              font-size: 36px;
              font-weight: 700;
              margin-bottom: 4px;
              line-height: 1;
            }
            
            .summary-card .label {
              font-size: 14px;
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
              margin-top: 0;
              margin-bottom: 0;
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
              width: 100%;
              margin-bottom: 16px;
              border-collapse: collapse;
            }
            
            .product-header td {
              vertical-align: middle;
              padding: 0;
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
              border-collapse: collapse;
            }
            
            .product-details td {
              padding: 12px 20px 12px 0;
              vertical-align: top;
              width: 25%;
              white-space: nowrap;
            }
            
            .detail-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              display: block;
              margin-bottom: 4px;
            }
            
            .detail-value {
              font-size: 14px;
              font-weight: 600;
              color: #1f2937;
              display: block;
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
            
            .product-note {
              margin-top: 12px;
              padding: 12px;
              background: #fef3c7;
              border-radius: 8px;
              font-size: 13px;
              color: #92400e;
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
              margin-top: 20px;
              text-align: center;
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
            
            /* Mobile responsive */
            @media only screen and (max-width: 600px) {
              .page-container { padding: 20px; }
              .header { display: block; }
              .logo-section, .quote-number { 
                display: block; 
                width: 100%; 
                text-align: center; 
                margin-bottom: 20px; 
              }
              .company-info h1 { font-size: 24px; }
              .trust-item { display: block; margin: 5px 0; }
              .summary-cards { border-spacing: 0; }
              .summary-cards td { 
                display: block; 
                width: 100%; 
                padding: 10px 0; 
              }
              .customer-grid td { 
                display: block; 
                width: 100%; 
                padding: 8px 0; 
              }
              .product-details td { 
                display: inline-block; 
                width: 50%; 
                padding: 4px 8px; 
              }
              .contact-item { display: block; margin: 5px 0; }
            }
            
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
            <span class="trust-item">
              <span class="icon">✓</span>
              <span>Licensed & Insured</span>
            </span>
            <span class="trust-item">
              <span class="icon">✓</span>
              <span>20+ Years Experience</span>
            </span>
            <span class="trust-item">
              <span class="icon">✓</span>
              <span>AI-Optimized Layouts</span>
            </span>
            <span class="trust-item">
              <span class="icon">✓</span>
              <span>Best Price Guarantee</span>
            </span>
          </div>
          
          <!-- Customer Information -->
          <div class="customer-section">
            <h3>
              <span>👤</span>
              Customer Information
            </h3>
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
                  <div class="value">$${totalPrice}</div>
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
                  <table class="product-header">
                    <tr>
                      <td>
                        <div class="product-name">${p.customName || `Product ${i + 1}`}</div>
                      </td>
                      <td>
                        <div class="product-price">$${p.result?.finalPrice?.toFixed(2) || '0.00'}</div>
                      </td>
                    </tr>
                  </table>
                  <table class="product-details">
                    <tr>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Stone Type</span>
                        <span class="detail-value">${p.stone}</span>
                      </td>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Dimensions</span>
                        <span class="detail-value">${p.width}" × ${p.depth}"</span>
                      </td>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Quantity</span>
                        <span class="detail-value">${p.quantity} pieces</span>
                      </td>
                      <td>
                        <span class="detail-label">Edge Detail</span>
                        <span class="detail-value">${p.edgeDetail}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Area</span>
                        <span class="detail-value">${p.result?.usableAreaSqft?.toFixed(1) || '0'} sq ft</span>
                      </td>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Slabs</span>
                        <span class="detail-value">${p.result?.totalSlabsNeeded || '0'}</span>
                      </td>
                      <td style="padding-right: 25px;">
                        <span class="detail-label">Per Slab</span>
                        <span class="detail-value">${p.result?.topsPerSlab || '0'} pieces</span>
                      </td>
                      <td>
                        <span class="detail-label">Efficiency</span>
                        <span class="detail-value">
                          <span class="efficiency-badge ${effClass}">
                            ${p.result?.efficiency?.toFixed(0) || '0'}%
                          </span>
                        </span>
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
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-content">
              <p><strong>This quote is valid for 30 days from the date above</strong></p>
              <p>Prices subject to material availability and final measurements</p>
              
              <div class="contact-info">
                <span class="contact-item">
                  <span>📞</span>
                  <span>(555) 123-4567</span>
                </span>
                <span class="contact-item">
                  <span>✉️</span>
                  <span>quotes@aicsurfaces.com</span>
                </span>
                <span class="contact-item">
                  <span>🌐</span>
                  <span>www.aicsurfaces.com</span>
                </span>
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
          <h2 style="color: #0f766e; margin-bottom: 10px;">Total: ${totalPrice}</h2>
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
    
    // First, check if multi-product optimization is enabled
    const shouldOptimizeMultiple = products.some(p => p.optimizeWithOthers);
    
    if (shouldOptimizeMultiple) {
      calculateWithMultiProductOptimization();
    } else {
      calculateIndividually();
    }
  };

  const calculateIndividually = () => {
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

  const calculateWithMultiProductOptimization = () => {
    // Group products by stone type
    const productsByStone = {};
    products.forEach((product, index) => {
      const stoneType = product.stone;
      if (!productsByStone[stoneType]) {
        productsByStone[stoneType] = [];
      }
      productsByStone[stoneType].push({ ...product, originalIndex: index });
    });

    const allResults = [];
    const optimizationGroups = [];

    // Process each stone type group
    Object.keys(productsByStone).forEach(stoneType => {
      const stoneProducts = productsByStone[stoneType];
      const stone = stoneOptions.find(s => s["Stone Type"] === stoneType);
      
      if (!stone) {
        stoneProducts.forEach(product => {
          allResults[product.originalIndex] = { ...product, result: null };
        });
        return;
      }

      const slabCost = parseFloat(stone["Slab Cost"]);
      const fabCost = parseFloat(stone["Fab Cost"]);
      const markup = parseFloat(stone["Mark Up"]);
      const slabWidth = parseFloat(stone["Slab Width"]);
      const slabHeight = parseFloat(stone["Slab Height"]);

      // Collect all pieces from products that should be optimized together
      const optimizableProducts = stoneProducts.filter(p => p.optimizeWithOthers);
      const nonOptimizableProducts = stoneProducts.filter(p => !p.optimizeWithOthers);

      // Process non-optimizable products individually
      nonOptimizableProducts.forEach(product => {
        const w = parseFloat(product.width);
        const d = parseFloat(product.depth);
        const quantity = parseInt(product.quantity);

        if (!w || !d || isNaN(slabCost) || isNaN(fabCost) || isNaN(markup)) {
          allResults[product.originalIndex] = { ...product, result: null };
          return;
        }

        const maxPiecesPerSlab = calculateMaxPiecesPerSlab(w, d, slabWidth, slabHeight);
        const area = w * d;
        const usableAreaSqft = (area / 144) * quantity;
        const totalSlabsNeeded = Math.ceil(quantity / maxPiecesPerSlab);
        const totalSlabArea = totalSlabsNeeded * slabWidth * slabHeight;
        const totalUsedArea = quantity * w * d;
        const efficiency = totalSlabArea > 0 ? (totalUsedArea / totalSlabArea) * 100 : 0;
        
        const materialCost = (slabCost * totalSlabsNeeded) * (1 + breakageBuffer/100);
        const fabricationCost = usableAreaSqft * fabCost;
        const rawCost = materialCost + fabricationCost;
        const finalPrice = rawCost * markup;

        allResults[product.originalIndex] = {
          ...product,
          result: {
            usableAreaSqft,
            totalSlabsNeeded,
            efficiency,
            materialCost,
            fabricationCost,
            rawCost,
            finalPrice,
            topsPerSlab: maxPiecesPerSlab,
            optimizationGroup: null
          }
        };
      });

      // Process optimizable products together
      if (optimizableProducts.length > 0) {
        const allPieces = [];
        optimizableProducts.forEach(product => {
          const w = parseFloat(product.width);
          const d = parseFloat(product.depth);
          const quantity = parseInt(product.quantity);
          
          for (let i = 0; i < quantity; i++) {
            allPieces.push({
              width: w,
              depth: d,
              productIndex: product.originalIndex,
              productName: product.customName || `Product ${product.originalIndex + 1}`,
              pieceNumber: i + 1
            });
          }
        });

        // Run the optimization algorithm
        const optimization = optimizeMultiplePieces(allPieces, slabWidth, slabHeight);
        const groupId = Date.now();
        
        optimizationGroups.push({
          id: groupId,
          stoneType,
          products: optimizableProducts.map(p => p.customName || `Product ${p.originalIndex + 1}`),
          totalSlabs: optimization.slabs.length,
          efficiency: optimization.efficiency,
          layout: optimization.slabs
        });

        // Calculate costs for each product based on proportional usage
        optimizableProducts.forEach(product => {
          const w = parseFloat(product.width);
          const d = parseFloat(product.depth);
          const quantity = parseInt(product.quantity);
          const area = w * d;
          const usableAreaSqft = (area / 144) * quantity;
          
          // Calculate product's proportion of total area
          const totalOptimizedArea = allPieces.reduce((sum, p) => sum + p.width * p.depth, 0) / 144;
          const proportion = usableAreaSqft / totalOptimizedArea;
          
          // Allocate costs proportionally
          const totalMaterialCost = (slabCost * optimization.slabs.length) * (1 + breakageBuffer/100);
          const materialCost = totalMaterialCost * proportion;
          const fabricationCost = usableAreaSqft * fabCost;
          const rawCost = materialCost + fabricationCost;
          const finalPrice = rawCost * markup;

          allResults[product.originalIndex] = {
            ...product,
            result: {
              usableAreaSqft,
              totalSlabsNeeded: optimization.slabs.length * proportion, // Fractional slabs
              efficiency: optimization.efficiency,
              materialCost,
              fabricationCost,
              rawCost,
              finalPrice,
              topsPerSlab: 'Optimized',
              optimizationGroup: groupId,
              sharedSlabs: optimization.slabs.length,
              individualSlabsWouldNeed: Math.ceil(quantity / calculateMaxPiecesPerSlab(w, d, slabWidth, slabHeight))
            }
          };
        });
      }
    });

    // Convert results array to proper format
    const finalResults = products.map((product, index) => allResults[index] || { ...product, result: null });
    
    setAllResults(finalResults);
    setProducts(products.map((product, index) => ({
      ...product,
      result: finalResults[index]?.result || null
    })));
    setShowResults(true);
    setOptimizationGroups(optimizationGroups);
  };

  // Multi-piece optimization algorithm
  const optimizeMultiplePieces = (pieces, slabWidth, slabHeight) => {
    const kerf = includeKerf ? kerfWidth : 0;
    const slabs = [];
    const unplacedPieces = [...pieces];
    
    while (unplacedPieces.length > 0) {
      const slab = {
        pieces: [],
        remainingSpace: []
      };
      
      // Initialize with full slab space
      slab.remainingSpace.push({
        x: 0,
        y: 0,
        width: slabWidth,
        height: slabHeight
      });
      
      // Try to place pieces using best-fit algorithm
      let placedInThisSlab = true;
      while (placedInThisSlab && unplacedPieces.length > 0) {
        placedInThisSlab = false;
        
        for (let i = 0; i < unplacedPieces.length; i++) {
          const piece = unplacedPieces[i];
          
          // Try both orientations
          const orientations = [
            { width: piece.width + kerf, height: piece.depth + kerf },
            { width: piece.depth + kerf, height: piece.width + kerf }
          ];
          
          for (const orientation of orientations) {
            // Find best fitting space
            let bestFit = null;
            let bestFitIndex = -1;
            let bestFitScore = Infinity;
            
            for (let j = 0; j < slab.remainingSpace.length; j++) {
              const space = slab.remainingSpace[j];
              
              if (space.width >= orientation.width && space.height >= orientation.height) {
                // Calculate wasted space (lower is better)
                const wastedSpace = (space.width * space.height) - (orientation.width * orientation.height);
                
                if (wastedSpace < bestFitScore) {
                  bestFit = space;
                  bestFitIndex = j;
                  bestFitScore = wastedSpace;
                }
              }
            }
            
            if (bestFit) {
              // Place the piece
              slab.pieces.push({
                ...piece,
                x: bestFit.x,
                y: bestFit.y,
                placedWidth: orientation.width - kerf,
                placedHeight: orientation.height - kerf,
                rotated: orientation.width === piece.depth + kerf
              });
              
              // Update remaining spaces (guillotine cut)
              slab.remainingSpace.splice(bestFitIndex, 1);
              
              // Add new spaces created by the cut
              if (bestFit.width - orientation.width > kerf) {
                slab.remainingSpace.push({
                  x: bestFit.x + orientation.width,
                  y: bestFit.y,
                  width: bestFit.width - orientation.width,
                  height: orientation.height
                });
              }
              
              if (bestFit.height - orientation.height > kerf) {
                slab.remainingSpace.push({
                  x: bestFit.x,
                  y: bestFit.y + orientation.height,
                  width: bestFit.width,
                  height: bestFit.height - orientation.height
                });
              }
              
              unplacedPieces.splice(i, 1);
              placedInThisSlab = true;
              break;
            }
          }
          
          if (placedInThisSlab) break;
        }
      }
      
      if (slab.pieces.length > 0) {
        slabs.push(slab);
      }
    }
    
    // Calculate overall efficiency
    const totalSlabArea = slabs.length * slabWidth * slabHeight;
    const totalUsedArea = pieces.reduce((sum, p) => sum + p.width * p.depth, 0);
    const efficiency = totalSlabArea > 0 ? (totalUsedArea / totalSlabArea) * 100 : 0;
    
    return {
      slabs,
      efficiency,
      totalPieces: pieces.length
    };
  };

  const [optimizationGroups, setOptimizationGroups] = useState([]);

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
          <title>AIC Surfaces - Premium Stone Quote</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 36px; margin: 0 0 10px 0; font-family: 'Playfair Display', serif;">AIC SURFACES</h1>
              <p style="color: #a7f3d0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Premium Stone Fabrication</p>
            </div>
            
            <!-- Quote Number -->
            <div style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
              <div style="text-align: center;">
                <h2 style="color: #0f766e; font-size: 24px; margin: 0 0 5px 0;">QUOTE #${Date.now().toString().slice(-6)}</h2>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            
            <!-- Customer Info -->
            <div style="padding: 30px; background-color: #f9fafb;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 20px 0;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Name:</span><br>
                    <strong style="color: #1f2937; font-size: 16px;">${userInfo.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Email:</span><br>
                    <strong style="color: #1f2937; font-size: 16px;">${userInfo.email}</strong>
                  </td>
                </tr>
                ${userInfo.phone ? `
                <tr>
                  <td style="padding: 5px 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Phone:</span><br>
                    <strong style="color: #1f2937; font-size: 16px;">${userInfo.phone}</strong>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <!-- Summary -->
            <div style="padding: 30px; text-align: center;">
              <div style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
                <h3 style="font-size: 14px; margin: 0 0 10px 0; color: #a7f3d0; text-transform: uppercase;">Total Investment</h3>
                <p style="font-size: 48px; font-weight: 700; margin: 0;">${totalPrice}</p>
              </div>
              
              <div style="display: inline-block; margin: 0 10px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;">Slabs Required</p>
                <p style="color: #0f766e; font-size: 28px; font-weight: 600; margin: 0;">${totalSlabs}</p>
              </div>
              
              <div style="display: inline-block; margin: 0 10px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;">Avg. Efficiency</p>
                <p style="color: #0f766e; font-size: 28px; font-weight: 600; margin: 0;">${avgEfficiency}%</p>
              </div>
            </div>
            
            <!-- Products Summary -->
            <div style="padding: 30px; background-color: #f9fafb;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 20px 0;">Quote Details</h3>
              ${allResults.map((p, i) => `
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="color: #1f2937; font-size: 16px; margin: 0;">${p.customName || `Product ${i + 1}`}</h4>
                    <span style="color: #059669; font-size: 20px; font-weight: 600;">${p.result?.finalPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                  <table style="width: 100%; font-size: 14px;">
                    <tr>
                      <td style="color: #6b7280; padding: 3px 0;">Stone:</td>
                      <td style="color: #1f2937; font-weight: 500;">${p.stone}</td>
                      <td style="color: #6b7280; padding: 3px 0;">Size:</td>
                      <td style="color: #1f2937; font-weight: 500;">${p.width}" × ${p.depth}"</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; padding: 3px 0;">Qty:</td>
                      <td style="color: #1f2937; font-weight: 500;">${p.quantity}</td>
                      <td style="color: #6b7280; padding: 3px 0;">Edge:</td>
                      <td style="color: #1f2937; font-weight: 500;">${p.edgeDetail}</td>
                    </tr>
                  </table>
                </div>
              `).join('')}
            </div>
            
            <!-- CTA Button -->
            <div style="padding: 40px 30px; text-align: center; background-color: #f0fdfa;">
              <p style="color: #0f766e; font-size: 18px; margin: 0 0 20px 0; font-weight: 500;">Ready to move forward with your project?</p>
              <a href="tel:5551234567" style="display: inline-block; background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Call Us: (555) 123-4567
              </a>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1f2937; color: #9ca3af; padding: 30px; text-align: center; font-size: 12px;">
              <p style="margin: 0 0 10px 0;">This quote is valid for 30 days • Prices subject to material availability</p>
              <p style="margin: 0;">© 2024 AIC Surfaces • Premium Stone Fabrication</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const templateParams = {
        to_name: userInfo.name,
        to_email: userInfo.email,
        from_name: "AIC Surfaces",
        from_email: "quotes@aicsurfaces.com",
        subject: `Your Stone Quote #${Date.now().toString().slice(-6)} - AIC Surfaces`,
        message_html: emailHTML,
        total_price: totalPrice,
        total_slabs: totalSlabs,
        quote_number: Date.now().toString().slice(-6)
      };
      
      const response = await window.emailjs.send(
        'service_4qpb1om',
        'template_7p9wv5k',
        templateParams
      );
      
      if (response.status === 200) {
        setEmailStatus('Email sent successfully! ✅');
        alert(`Email sent successfully to ${userInfo.email}!`);
      } else {
        throw new Error('Email send failed');
      }
      
    } catch (error) {
      console.error('Email error:', error);
      setEmailStatus('Failed to send email ❌');
      alert('Failed to send email. Please try again or contact support.');
    } finally {
      setSendingEmail(false);
      setTimeout(() => setEmailStatus(''), 5000);
    }
  };

  // Main JSX Return
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-teal-600" />
            AIC Surfaces Stone Estimator
          </h1>
          <p className="text-gray-600">AI-powered optimization for maximum material efficiency</p>
          
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedQuotes(!showSavedQuotes)}
            >
              <FolderOpen className="w-4 h-4" />
              Saved Quotes ({savedQuotes.length})
            </Button>
            
            {products.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={saveQuote}
              >
                <Save className="w-4 h-4" />
                Save Quote
              </Button>
            )}
          </div>
        </div>

        {/* Saved Quotes Modal */}
        {showSavedQuotes && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Saved Quotes</h2>
                  <button
                    onClick={() => setShowSavedQuotes(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {savedQuotes.length === 0 ? (
                  <p className="text-gray-500 text-center">No saved quotes yet</p>
                ) : (
                  <div className="space-y-3">
                    {savedQuotes.map(quote => (
                      <div key={quote.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{quote.name}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(quote.date).toLocaleDateString()} • 
                              {quote.products.length} products • 
                              Customer: {quote.userInfo.name || 'Not specified'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => loadQuote(quote)}
                            >
                              Load
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => deleteQuote(quote.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Customer Information */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" />
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Products Section */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-600" />
                Products
              </h2>
              <Button onClick={addProduct} size="sm">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-600">
                        Product {index + 1}
                      </span>
                      {product.aiExtracted && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          AI Extracted
                        </span>
                      )}
                    </div>
                    {products.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProduct(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={product.customName}
                        onChange={(e) => updateProduct(index, 'customName', e.target.value)}
                        placeholder="Kitchen Island"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stone Type</label>
                      <select
                        value={product.stone}
                        onChange={(e) => updateProduct(index, 'stone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      >
                        {stoneOptions.map((stone) => (
                          <option key={stone["Stone Type"]} value={stone["Stone Type"]}>
                            {stone["Stone Type"]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Width"</label>
                      <input
                        type="number"
                        value={product.width}
                        onChange={(e) => updateProduct(index, 'width', e.target.value)}
                        placeholder="36"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Depth"</label>
                      <input
                        type="number"
                        value={product.depth}
                        onChange={(e) => updateProduct(index, 'depth', e.target.value)}
                        placeholder="24"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Edge Detail</label>
                      <select
                        value={product.edgeDetail}
                        onChange={(e) => updateProduct(index, 'edgeDetail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      >
                        <option>Eased</option>
                        <option>Beveled</option>
                        <option>Bullnose</option>
                        <option>Ogee</option>
                        <option>Straight</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <span className="flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          Upload Drawing (AI Analysis)
                        </span>
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDrawingUpload(e, index)}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        disabled={loadingAI}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <input
                      type="text"
                      value={product.note}
                      onChange={(e) => updateProduct(index, 'note', e.target.value)}
                      placeholder="Special instructions or notes..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="mb-6">
          <div className="p-6">
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${showAdvancedSettings ? 'rotate-90' : ''}`} />
              Advanced Settings
            </button>
            
            {showAdvancedSettings && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Toggle
                    label="Include Kerf Width"
                    checked={includeKerf}
                    onChange={() => setIncludeKerf(!includeKerf)}
                  />
                  
                  {includeKerf && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kerf Width (inches)
                      </label>
                      <input
                        type="number"
                        value={kerfWidth}
                        onChange={(e) => setKerfWidth(parseFloat(e.target.value) || 0)}
                        step="0.0625"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breakage Buffer (%)
                    </label>
                    <input
                      type="number"
                      value={breakageBuffer}
                      onChange={(e) => setBreakageBuffer(parseInt(e.target.value) || 0)}
                      min="0"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                
                <Toggle
                  label="Show Visual Layouts"
                  checked={showVisualLayouts}
                  onChange={() => setShowVisualLayouts(!showVisualLayouts)}
                />
              </div>
            )}
          </div>
        </Card>

        {/* Calculate Button */}
        <div className="text-center mb-8">
          <Button onClick={calculateAll} size="lg" className="shadow-lg">
            <Calculator className="w-5 h-5" />
            Calculate Estimates
          </Button>
        </div>

        {/* Results Section */}
        {showResults && allResults.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Total Investment</h3>
                  <p className="text-3xl font-bold text-gray-800">
                    ${allResults.reduce((sum, p) => sum + (p.result?.finalPrice || 0), 0).toFixed(2)}
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6 text-center">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Total Slabs Needed</h3>
                  <p className="text-3xl font-bold text-gray-800">
                    {allResults.reduce((sum, p) => sum + (p.result?.totalSlabsNeeded || 0), 0)}
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Average Efficiency</h3>
                  <p className="text-3xl font-bold text-gray-800">
                    {allResults.length > 0 ? 
                      (allResults.reduce((sum, p) => sum + (p.result?.efficiency || 0), 0) / allResults.length).toFixed(1) : '0'}%
                  </p>
                </div>
              </Card>
            </div>

            {/* Individual Product Results */}
            {allResults.map((product, index) => {
              if (!product.result) return null;
              
              const stone = stoneOptions.find(s => s["Stone Type"] === product.stone);
              const pieces = Array(product.quantity).fill().map((_, i) => ({
                id: i + 1,
                width: parseFloat(product.width),
                depth: parseFloat(product.depth),
                name: `Piece ${i + 1}`
              }));

              return (
                <Card key={product.id}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {product.customName || `Product ${index + 1}`}
                        </h3>
                        <p className="text-sm text-gray-600">{product.stone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ${product.result.finalPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">Total Price</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Dimensions</p>
                        <p className="font-semibold">{product.width}" × {product.depth}"</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Quantity</p>
                        <p className="font-semibold">{product.quantity} pieces</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Total Area</p>
                        <p className="font-semibold">{product.result.usableAreaSqft.toFixed(1)} sq ft</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Slabs Needed</p>
                        <p className="font-semibold">{product.result.totalSlabsNeeded}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Cost Breakdown
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Material Cost:</span>
                            <span className="font-medium">${product.result.materialCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Fabrication Cost:</span>
                            <span className="font-medium">${product.result.fabricationCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm pt-2 border-t">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">${product.result.rawCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Markup:</span>
                            <span className="font-medium">{((stone?.["Mark Up"] - 1) * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Efficiency Metrics
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pieces per Slab:</span>
                            <span className="font-medium">{product.result.topsPerSlab}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Material Efficiency:</span>
                            <span className={`font-medium ${
                              product.result.efficiency > 80 ? 'text-green-600' :
                              product.result.efficiency > 60 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {product.result.efficiency.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Edge Detail:</span>
                            <span className="font-medium">{product.edgeDetail}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showVisualLayouts && stone && (
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Visual Layout Optimization
                        </h4>
                        <SlabLayoutVisualization
                          pieces={pieces}
                          slabWidth={parseFloat(stone["Slab Width"])}
                          slabHeight={parseFloat(stone["Slab Height"])}
                          maxPiecesPerSlab={product.result.topsPerSlab}
                          includeKerf={includeKerf}
                          kerfWidth={kerfWidth}
                        />
                      </div>
                    )}

                    {product.note && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> {product.note}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={generatePDF} size="lg">
                <FileText className="w-5 h-5" />
                Generate PDF Quote
              </Button>
              
              <Button 
                onClick={sendEmailToClient} 
                size="lg" 
                disabled={sendingEmail || !userInfo.email}
                className={sendingEmail ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <Mail className="w-5 h-5" />
                {sendingEmail ? 'Sending...' : 'Email Quote'}
              </Button>
            </div>

            {emailStatus && (
              <div className="text-center mt-4">
                <p className={`text-sm ${emailStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                  {emailStatus}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading Overlay */}
        {loadingAI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-sm mx-auto text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-600">Claude is analyzing your drawing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
