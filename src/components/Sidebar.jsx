import React from 'react';
import {
  BarChart3,
  Users,
  Target,
  Briefcase,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Home,
  TrendingUp,
  Package,
  Lightbulb,
  Bell,
  Store,
  UserCheck,
  HelpCircle,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole, collapsed = false, onToggleCollapse }) => {
  const getMenuItems = () => {
    const commonItems = [
      { id: 'overview', label: 'Overview', icon: Home }
    ];

    const supportItem = { id: 'support', label: 'Support', icon: HelpCircle };

    const roleSpecificItems = {
      entrepreneur: [
        { id: 'my-business', label: 'My Business', icon: Briefcase },
        { id: 'milestones', label: 'Milestones', icon: BarChart3 },
        { id: 'marketplace', label: 'Marketplace', icon: Store },
        { id: 'my-deals', label: 'My Deals', icon: UserCheck },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        supportItem
      ],
      investor: [
        { id: 'opportunities', label: 'Browse Startups', icon: Target },
        { id: 'portfolio', label: 'My Deals', icon: Briefcase },
        supportItem
      ],
      supplier: [
        { id: 'products', label: 'Posts', icon: Package },
        { id: 'my-business', label: 'My Business', icon: Briefcase },

        { id: 'orders', label: 'Orders & Requests', icon: ClipboardList },
        { id: 'customers', label: 'Customers', icon: Users },
        supportItem
      ]
    };

    const settingsItem = { id: 'settings', label: 'Settings', icon: Settings };

    return [
      ...commonItems, // Overview first
      ...roleSpecificItems[userRole], // Role specific items + Support
      settingsItem // Settings last
    ];
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'entrepreneur': return 'text-teal-600';
      case 'investor': return 'text-blue-600';
      case 'supplier': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleBg = () => {
    switch (userRole) {
      case 'entrepreneur': return 'bg-teal-500';
      case 'investor': return 'bg-blue-500';
      case 'supplier': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'entrepreneur': return Lightbulb;
      case 'investor': return TrendingUp;
      case 'supplier': return Package;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white shadow-lg border-r border-gray-200 z-40 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
      style={{ fontFamily: 'Georgia, serif' }}>
      {/* Toggle Button (removed, now handled outside) */}
      {/* Navigation Menu */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {getMenuItems().map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} space-x-3 px-3 py-3 rounded-lg text-left transition-colors font-bold ${activeTab === item.id
                  ? 'text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
                style={activeTab === item.id ? { backgroundColor: '#457B9D' } : {}}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="font-bold">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout */}
      <div className={`p-2 border-t border-gray-100 ${collapsed ? 'flex justify-center' : ''}`}>
        <button className={`flex items-center ${collapsed ? 'justify-center' : ''} w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-bold`} onClick={() => { window.location.href = '/'; }}>
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-bold ml-3">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;