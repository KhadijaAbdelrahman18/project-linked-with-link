import React from 'react';
import { Search, User, ChevronDown } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const DashboardHeader = ({
  userEmail,
  userRole,
  onProfileMenu,
  showProfileMenu,
  children,
  searchPlaceholder = 'Search for anything...'
}) => {
  // Role color for avatar
  const roleBg = userRole === 'entrepreneur' ? 'bg-teal-500' : userRole === 'supplier' ? 'bg-purple-500' : 'bg-blue-500';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center py-3 px-6 w-full">
        {/* Logo */}
        <div className="flex items-center min-w-[48px]">
          <img
            src="/namelogo.png"
            alt="Logo"
            className="h-9 w-auto object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4 min-w-[120px] justify-end">
          {/* Notifications */}
          <NotificationDropdown userId={1} />

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={onProfileMenu}
              className="flex items-center space-x-2 p-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <div className={`w-9 h-9 ${roleBg} rounded-full flex items-center justify-center`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
