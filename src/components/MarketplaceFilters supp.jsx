import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  Truck,
  Store,
  ChefHat,
  Package,
  CreditCard,
  Scale,
  Palette,
  Megaphone,
  Building2,
  Car,
  Calculator
} from 'lucide-react';
import { Country, State, City } from 'country-state-city';

const MarketplaceFiltersSupp = ({
  activeTab,
  onFiltersChange,
  onClearFilters,
  showFilters,
  onToggleFilters,
  searchQuery,
  onSearchChange,
  getActiveFiltersCount
}) => {
  // Separate filter states for each tab
  const [supplierFilters, setSupplierFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    availableNow: false
  });

  const [serviceFilters, setServiceFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    availableNow: false
  });

  const [servicesFilters, setServicesFilters] = useState({
    category: '',
    minInvestment: '',
    maxInvestment: '',
    preferredStage: '',
    availableNow: false
  });

  // Temporary filter states that are not applied yet
  const [tempSupplierFilters, setTempSupplierFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    availableNow: false
  });

  const [tempServiceFilters, setTempServiceFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    availableNow: false
  });

  const [tempServicesFilters, setTempServicesFilters] = useState({
    category: '',
    minInvestment: '',
    maxInvestment: '',
    preferredStage: '',
    availableNow: false
  });

  // Get current filters based on active tab
  const getCurrentFilters = () => {
    if (activeTab === 'services') {
      return servicesFilters;
    } else if (activeTab === 'suppliers') {
      return supplierFilters;
    } else {
      return serviceFilters;
    }
  };

  const getCurrentTempFilters = () => {
    if (activeTab === 'services') {
      return tempServicesFilters;
    } else if (activeTab === 'suppliers') {
      return tempSupplierFilters;
    } else {
      return tempServiceFilters;
    }
  };

  const setCurrentFilters = (newFilters) => {
    if (activeTab === 'services') {
      setServicesFilters(newFilters);
    } else if (activeTab === 'suppliers') {
      setSupplierFilters(newFilters);
    } else {
      setServiceFilters(newFilters);
    }
  };

  const setCurrentTempFilters = (newFilters) => {
    if (activeTab === 'services') {
      setTempServicesFilters(newFilters);
    } else if (activeTab === 'suppliers') {
      setTempSupplierFilters(newFilters);
    } else {
      setTempServiceFilters(newFilters);
    }
  };

  // Get countries, states, and cities from the package
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Dynamic category options based on active tab
  const getCategoryOptions = () => {
    if (activeTab === 'services') {
      return [
        { value: 'venture-capital', label: 'Venture Capital', icon: 'TrendingUp' },
        { value: 'private-equity', label: 'Private Equity', icon: 'DollarSign' },
        { value: 'impact-investment', label: 'Impact Investment', icon: 'Award' },
        { value: 'angel-investment', label: 'Angel Investment', icon: 'Users' },
        { value: 'specialized-fund', label: 'Specialized Fund', icon: 'Building' },
        { value: 'technology-investment', label: 'Technology Investment', icon: 'CreditCard' },
        { value: 'health-wellness', label: 'Health & Wellness', icon: 'Award' },
        { value: 'international-investment', label: 'International Investment', icon: 'Globe' },
        { value: 'sustainability', label: 'Sustainability', icon: 'Award' },
        { value: 'culinary-investment', label: 'Culinary Investment', icon: 'ChefHat' },
        { value: 'food-security', label: 'Food Security', icon: 'Award' },
        { value: 'plant-based-investment', label: 'Plant-Based Investment', icon: 'Award' }
      ];
    } else if (activeTab === 'suppliers') {
      return [
        { value: 'food-truck-equipment', label: 'Food Truck Equipment', icon: Truck },
        { value: 'kiosks-booths', label: 'Kiosks & Booths', icon: Store },
        { value: 'kitchen-tools-appliances', label: 'Kitchen Tools & Appliances', icon: ChefHat },
        { value: 'food-packaging', label: 'Food Packaging', icon: Package },
        { value: 'raw-materials', label: 'Raw Materials', icon: Package },
        { value: 'pos-systems-tech', label: 'POS Systems & Tech', icon: CreditCard },
        { value: 'safety-hygiene', label: 'Safety & Hygiene', icon: Scale }
      ];
    } else {
      return [
        { value: 'legal-services', label: 'Legal Services', icon: Scale },
        { value: 'branding-design', label: 'Branding & Design', icon: Palette },
        { value: 'marketing-social-media', label: 'Marketing & Social Media', icon: Megaphone },
        { value: 'business-consulting', label: 'Business Consulting', icon: Building2 },
        { value: 'chefs-kitchen-staff', label: 'Chefs & Kitchen Staff', icon: ChefHat },
        { value: 'delivery-logistics', label: 'Delivery Logistics', icon: Car },
        { value: 'financial-planning', label: 'Financial Planning', icon: Calculator }
      ];
    }
  };

  // Update states when country changes
  useEffect(() => {
    const currentTempFilters = getCurrentTempFilters();
    if (currentTempFilters.country) {
      const countryCode = currentTempFilters.country;
      const countryStates = State.getStatesOfCountry(countryCode);
      setStates(countryStates);
      setCurrentTempFilters({ ...currentTempFilters, state: '', city: '' });
    } else {
      setStates([]);
      setCities([]);
    }
  }, [getCurrentTempFilters().country]);

  // Update cities when state changes
  useEffect(() => {
    const currentTempFilters = getCurrentTempFilters();
    if (currentTempFilters.country && currentTempFilters.state) {
      const countryCode = currentTempFilters.country;
      const stateCode = currentTempFilters.state;
      const stateCities = City.getCitiesOfState(countryCode, stateCode);
      setCities(stateCities);
      setCurrentTempFilters({ ...currentTempFilters, city: '' });
    } else {
      setCities([]);
    }
  }, [getCurrentTempFilters().country, getCurrentTempFilters().state]);

  // Initialize temp filters when tab changes
  useEffect(() => {
    const currentFilters = getCurrentFilters();
    setCurrentTempFilters(currentFilters);
  }, [activeTab]);

  const handleFilterChange = (key, value) => {
    const currentTempFilters = getCurrentTempFilters();
    const newTempFilters = { ...currentTempFilters, [key]: value };
    setCurrentTempFilters(newTempFilters);
  };

  const applyFilters = () => {
    const currentTempFilters = getCurrentTempFilters();
    setCurrentFilters(currentTempFilters);
    onFiltersChange(currentTempFilters);
  };

  const clearAllFilters = () => {
    const emptySupplierFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      availableNow: false
    };

    const emptyServicesFilters = {
      category: '',
      minInvestment: '',
      maxInvestment: '',
      preferredStage: '',
      availableNow: false
    };

    if (activeTab === 'services') {
      setServicesFilters(emptyServicesFilters);
      setTempServicesFilters(emptyServicesFilters);
    } else if (activeTab === 'suppliers') {
      setSupplierFilters(emptySupplierFilters);
      setTempSupplierFilters(emptySupplierFilters);
    } else {
      setServiceFilters(emptySupplierFilters);
      setTempServiceFilters(emptySupplierFilters);
    }

    onClearFilters();
  };

  const renderActiveFilters = () => {
    const currentFilters = getCurrentFilters();
    const activeFilters = [];

    if (currentFilters.category) {
      activeFilters.push(
        <span key="category" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Category: {currentFilters.category}
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), category: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.country) {
      const countryName = countries.find(c => c.isoCode === currentFilters.country)?.name || currentFilters.country;
      activeFilters.push(
        <span key="country" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Country: {countryName}
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), country: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.state) {
      const stateName = states.find(s => s.isoCode === currentFilters.state)?.name || currentFilters.state;
      activeFilters.push(
        <span key="state" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          State: {stateName}
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), state: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.city) {
      const cityName = cities.find(c => c.name === currentFilters.city)?.name || currentFilters.city;
      activeFilters.push(
        <span key="city" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          City: {cityName}
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), city: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.minRating) {
      activeFilters.push(
        <span key="rating" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Min Rating: {currentFilters.minRating}★
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), minRating: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.minPrice || currentFilters.maxPrice || currentFilters.minInvestment || currentFilters.maxInvestment) {
      const isServices = activeTab === 'services';
      const minValue = isServices ? currentFilters.minInvestment : currentFilters.minPrice;
      const maxValue = isServices ? currentFilters.maxInvestment : currentFilters.maxPrice;
      const priceText = minValue && maxValue
        ? `${minValue} - ${maxValue}`
        : minValue
          ? `Min: ${minValue}`
          : `Max: ${maxValue}`;

      activeFilters.push(
        <span key="price" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          {isServices ? 'Investment' : 'Price'}: {priceText}
          <button
            onClick={() => {
              const newTempFilters = {
                ...getCurrentTempFilters(),
                minPrice: '',
                maxPrice: '',
                minInvestment: '',
                maxInvestment: ''
              };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (activeTab === 'services' && currentFilters.preferredStage) {
      activeFilters.push(
        <span key="stage" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Stage: {currentFilters.preferredStage}
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), preferredStage: '' };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (currentFilters.availableNow) {
      activeFilters.push(
        <span key="available" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Available Now
          <button
            onClick={() => {
              const newTempFilters = { ...getCurrentTempFilters(), availableNow: false };
              setCurrentTempFilters(newTempFilters);
            }}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (searchQuery) {
      activeFilters.push(
        <span key="search" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#457B9D]/10 text-[#457B9D] mr-2 mb-2">
          Search: "{searchQuery}"
          <button
            onClick={() => onSearchChange('')}
            className="ml-2 text-[#457B9D] hover:text-[#457B9D]/80"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      );
    }

    if (activeFilters.length > 0) {
      return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Active Filters</h4>
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters}
          </div>
        </div>
      );
    }

    return null;
  };

  const currentTempFilters = getCurrentTempFilters();
  const currentFilters = getCurrentFilters();

  // Check if there are unsaved changes
  const hasUnsavedChanges = JSON.stringify(currentTempFilters) !== JSON.stringify(currentFilters);

  return (
    <>
      {/* Top Filters Bar */}
      <div className={`${showFilters ? 'block' : 'hidden'} bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4`} style={{ fontFamily: 'Georgia, serif' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center" style={{ color: '#1D3557' }}>
            <Filter className="w-5 h-5 mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#457B9D]/10 text-[#457B9D] rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-[#457B9D] ${searchQuery ? 'border-[#457B9D]/30 bg-[#457B9D]/5' : 'border-gray-300'
                }`}
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={currentTempFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-[#457B9D] text-sm ${currentTempFilters.category ? 'border-[#457B9D]/30 bg-[#457B9D]/5' : 'border-gray-300'
                }`}
            >
              <option value="">All Categories</option>
              {getCategoryOptions().map(category => (
                <option key={category.value} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={currentTempFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-[#457B9D] text-sm ${currentTempFilters.minPrice ? 'border-[#457B9D]/30 bg-[#457B9D]/5' : 'border-gray-300'
                  }`}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={currentTempFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-[#457B9D] text-sm ${currentTempFilters.maxPrice ? 'border-[#457B9D]/30 bg-[#457B9D]/5' : 'border-gray-300'
                  }`}
              />
            </div>
          </div>

          {/* Available Now - Only for Suppliers */}
          {activeTab !== 'services' && (
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentTempFilters.availableNow}
                  onChange={(e) => handleFilterChange('availableNow', e.target.checked)}
                  className={`rounded focus:ring-[#457B9D] ${currentTempFilters.availableNow ? 'text-[#457B9D] border-[#457B9D]/30' : 'text-gray-600 border-gray-300'
                    }`}
                />
                <span className="ml-2 text-sm text-gray-700">Available Now</span>
              </label>
            </div>
          )}
        </div>

        {/* Apply Filters Button */}
        <div className="flex justify-end">
          <button
            onClick={applyFilters}
            disabled={!hasUnsavedChanges}
            className={`px-6 py-2 rounded-lg transition-colors font-medium ${hasUnsavedChanges
              ? 'bg-[#457B9D] text-white hover:bg-[#457B9D]/90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {renderActiveFilters()}
    </>
  );
};

export default MarketplaceFiltersSupp;