import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { 
  Home, 
  Users, 
  Building, 
  TrendingUp, 
  Target, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell,
  HelpCircle,
  Search,
  MessageCircle,
  FileText,
  Calendar,
  BarChart3,
  Wallet,
  Users2,
  Briefcase,
  Award
} from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function DashboardSidebar({ userType = "entrepreneur" }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const getNavItems = () => {
    const baseItems = [
      { name: "Dashboard", icon: Home, path: `/dashboard/${userType}`, badge: null },
      { name: "Profile", icon: User, path: `/dashboard/${userType}/profile`, badge: null },
      { name: "Messages", icon: MessageCircle, path: `/dashboard/${userType}/messages`, badge: "3" },
      { name: "Documents", icon: FileText, path: `/dashboard/${userType}/documents`, badge: null },
      { name: "Calendar", icon: Calendar, path: `/dashboard/${userType}/calendar`, badge: null },
      { name: "Analytics", icon: BarChart3, path: `/dashboard/${userType}/analytics`, badge: null },
      { name: "Settings", icon: Settings, path: `/dashboard/${userType}/settings`, badge: null },
    ]

    if (userType === "entrepreneur") {
      return [
        ...baseItems.slice(0, 1),
        { name: "My Business", icon: Building, path: `/dashboard/${userType}/my-business`, badge: null },
        { name: "Investors", icon: Users, path: `/dashboard/${userType}/investors`, badge: "12" },
        { name: "Funding", icon: Wallet, path: `/dashboard/${userType}/funding`, badge: null },
        { name: "Projects", icon: Building, path: `/dashboard/${userType}/projects`, badge: "3" },
        { name: "Partnerships", icon: Users2, path: `/dashboard/${userType}/partnerships`, badge: null },
        ...baseItems.slice(1)
      ]
    } else if (userType === "investor") {
      return [
        ...baseItems.slice(0, 1),
        { name: "Portfolio", icon: Briefcase, path: `/dashboard/${userType}/portfolio`, badge: "8" },
        { name: "Deals", icon: TrendingUp, path: `/dashboard/${userType}/deals`, badge: "5" },
        { name: "Startups", icon: Building, path: `/dashboard/${userType}/startups`, badge: "24" },
        { name: "Due Diligence", icon: FileText, path: `/dashboard/${userType}/due-diligence`, badge: "2" },
        ...baseItems.slice(1)
      ]
    } else if (userType === "supplier") {
      return [
        ...baseItems.slice(0, 1),
        { name: "Clients", icon: Users, path: `/dashboard/${userType}/clients`, badge: "18" },
        { name: "Services", icon: Briefcase, path: `/dashboard/${userType}/services`, badge: "8" },
        { name: "Orders", icon: FileText, path: `/dashboard/${userType}/orders`, badge: "15" },
        { name: "Revenue", icon: TrendingUp, path: `/dashboard/${userType}/revenue`, badge: null },
        ...baseItems.slice(1)
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  const handleLogout = () => {
    // Add logout logic here
    navigate("/")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-md"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-16 h-[calc(100vh-64px)] bg-white shadow-lg z-30 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#457B9D] text-white' 
                    : 'text-[#457B9D] hover:bg-[#F1FAEE]'
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "default"}
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Support & Logout */}
        <div className="p-4 border-t space-y-2">
          <Link
            to={`/dashboard/${userType}/support`}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-[#F1FAEE] ${location.pathname === `/dashboard/${userType}/support` ? 'bg-[#457B9D] text-white' : 'text-[#457B9D]'}`}
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            {!isCollapsed && "Support"}
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#457B9D] hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main content margin for desktop */}
      <div className={`${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`} />
    </>
  )
}