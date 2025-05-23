import { useState } from 'react';

export default function AIReviewModal({ 
  isOpen, 
  onClose, 
  extractedData, 
  originalImage, 
  onConfirm, 
  onRetryAnalysis 
}) {
  const [editedPieces, setEditedPieces] = useState(extractedData?.data?.pieces || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPiece, setNewPiece] = useState({
    name: '',
    width: '',
    depth: '',
    quantity: 1,
    edgeDetail: 'Eased',
    type: 'countertop'
  });
  const [analysisHints, setAnalysisHints] = useState('');

  if (!isOpen) return null;

  const handleEditPiece = (index, field, value) => {
    const updated = [...editedPieces];
    updated[index][field] = value;
    setEditedPieces(updated);
  };

  const handleDeletePiece = (index) => {
    setEditedPieces(editedPieces.filter((_, i) => i !== index));
  };

  const handleAddPiece = () => {
    if (newPiece.name && newPiece.width && newPiece.depth) {
      setEditedPieces([...editedPieces, {
        ...newPiece,
        width: parseFloat(newPiece.width),
        depth: parseFloat(newPiece.depth),
        confidence: 'manual',
        notes: 'Manually added by user'
      }]);
      setNewPiece({
        name: '',
        width: '',
        depth: '',
        quantity: 1,
        edgeDetail: 'Eased',
        type: 'countertop'
      });
      setShowAddForm(false);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      ...extractedData,
      data: {
        ...extractedData.data,
        pieces: editedPieces
      }
    });
  };

  const handleRetryWithHints = () => {
    onRetryAnalysis(analysisHints);
    onClose();
  };

  const getConfidenceColor = (confidence) => {
    switch(confidence) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      case 'manual': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Review AI Analysis Results</h2>
          <p className="text-gray-600 mt-2">
            Verify detected pieces and add any that were missed. You can edit dimensions or delete incorrect pieces.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Original Image */}
            <div>
              <h3 className="font-semibold mb-3">Original Drawing</h3>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                <img 
                  src={originalImage} 
                  alt="Technical drawing" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Analysis Summary */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Analysis Summary</h4>
                <div className="text-sm space-y-1">
                  <p>Total Pieces Found: <span className="font-bold">{editedPieces.length}</span></p>
                  <p>Drawing Type: <span className="font-bold">{extractedData?.data?.drawingType || 'Unknown'}</span></p>
                  <p>Confidence: <span className={`font-bold ${getConfidenceColor(extractedData?.data?.summary?.confidence)}`}>
                    {extractedData?.data?.summary?.confidence || 'Unknown'}
                  </span></p>
                </div>
                
                {extractedData?.data?.summary?.possibleMissedAreas?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-orange-700">Possible Missed Areas:</p>
                    <ul className="text-sm text-orange-600 mt-1">
                      {extractedData.data.summary.possibleMissedAreas.map((area, i) => (
                        <li key={i}>• {area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Retry with Hints */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Need Better Results?</h4>
                <textarea
                  placeholder="Describe what was missed (e.g., 'There are 4 small corner pieces marked in red' or 'Peninsula section at bottom was not detected')"
                  value={analysisHints}
                  onChange={(e) => setAnalysisHints(e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  rows={3}
                />
                <button
                  onClick={handleRetryWithHints}
                  disabled={!analysisHints.trim()}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm"
                >
                  🔄 Re-analyze with Hints
                </button>
              </div>
            </div>

            {/* Right: Detected Pieces */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Detected Pieces</h3>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  + Add Piece
                </button>
              </div>

              {/* Add New Piece Form */}
              {showAddForm && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Add New Piece</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Piece name"
                      value={newPiece.name}
                      onChange={(e) => setNewPiece({...newPiece, name: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    />
                    <select
                      value={newPiece.type}
                      onChange={(e) => setNewPiece({...newPiece, type: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    >
                      <option value="countertop">Countertop</option>
                      <option value="island">Island</option>
                      <option value="backsplash">Backsplash</option>
                      <option value="corner_piece">Corner Piece</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Width (inches)"
                      value={newPiece.width}
                      onChange={(e) => setNewPiece({...newPiece, width: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Depth (inches)"
                      value={newPiece.depth}
                      onChange={(e) => setNewPiece({...newPiece, depth: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={newPiece.quantity}
                      onChange={(e) => setNewPiece({...newPiece, quantity: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    />
                    <select
                      value={newPiece.edgeDetail}
                      onChange={(e) => setNewPiece({...newPiece, edgeDetail: e.target.value})}
                      className="border px-3 py-2 rounded text-sm"
                    >
                      <option value="Eased">Eased</option>
                      <option value="Bullnose">Bullnose</option>
                      <option value="Ogee">Ogee</option>
                      <option value="1.5 mitered">1.5" mitered</option>
                      <option value="Beveled">Beveled</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleAddPiece}
                      className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Add Piece
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Pieces List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {editedPieces.map((piece, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <input
                          type="text"
                          value={piece.name}
                          onChange={(e) => handleEditPiece(index, 'name', e.target.value)}
                          className="font-semibold bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                        />
                        <span className={`ml-2 text-xs ${getConfidenceColor(piece.confidence)}`}>
                          ({piece.confidence} confidence)
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeletePiece(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        ✕ Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <label className="text-gray-600">Width (inches)</label>
                        <input
                          type="number"
                          value={piece.width}
                          onChange={(e) => handleEditPiece(index, 'width', parseFloat(e.target.value))}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Depth (inches)</label>
                        <input
                          type="number"
                          value={piece.depth}
                          onChange={(e) => handleEditPiece(index, 'depth', parseFloat(e.target.value))}
                          className="w-full border px-2 py-1 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Type</label>
                        <select
                          value={piece.type}
                          onChange={(e) => handleEditPiece(index, 'type', e.target.value)}
                          className="w-full border px-2 py-1 rounded"
                        >
                          <option value="countertop">Countertop</option>
                          <option value="island">Island</option>
                          <option value="backsplash">Backsplash</option>
                          <option value="corner_piece">Corner Piece</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-gray-600">Edge Detail</label>
                        <select
                          value={piece.edgeDetail}
                          onChange={(e) => handleEditPiece(index, 'edgeDetail', e.target.value)}
                          className="w-full border px-2 py-1 rounded"
                        >
                          <option value="Eased">Eased</option>
                          <option value="Bullnose">Bullnose</option>
                          <option value="Ogee">Ogee</option>
                          <option value="1.5 mitered">1.5" mitered</option>
                          <option value="Beveled">Beveled</option>
                        </select>
                      </div>
                    </div>
                    
                    {piece.notes && (
                      <div className="mt-2 text-xs text-gray-600">
                        Notes: {piece.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total pieces: <span className="font-bold">{editedPieces.length}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm {editedPieces.length} Pieces
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}