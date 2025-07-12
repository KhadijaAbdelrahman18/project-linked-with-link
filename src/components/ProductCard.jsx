import React, { useState } from 'react';
import { Edit, Eye, Star } from 'lucide-react';

const ProductCard = ({ product, onViewDetails, isService, onToggleAvailability }) => {
  // For services, manage local availability state if not managed by parent
  const [available, setAvailable] = useState(
    typeof product.availableNow === 'boolean' ? product.availableNow : true
  );

  const handleToggle = () => {
    setAvailable((prev) => {
      const newVal = !prev;
      if (onToggleAvailability) onToggleAvailability(product, newVal);
      return newVal;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      {/* Header with title and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          {product.status}
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Stock:</span> {product.stock !== undefined ? product.stock : 'N/A'}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Orders:</span> {product.orders !== undefined ? product.orders : 'N/A'}
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
        </div>
      </div>

      {/* Service Availability Toggle */}
      {isService && (
        <div className="flex items-center mb-4">
          <span className={`mr-2 text-sm font-medium ${available ? 'text-green-700' : 'text-red-600'}`}>
            {available ? 'Available' : 'Unavailable'}
          </span>
          <button
            onClick={handleToggle}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${available ? 'bg-green-400' : 'bg-gray-300'}`}
            aria-label="Toggle availability"
          >
            <span
              className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${available ? 'translate-x-4' : 'translate-x-0'}`}
            />
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200">
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button 
          onClick={() => onViewDetails(product)}
          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 