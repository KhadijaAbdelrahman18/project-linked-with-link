import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buttonHandlers } from '../utils/buttonHandlers';
import { 
  Package, 
  Users, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  MessageCircle,
  Filter,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';

export default function MyDeals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('suppliers');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for suppliers deals
  const supplierDeals = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      logo: "/placeholder-logo.png",
      dealType: "Product Supplier",
      category: "Electronics",
      location: "Dubai, UAE",
      agreementDate: "2024-01-15",
      status: "confirmed",
      amount: "$15,000",
      description: "Supply of IoT devices for smart home project"
    },
    {
      id: 2,
      name: "Design Studio Pro",
      logo: "/placeholder-logo.png",
      dealType: "Service Provider",
      category: "Design",
      location: "Riyadh, KSA",
      agreementDate: "2024-01-10",
      status: "pending",
      amount: "$8,500",
      description: "UI/UX design services for mobile app"
    },
    {
      id: 3,
      name: "Legal Partners Group",
      logo: "/placeholder-logo.png",
      dealType: "Service Provider",
      category: "Legal",
      location: "Cairo, Egypt",
      agreementDate: "2024-01-05",
      status: "confirmed",
      amount: "$5,200",
      description: "Legal consultation and contract review"
    },
    {
      id: 4,
      name: "Manufacturing Co.",
      logo: "/placeholder-logo.png",
      dealType: "Product Supplier",
      category: "Manufacturing",
      location: "Istanbul, Turkey",
      agreementDate: "2023-12-20",
      status: "cancelled",
      amount: "$25,000",
      description: "Custom hardware manufacturing"
    }
  ];

  // Mock data for investor deals
  const investorDeals = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      avatar: "/placeholder-user.jpg",
      investmentAmount: "$50,000",
      supportType: "Equity Investment",
      supportedStage: "Growth",
      agreementDate: "2024-01-20",
      status: "confirmed",
      description: "Series A funding for expansion"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      investmentAmount: "$25,000",
      supportType: "Angel Investment",
      supportedStage: "MVP",
      agreementDate: "2024-01-12",
      status: "pending",
      description: "Early stage funding for prototype development"
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      avatar: "/placeholder-user.jpg",
      investmentAmount: "$100,000",
      supportType: "Strategic Investment",
      supportedStage: "Growth",
      agreementDate: "2024-01-08",
      status: "confirmed",
      description: "Strategic partnership and funding"
    }
  ];

  // Filter and sort deals
  const getFilteredDeals = () => {
    const deals = activeTab === 'suppliers' ? supplierDeals : investorDeals;
    
    let filtered = deals;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(deal => deal.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.agreementDate) - new Date(a.agreementDate);
      } else {
        return new Date(a.agreementDate) - new Date(b.agreementDate);
      }
    });
    
    return filtered;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredDeals = getFilteredDeals();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#EEF8F7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border-0 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1D3557] mb-2">My Deals</h1>
              <p className="text-[#457B9D]">Manage and track all your business agreements</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'suppliers'
                  ? 'bg-white text-[#1D3557] shadow-md'
                  : 'text-[#457B9D] hover:text-[#1D3557]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Suppliers</span>
            </button>
            <button
              onClick={() => setActiveTab('investors')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'investors'
                  ? 'bg-white text-[#1D3557] shadow-md'
                  : 'text-[#457B9D] hover:text-[#1D3557]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Investors</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#457B9D]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[#A8DADC] rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-[#457B9D]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-[#A8DADC] rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Deals Grid */}
          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Deal Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#A8DADC] to-[#457B9D] rounded-lg flex items-center justify-center">
                          {activeTab === 'suppliers' ? (
                            <Package className="w-6 h-6 text-white" />
                          ) : (
                            <Users className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1D3557]">{deal.name}</h3>
                          {activeTab === 'suppliers' ? (
                            <p className="text-sm text-[#457B9D]">{deal.dealType}</p>
                          ) : (
                            <p className="text-sm text-[#457B9D]">{deal.supportType}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(deal.status)}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          deal.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          deal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getStatusText(deal.status)}
                        </span>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="space-y-2">
                      {activeTab === 'suppliers' ? (
                        <>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Category:</span>
                            <span>{deal.category}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{deal.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(deal.agreementDate)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Amount:</span>
                            <span className="text-[#1D3557] font-semibold">{deal.amount}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Investment:</span>
                            <span className="text-[#1D3557] font-semibold">{deal.investmentAmount}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Stage:</span>
                            <span>{deal.supportedStage}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(deal.agreementDate)}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{deal.description}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex space-x-3">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#1D3557] transition-colors duration-300">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View Details</span>
                      </button>
                      {activeTab === 'suppliers' ? (
                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-[#457B9D] text-[#457B9D] rounded-lg hover:bg-[#457B9D] hover:text-white transition-colors duration-300">
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">View Profile</span>
                        </button>
                      ) : (
                        <button 
                          onClick={() => buttonHandlers.handleMessage(deal.id, navigate)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-[#457B9D] text-[#457B9D] rounded-lg hover:bg-[#457B9D] hover:text-white transition-colors duration-300"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Message</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {activeTab === 'suppliers' ? (
                  <Package className="w-12 h-12 text-gray-400" />
                ) : (
                  <Users className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-[#1D3557] mb-2">
                No {activeTab === 'suppliers' ? 'supplier' : 'investor'} deals found
              </h3>
              <p className="text-[#457B9D] mb-6">
                {statusFilter !== 'all' ? `No ${statusFilter} deals available.` : 
                 `You haven't made any ${activeTab === 'suppliers' ? 'supplier' : 'investor'} deals yet.`}
              </p>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white rounded-lg hover:from-[#457B9D] hover:to-[#1D3557] transition-all duration-500 transform hover:scale-105 hover:shadow-lg mx-auto">
                <ExternalLink className="w-4 h-4" />
                <span>Go to Marketplace</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 