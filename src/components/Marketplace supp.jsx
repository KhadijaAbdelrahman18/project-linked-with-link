import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { buttonHandlers, getParticipantData } from '../utils/buttonHandlers';
import MarketplaceFiltersSupp from './MarketplaceFilters supp';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  SlidersHorizontal,
  Building,
  Users,
  Award,
  Truck,
  Package,
  ChefHat,
  CreditCard,
  Scale,
  Palette,
  Megaphone,
  Calculator,
  Car,
  DollarSign,
  TrendingUp,
  Plus,
  HeartHandshake
} from 'lucide-react';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';

const MarketplaceSupp = () => {
  // State declarations
  const [activeTab, setActiveTab] = useState('suppliers');
  const [supplierType, setSupplierType] = useState('products');
  const [supplierData, setSupplierData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [supplierFilters, setSupplierFilters] = useState({});
  const [serviceFilters, setServiceFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Add Product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null
  });
  // Add Service form state
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Handle product form change
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  // Handle service form change
  const handleServiceChange = (e) => {
    const { name, value, files } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Submit new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append('images', value); // Backend expects 'images' (plural)
        } else if (value && key !== 'image') {
          formData.append(key, value);
        }
      });
      // Optionally set isActive to true by default
      formData.append('isActive', 'true');
      const token = localStorage.getItem('token');
      // Do not set Content-Type header manually for FormData
      const res = await fetch('https://backendelevante-production.up.railway.app/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload product');
      const added = await res.json();
      setSupplierData(prev => [...prev, added.data || added]);
      setShowAddModal(null);
      setNewProduct({ name: '', category: '', price: '', stock: '', description: '', image: null });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Submit new service
  const handleAddService = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      Object.entries(newService).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append('images', value); // Backend expects 'images' (plural)
        } else if (value && key !== 'image') {
          formData.append(key, value);
        }
      });
      // Optionally set isActive to true by default
      formData.append('isActive', 'true');
      const token = localStorage.getItem('token');
      // Do not set Content-Type header manually for FormData
      const res = await fetch('https://backendelevante-production.up.railway.app/api/services', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload service');
      const added = await res.json();
      setServiceData(prev => [...prev, added.service]);
      setShowAddModal(null);
      setNewService({ name: '', category: '', price: '', description: '', image: null });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Get current data based on active tab and supplier type
  const getCurrentData = () => {
    if (activeTab === 'services') {
      return serviceData;
    } else if (activeTab === 'suppliers') {
      if (supplierType === 'products') {
        return supplierData;
      } else if (supplierType === 'services') {
        return serviceData;
      } else {
        return [...supplierData, ...serviceData];
      }
    }
    return [];
  };

  const currentData = getCurrentData();
  const currentFilters = activeTab === 'suppliers' ?
    (supplierType === 'products' ? supplierFilters :
      supplierType === 'services' ? serviceFilters :
        supplierFilters) : serviceFilters;

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = currentData.filter(item => {
      const matchesSearch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = Object.keys(currentFilters).every(key => {
        if (!currentFilters[key] || currentFilters[key] === '') return true;
        return item[key] === currentFilters[key];
      });

      return matchesSearch && matchesFilters;
    });

    // Sort data
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filtered.sort((a, b) => {
          if (activeTab === 'services') {
            const aInvestment = parseInt(a.investmentRange.replace(/[^0-9]/g, ''));
            const bInvestment = parseInt(b.investmentRange.replace(/[^0-9]/g, ''));
            return aInvestment - bInvestment;
          } else {
            const aPrice = parseInt(a.price.replace(/[^0-9]/g, ''));
            const bPrice = parseInt(b.price.replace(/[^0-9]/g, ''));
            return aPrice - bPrice;
          }
        });
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [currentData, searchQuery, currentFilters, sortBy]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFiltersChange = (newFilters) => {
    if (activeTab === 'suppliers') {
      if (supplierType === 'products') {
        setSupplierFilters(newFilters);
      } else if (supplierType === 'services') {
        setServiceFilters(newFilters);
      } else {
        setSupplierFilters(newFilters);
        setServiceFilters(newFilters);
      }
    } else if (activeTab === 'services') {
      setServiceFilters(newFilters);
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    if (activeTab === 'suppliers') {
      setSupplierFilters({});
      setServiceFilters({});
    } else if (activeTab === 'services') {
      setServiceFilters({});
    }
    setSearchQuery('');
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    if (activeTab === 'services') {
      return Object.values(serviceFilters).filter(value => value && value !== '').length;
    } else if (activeTab === 'suppliers') {
      if (supplierType === 'products') {
        return Object.values(supplierFilters).filter(value => value && value !== '').length;
      } else if (supplierType === 'services') {
        return Object.values(serviceFilters).filter(value => value && value !== '').length;
      } else {
        return Object.values(supplierFilters).filter(value => value && value !== '').length;
      }
    }
    return 0;
  };

  const getCategoryOptions = () => {
    const categories = [...new Set(currentData.map(item => item.category))];
    return categories.map(category => ({
      value: category,
      label: category
    }));
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      // Supplier categories
      'Raw Materials': Package,
      'Kitchen Tools & Appliances': ChefHat,
      'Food Truck Equipment': Truck,
      'Food Packaging': Package,
      'POS Systems & Tech': CreditCard,
      'Safety & Hygiene': Scale,
      'Beverage Equipment': Package,
      'Frozen Foods': Package,
      'Organic Ingredients': Package,
      'Refrigeration Equipment': Package,
      'Uniforms & Apparel': Package,
      'Bakery Equipment': ChefHat,
      // Service categories
      'Legal Services': Scale,
      'Branding & Design': Palette,
      'Marketing & Social Media': Megaphone,
      'Business Consulting': Building,
      'Financial Services': Calculator,
      'Digital Marketing': Megaphone,
      'Food Photography': Palette,
      'Food Safety Training': Scale,
      'Interior Design': Palette,
      'Permitting Services': Building,
      'Menu Development': ChefHat,
      'Waste Management': Package,
      // Investor categories
      'Venture Capital': TrendingUp,
      'Private Equity': DollarSign,
      'Impact Investment': Award,
      'Angel Investment': Users,
      'Specialized Fund': Building,
      'Technology Investment': CreditCard,
      'Health & Wellness': Award,
      'International Investment': Globe,
      'Sustainability': Award,
      'Culinary Investment': ChefHat,
      'Food Security': Award,
      'Plant-Based Investment': Award
    };
    return iconMap[category] || Package;
  };

  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  // Fetch products and services from backend on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Fetch products
    fetch('https://backendelevante-production.up.railway.app/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // If backend returns { products: [...] }
        setSupplierData(data.products || data);
      })
      .catch(() => setSupplierData([]));
    // Fetch services
    fetch('https://backendelevante-production.up.railway.app/api/services', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // If backend returns { services: [...] }
        setServiceData(data.services || data);
      })
      .catch(() => setServiceData([]));
  }, []);

  // Ensure products is active by default when navigating to this page
  useEffect(() => {
    setActiveTab('suppliers');
    setSupplierType('products');
  }, []);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#EEF8F7', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-1 mt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#1D3557' }}>Manage your {activeTab === 'suppliers' ? (supplierType === 'products' ? 'Products' : 'Services') : 'Services'} for your business</h1>
            {/* <p className="text-gray-600 mt-0 mb-0">
              Manage your {activeTab === 'suppliers' ? (supplierType === 'products' ? 'Products' : 'Services') : 'Services'} for your food business
            </p> */}
          </div>
          {/* Add Button on the right */}
          {activeTab === 'suppliers' && supplierType === 'products' && (
            <button
              type="button"
              className="flex items-center px-6 py-2 bg-[#457B9D] text-white rounded-lg font-semibold text-base hover:bg-[#1D3557] transition-colors"
              onClick={() => setShowAddModal('product')}
            >
              <span className="text-xl mr-2">+</span> Add Product
            </button>
          )}
          {activeTab === 'suppliers' && supplierType === 'services' && (
            <button
              type="button"
              className="flex items-center px-6 py-2 bg-[#457B9D] text-white rounded-lg font-semibold text-base hover:bg-[#1D3557] transition-colors"
              onClick={() => setShowAddModal('service')}
            >
              <span className="text-xl mr-2">+</span> Add Service
            </button>
          )}
        </div>

        {/* Main Category Toggle */}
        <div className="mb-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('suppliers');
                  setSupplierType('products');
                  setCurrentPage(1);
                }}
                className={`flex-1 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeTab === 'suppliers' && supplierType === 'products'
                    ? 'bg-[#457B9D] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}
                `}
              >
                <Package className="w-4 h-4 inline mr-2" /> Products
              </button>
              <button
                onClick={() => {
                  setActiveTab('suppliers');
                  setSupplierType('services');
                  setCurrentPage(1);
                }}
                className={`flex-1 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'suppliers' && supplierType === 'services'
                  ? 'bg-[#457B9D] text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <HeartHandshake className="w-4 h-4 inline mr-2" /> Services
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter for Suppliers */}
        {/* Removed Add buttons from here as per new design */}

        {/* Type and Category Display */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {currentFilters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentFilters.category}
            </span>
          )}
        </div>

        {/* Filters Section - Top */}
        <div className="mb-2">
          <MarketplaceFiltersSupp
            activeTab={activeTab}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            getActiveFiltersCount={getActiveFiltersCount}
          />
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>

                <span className="text-sm text-gray-600">
                  {filteredData.length} {activeTab === 'suppliers' ? (supplierType === 'products' ? 'products' : 'services') : activeTab === 'services' ? 'services' : 'providers'} found
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-[#457B9D]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price">{activeTab === 'services' ? 'Sort by Investment Range' : 'Sort by Price'}</option>
                  <option value="reviews">Sort by Reviews</option>
                </select>

                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {paginatedData.length > 0 ? (
            <div className={`grid gap-2 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {paginatedData.map((item, idx) => (
                <ProductCard 
                  key={item.id || idx} 
                  product={item} 
                  onViewDetails={handleViewProductDetails} 
                  isService={supplierType === 'services'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-gray-400 mb-2">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${currentPage === page
                      ? 'bg-[#457B9D] text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      {/* Modal for Adding Product or Service */}
      {showAddModal === 'product' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="">
              <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Product Information</h2>
                <p className="text-gray-600 mb-6">Fill in the details for your new product</p>
                <form className="space-y-6" onSubmit={handleAddProduct}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input name="name" type="text" value={newProduct.name} onChange={handleProductChange} placeholder="e.g., Premium Office Chair" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input name="category" type="text" value={newProduct.category} onChange={handleProductChange} placeholder="e.g., Furniture" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input name="price" type="number" value={newProduct.price} onChange={handleProductChange} placeholder="299.00" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input name="stock" type="number" value={newProduct.stock} onChange={handleProductChange} placeholder="50" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={newProduct.description} onChange={handleProductChange} placeholder="Describe your product..." className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                    <input name="image" type="file" onChange={handleProductChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  {uploadError && <div className="text-red-600 text-sm">{uploadError}</div>}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      onClick={() => setShowAddModal(null)}
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold text-base hover:bg-slate-900 transition-colors" disabled={uploading}>
                      <span className="text-xl mr-2">+</span> {uploading ? 'Uploading...' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddModal === 'service' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="">
              <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Service Information</h2>
                <p className="text-gray-600 mb-6">Fill in the details for your new service</p>
                <form className="space-y-6" onSubmit={handleAddService}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                      <input name="name" type="text" value={newService.name} onChange={handleServiceChange} placeholder="e.g., Professional website" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input name="category" type="text" value={newService.category} onChange={handleServiceChange} placeholder="e.g., Software" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input name="price" type="number" value={newService.price} onChange={handleServiceChange} placeholder="299.00" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={newService.description} onChange={handleServiceChange} placeholder="Describe your service..." className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Images</label>
                    <input name="image" type="file" onChange={handleServiceChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  {uploadError && <div className="text-red-600 text-sm">{uploadError}</div>}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      onClick={() => setShowAddModal(null)}
                      disabled={uploading}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold text-base hover:bg-slate-900 transition-colors" disabled={uploading}>
                      <span className="text-xl mr-2">+</span> {uploading ? 'Uploading...' : 'Add Service'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add the modal at the end of the main content */}
      <ProductDetailsModal product={selectedProduct} isOpen={isProductModalOpen} onClose={handleCloseProductModal} />
    </div>
  );
};

export default MarketplaceSupp;