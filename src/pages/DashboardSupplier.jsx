import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AIChat from '../components/AIChat';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import DashboardHeader from '../components/DashboardHeader';
import { User, Settings, LogOut } from 'lucide-react';
import Support from './Support';
import TermsOfUse from '../components/TermsofUse';
import PrivacyPolicy from '../components/Privacy Policy';
import MarketplaceSupp from '../components/Marketplace supp';
import OandR from '../components/Orders';

// Sidebar toggle button with notched arrow style
function SidebarToggle({ isOpen, toggleSidebar }) {
  return (
    <button
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className={`
        fixed z-50
        ${isOpen ? 'left-64' : 'left-0'}
        top-1/2 -translate-y-1/2
        transition-all
        shadow
        ${isOpen ? 'rounded-r-lg' : 'rounded-r-lg'}
        w-6 h-12 flex items-center justify-center
        outline-none
      `}
      style={{
        background: isOpen ? '#457B9D' : '#457B9D',
        transition: 'background 0.2s',
        transform: isOpen
          ? 'translateY(-50%)'
          : 'translate(-80%, -50%)',
      }}
      onMouseOver={e => e.currentTarget.style.background = '#27406b'}
      onMouseOut={e => e.currentTarget.style.background = '#457B9D'}
    >
      <span
        className={`
          block w-4 h-8
          ${isOpen ? '' : 'rotate-180'}
          relative
        `}
        style={{
          clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
          background: 'white',
        }}
      ></span>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [expandedDesc, setExpandedDesc] = useState({});

  const products = [
    {
      name: 'Premium Office Chairs',
      category: 'Furniture',
      status: 'Active',
      price: 299,
      stock: 45,
      orders: 23,
      rating: 4.8,
    },
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      status: 'Active',
      price: 149,
      stock: 120,
      orders: 67,
      rating: 4.6,
    },
    {
      name: 'Standing Desk',
      category: 'Furniture',
      status: 'Low Stock',
      price: 599,
      stock: 8,
      orders: 15,
      rating: 4.9,
    },
  ];

  const requests = [
    {
      id: 1,
      details: 'Premium Office Chairs, Product, 10 Creating a user-friendly and responsive marketplace interface is essential for enhancing the overall customer experience. A well-designed layout with intuitive navigation, modals for product and service entries, and efficient pagination can significantly improve usability and engagement. Implementing controlled components ensures that the app doesn’t rerender unnecessarily, avoiding white screens or performance issues. Clear form inputs, consistent styling, and accessible buttons contribute to a seamless user interaction. Additionally, modal popups allow users to focus on specific tasks without leaving the current page context. All of these features, when combined thoughtfully, result in a professional interface that supports scalability, accessibility, and performance across devices and screen sizes hhh',
      date: '2023-10-10',
      requester: 'John Doe',
      company: 'TechCorp',
    },
    {
      id: 2,
      details: 'Wireless Headphones, Product, 5',
      date: '2023-10-12',
      requester: 'Jane Smith',
      company: 'Innovate LLC',
    },
    {
      id: 3,
      details: 'Standing Desk, Product, 8',
      date: '2023-10-15',
      requester: 'Emily Johnson',
      company: 'Creative Agency',
    },
  ];

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Helper to render content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, John Doe John Doe!</h1>
            <p className="text-gray-600 mb-8">Here's your business overview</p>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Total Revenue</div>
                <div className="text-2xl font-bold text-gray-900">$125K</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Active Products</div>
                <div className="text-2xl font-bold text-gray-900">24</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">156</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Customer Rating</div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
              </div>
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div>
                      <div className="font-semibold text-gray-900">ORD-001</div>
                      <div className="text-xs text-gray-500">TechCorp Inc</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$2,990</div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">Processing</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div>
                      <div className="font-semibold text-gray-900">ORD-002</div>
                      <div className="text-xs text-gray-500">StartupHub</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$1,797</div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Shipped</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div>
                      <div className="font-semibold text-gray-900">ORD-003</div>
                      <div className="text-xs text-gray-500">Creative Agency</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$3,725</div>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Top Products */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Premium Office Chairs</div>
                      <div className="text-xs text-gray-500">23 orders</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$299</div>
                      <div className="flex items-center text-yellow-500 text-xs font-bold"><span className="mr-1">4.8</span>★</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Wireless Headphones</div>
                      <div className="text-xs text-gray-500">67 orders</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$149</div>
                      <div className="flex items-center text-yellow-500 text-xs font-bold"><span className="mr-1">4.6</span>★</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Standing Desk</div>
                      <div className="text-xs text-gray-500">15 orders</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-900 font-semibold">$599</div>
                      <div className="flex items-center text-yellow-500 text-xs font-bold"><span className="mr-1">4.9</span>★</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        // Use requests as posts for products
        return (
          <div className="">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Posts</h1>
                <p className="text-gray-600">View and manage posts from entrepreneurs</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.filter(r => r.details.toLowerCase().includes('product')).map((req, idx) => {
                // Description logic
                const desc = req.details;
                const wordCount = desc.split(/\s+/).length;
                const isLong = wordCount > 100;
                const isExpanded = expandedDesc[req.id];
                return (
                  <div key={req.id || idx} className={`bg-white rounded-2xl shadow-lg border border-[#e3e8f0] p-6 hover:shadow-xl transition-all duration-300 flex flex-col${!isExpanded ? ' min-h-[320px]' : ''}`}>
                    <h3 className="text-xl font-extrabold text-[#10213a] mb-1 tracking-tight">{req.details.split(',')[0]}</h3>
                    <p className="text-xs font-bold text-[#374151] mb-1 tracking-wider">Category: <span className="text-[#1a202c] font-semibold">Product</span></p>
                    <p className="text-xs font-bold text-[#374151] mb-1 tracking-wider">Type: <span className="text-[#1a202c] font-semibold">Product</span></p>
                    <p className="text-xs font-bold text-[#374151] mb-1 tracking-wider">Quantity: <span className="text-[#1a202c] font-semibold">{req.details.match(/\d+/) ? req.details.match(/\d+/)[0] : 'N/A'}</span></p>
                    <p className="text-xs font-bold text-[#374151] mb-1 tracking-wider">Deadline: <span className="text-[#1a202c] font-semibold">{req.date}</span></p>
                    {/* Attachments placeholder */}
                    <p className="text-xs font-bold text-[#374151] mb-1 tracking-wider">Attachments: <span className="text-[#1a202c] font-semibold">None</span></p>
                    <div className="mt-2 text-xs text-[#374151]">Request by: <span className="font-semibold text-[#10213a]">{req.requester}</span> ({req.company})</div>
                    <div className="mt-3 mb-2 flex flex-col">
                      <span
                        className={`inline-block max-w-full align-top mr-2 ${!isExpanded ? 'line-clamp-1' : ''}`}
                        style={!isExpanded ? {
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '1.3em',
                          maxWidth: '100%',
                          color: '#10213a'
                        } : { color: '#10213a' }}
                      >
                        {desc}
                        {isExpanded && (
                          <button
                            className="ml-2 text-xs font-semibold underline whitespace-nowrap"
                            style={{ color: '#457b9b' }}
                            onClick={() => setExpandedDesc(prev => ({ ...prev, [req.id]: false }))}
                          >
                            See less
                          </button>
                        )}
                      </span>
                      {!isExpanded && (
                        <button
                          className="text-xs font-semibold underline whitespace-nowrap mt-1 self-start"
                          style={{ color: '#457b9b' }}
                          onClick={() => setExpandedDesc(prev => ({ ...prev, [req.id]: true }))}
                        >
                          See more
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-colors shadow-md"
                        style={{ background: '#457b9b' }}
                        onClick={() => {
                          setToastMsg(`Offer was sent to ${req.requester}`);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }}
                      >
                        Offer
                      </button>
                    </div>
                  </div>
                );
              })}
              {showToast && (
                <div
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center border border-[#457b9b] px-6 py-3 rounded-lg shadow-lg text-lg font-semibold z-50 animate-fade-in-out"
                  style={{ background: 'rgba(69, 123, 155, 0.12)', color: '#457b9b', minWidth: 320 }}
                >
                  {/* <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="#457b9b" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
                  <span>{toastMsg}</span>
                  <button
                    className="ml-auto text-2xl leading-none font-bold hover:opacity-70"
                    style={{ color: '#457b9b', background: 'none', border: 'none' }}
                    onClick={() => setShowToast(false)}
                    aria-label="Close notification"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'orders':
        return <OandR />;
      case 'customers':
        return (
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Customers</h1>
            <p className="text-gray-600 mb-6">Manage your customers and view their order history</p>
            <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer List</h2>
                  <div className="space-y-4">
                {/* Customer 1 */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-4">
                  <div>
                    <div className="font-semibold text-gray-900">TechCorp Inc</div>
                    <div className="text-xs text-gray-500">John Smith &nbsp; | &nbsp; john.smith@techcorp.com</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-900 font-semibold">12 orders</div>
                    <button className="border border-blue-200 rounded-lg p-2 hover:bg-blue-50 transition-colors">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                    </button>
                  </div>
                </div>
                {/* Customer 2 */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-4">
                          <div>
                    <div className="font-semibold text-gray-900">StartupHub</div>
                    <div className="text-xs text-gray-500">Sarah Lee &nbsp; | &nbsp; sarah.lee@startuphub.com</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-900 font-semibold">7 orders</div>
                    <button className="border border-blue-200 rounded-lg p-2 hover:bg-blue-50 transition-colors">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                    </button>
                            </div>
                          </div>
                {/* Customer 3 */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-4">
                  <div>
                    <div className="font-semibold text-gray-900">Creative Agency</div>
                    <div className="text-xs text-gray-500">Michael Brown &nbsp; | &nbsp; michael.brown@creativeagency.com</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-900 font-semibold">25 orders</div>
                    <button className="border border-blue-200 rounded-lg p-2 hover:bg-blue-50 transition-colors">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                    </button>
                  </div>
                          </div>
                        </div>
                        </div>
                      </div>
        );
      case 'profile':
        return <div className="p-8"><h2 className="text-2xl font-bold mb-4">Profile</h2><p>Update your supplier profile here.</p></div>;
      case 'messages':
        return <div className="p-8"><h2 className="text-2xl font-bold mb-4">Messages</h2><p>Check your messages here.</p></div>;
      case 'settings':
        return (
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
            <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>
            {/* Profile Information */}
            <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm max-w-4xl mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center">
                <span className="mr-2">👤</span> Profile Information
              </h2>
              <p className="text-gray-600 mb-6">Update your personal information and profile details</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value="John Doe John Doe" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value="investor@demo.com" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea value="jhgf" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={2} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" value="aswan" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" value="+201234567899" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                      </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="text" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                      </div>
                <div>
                  <button type="submit" className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold text-base hover:bg-slate-900 transition-colors">Save Changes</button>
                </div>
              </form>
            </div>
            {/* Account Overview & Appearance & Danger Zone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Account Overview</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">J</div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">John Doe John Doe</div>
                      <div className="text-gray-600 text-sm">investor@demo.com</div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mt-2">Supplier</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-1"><span className="mr-2">📍</span>aswan</div>
                  <div className="flex items-center text-gray-500 text-sm"><span className="mr-2">🏢</span>Not specified</div>
                </div>
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Appearance</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Light</option>
                      <option>Dark</option>
                    </select>
            </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                  </div>
                </div>
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
                  <button className="w-full border border-blue-200 rounded-lg px-4 py-2 mb-3 text-blue-900 font-semibold hover:bg-blue-50 transition-colors">Export Data</button>
                  <button className="w-full bg-red-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-600 transition-colors">Delete Account</button>
                </div>
              </div>
              {/* Notification Preferences & Security Settings */}
              <div>
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><span className="mr-2">🔔</span> Notification Preferences</h2>
                  <p className="text-gray-600 mb-4">Choose what notifications you want to receive</p>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">Email Notifications</div>
                      <div className="text-xs text-gray-500">Receive updates via email</div>
                    </div>
                    <input type="checkbox" checked readOnly className="form-switch accent-slate-800 h-5 w-10" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">Investment Updates</div>
                      <div className="text-xs text-gray-500">Get notified about investment opportunities</div>
                    </div>
                    <input type="checkbox" checked readOnly className="form-switch accent-slate-800 h-5 w-10" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">Messages</div>
                      <div className="text-xs text-gray-500">Notifications for new messages</div>
                    </div>
                    <input type="checkbox" checked readOnly className="form-switch accent-slate-800 h-5 w-10" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">Marketing Communications</div>
                      <div className="text-xs text-gray-500">Receive marketing emails and updates</div>
                    </div>
                    <input type="checkbox" className="form-switch accent-cyan-400 h-5 w-10" />
                  </div>
                </div>
                <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><span className="mr-2">🔒</span> Security Settings</h2>
                  <p className="text-gray-600 mb-4">Manage your account security and privacy</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input type="password" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                        <div className="text-xs text-gray-500">Add an extra layer of security</div>
                      </div>
                      <input type="checkbox" className="form-switch accent-cyan-400 h-5 w-10" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold text-base hover:bg-slate-900 transition-colors">Update Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Analytics</h1>
            <p className="text-gray-600 mb-6">Detailed insights into your business performance</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Performance Card */}
              <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sales Performance</h2>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between"><span>This Month</span><span>$28,500</span></div>
                  <div className="flex justify-between"><span>Last Month</span><span>$24,200</span></div>
                  <div className="flex justify-between"><span>Growth</span><span className="text-green-600 font-semibold">+17.8%</span></div>
                  <div className="flex justify-between"><span>Best Product</span><span>Wireless Headphones</span></div>
                </div>
              </div>
              {/* Business Metrics Card */}
              <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Metrics</h2>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between"><span>Conversion Rate</span><span>12.5%</span></div>
                  <div className="flex justify-between"><span>Avg Order Value</span><span>$801</span></div>
                  <div className="flex justify-between"><span>Customer Retention</span><span>85%</span></div>
                  <div className="flex justify-between"><span>Active Since</span><span>Mar 2023</span></div>
                </div>
              </div>
            </div>
          </div>
        );
        case 'add product':
        return (
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Add New Product</h1>
            <p className="text-gray-600 mb-6">Add a new product to your catalog</p>
            <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Product Information</h2>
              <p className="text-gray-600 mb-6">Fill in the details for your new product</p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input type="text" placeholder="e.g., Premium Office Chair" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" placeholder="e.g., Furniture" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="number" placeholder="299.00" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input type="number" placeholder="50" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea placeholder="Describe your product..." className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                  <input type="file" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <button type="submit" className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold text-base hover:bg-slate-900 transition-colors">
                    <span className="text-xl mr-2">+</span> Add Product
                  </button>
                </div>
              </form>
          </div>
        </div>
        );
      case 'support':
        return <Support userRole="supplier" setActiveTab={setActiveTab} />;
        case 'my-business':
        return <MarketplaceSupp userRole="supplier" setActiveTab={setActiveTab} />;
      case 'terms':
        return <TermsOfUse onBack={() => setActiveTab('support')} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setActiveTab('support')} />;
      default:
        return null;
    }
  };

  return (
    <>
      <DashboardHeader
        userEmail="supplier@demo.com"
        userRole="supplier"
        onProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
        showProfileMenu={showProfileMenu}
      >
        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <User className="w-4 h-4 mr-2" />
          Profile
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </a>
        <hr className="my-1" />
        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </a>
      </DashboardHeader>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole="supplier"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <SidebarToggle isOpen={!sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`} style={{ backgroundColor: '#EEF8F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </main>
    </>
  );
};

export default SupplierDashboard;