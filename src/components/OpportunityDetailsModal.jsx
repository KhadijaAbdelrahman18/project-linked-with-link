import React from 'react';
import { X, Star, Users, DollarSign, TrendingUp, Briefcase, MapPin } from 'lucide-react';

const OpportunityDetailsModal = ({ opportunity, isOpen, onClose }) => {
  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-3xl font-bold text-gray-900">{opportunity.name}</div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{opportunity.stage}</span>
            </div>
            <div className="mb-2 text-gray-600 font-medium">{opportunity.industry}</div>
            <div className="mb-6 text-gray-700">{opportunity.description}</div>
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Funding Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${Math.min(100, (opportunity.funded / opportunity.goal) * 100)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>${opportunity.funded.toLocaleString()} / ${opportunity.goal.toLocaleString()}</span>
                <span><Users className="inline w-4 h-4 mr-1" />{opportunity.investors} investors</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                <Star className="w-5 h-5" />
                {opportunity.rating}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <DollarSign className="w-5 h-5" />
                Min Investment: ${opportunity.minInvestment.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <TrendingUp className="w-5 h-5" />
                ROI: {opportunity.roi}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-900">Founder: {opportunity.founder}</div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                {opportunity.location}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <div className="font-semibold text-gray-900 mb-2">About the Opportunity</div>
              <div className="text-gray-700 text-sm">{opportunity.longDescription || 'No additional details provided.'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsModal; 