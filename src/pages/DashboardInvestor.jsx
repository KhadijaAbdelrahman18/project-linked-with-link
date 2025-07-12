import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import { DollarSign, TrendingUp, Briefcase, BarChart3, User, Settings, LogOut, Eye, Star, Users, X, Lightbulb, Target } from 'lucide-react';
import OpportunityDetailsModal from '../components/OpportunityDetailsModal';
import SettingsPage from '../components/SettingsPage';
import Support from './Support';
import TermsOfUse from '../components/TermsofUse';
import PrivacyPolicy from '../components/Privacy Policy';

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

const InvestorDashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState([]);
  const [filterStage, setFilterStage] = useState([]);
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(3000000);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [investTarget, setInvestTarget] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [portfolio, setPortfolio] = useState([
    { name: 'DataViz Inc', invested: 50000, value: 75000, roi: '+50%' },
    { name: 'EcoTech Solutions', invested: 25000, value: 30000, roi: '+20%' },
    { name: 'MedConnect', invested: 100000, value: 180000, roi: '+80%' },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const opportunities = [
    {
      name: 'TechFlow AI',
      industry: 'Technology',
      description: 'AI-powered workflow automation for enterprises',
      funded: 1200000,
      goal: 2000000,
      rating: 4.8,
      founder: 'Sarah Chen',
      location: 'San Francisco, CA',
      stage: 'Series A',
      investors: 23,
      minInvestment: 10000,
      roi: '+40%',
      longDescription: 'TechFlow AI is revolutionizing enterprise automation with advanced AI-driven solutions for workflow management, boosting productivity and reducing costs.'
    },
    {
      name: 'GreenEnergy Solutions',
      industry: 'Energy',
      description: 'Renewable energy solutions for residential properties',
      funded: 320000,
      goal: 500000,
      rating: 4.6,
      founder: 'Michael Rodriguez',
      location: 'Austin, TX',
      stage: 'Seed',
      investors: 15,
      minInvestment: 5000,
      roi: '+25%',
      longDescription: 'GreenEnergy Solutions provides affordable and scalable solar energy systems for homes, helping reduce carbon footprint and energy bills.'
    },
    {
      name: 'HealthTrack Pro',
      industry: 'Healthcare',
      description: 'Digital health monitoring platform for chronic diseases',
      funded: 800000,
      goal: 1500000,
      rating: 4.9,
      founder: 'Dr. Emily Watson',
      location: 'Boston, MA',
      stage: 'Pre-Series A',
      investors: 31,
      minInvestment: 20000,
      roi: '+60%',
      longDescription: 'HealthTrack Pro offers real-time health monitoring and analytics for patients with chronic illnesses, improving outcomes and reducing hospital visits.'
    }
  ];

  const industryOptions = ['Technology', 'Energy', 'Healthcare'];
  const stageOptions = ['Seed', 'Series A', 'Pre-Series A'];
  const filteredOpportunities = opportunities.filter(opp => {
    const industryMatch = filterIndustry.length === 0 || filterIndustry.includes(opp.industry);
    const stageMatch = filterStage.length === 0 || filterStage.includes(opp.stage);
    const fundingMatch = opp.goal >= filterMin && opp.goal <= filterMax;
    return industryMatch && stageMatch && fundingMatch;
  });

  const roleSpecificItems = {
    investor: [
      { id: 'startups', label: 'Startups', icon: Lightbulb },
      { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
      { id: 'deals', label: 'Deals', icon: Target }
    ],
    // ...
  };

  return (
    <>
      <DashboardHeader
        userEmail="investor@demo.com"
        userRole="investor"
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
        userRole="investor"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <SidebarToggle isOpen={!sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`} style={{ backgroundColor: '#EEF8F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, dfgh!</h1>
              <p className="text-gray-600 mb-8">Here's your investment overview</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Total Invested</span>
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$175K</div>
                </div>
                <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Portfolio Value</span>
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$285K</div>
                </div>
                <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Active Investments</span>
                    <Briefcase className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                </div>
                <div className="bg-white border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">ROI</span>
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">+62.8%</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-900"><span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>New investment opportunity: TechFlow AI <span className="ml-2 text-xs text-gray-500">2 hours ago</span></li>
                    <li className="flex items-center text-gray-900"><span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>MedConnect reached funding milestone <span className="ml-2 text-xs text-gray-500">1 day ago</span></li>
                    <li className="flex items-center text-gray-900"><span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>Portfolio valuation updated <span className="ml-2 text-xs text-gray-500">3 days ago</span></li>
                  </ul>
                </div>
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Investments</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">DataViz Inc</div>
                        <div className="text-xs text-gray-500">Invested: $50K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">$75K</div>
                        <div className="text-xs text-green-600 font-semibold">+50%</div>
              </div>
            </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">EcoTech Solutions</div>
                        <div className="text-xs text-gray-500">Invested: $25K</div>
          </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">$30K</div>
                        <div className="text-xs text-green-600 font-semibold">+20%</div>
          </div>
          </div>
                    <div className="flex items-center justify-between">
                          <div>
                        <div className="font-semibold text-gray-900">MedConnect</div>
                        <div className="text-xs text-gray-500">Invested: $100K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">$180K</div>
                        <div className="text-xs text-green-600 font-semibold">+80%</div>
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
            </>
          )}
          {activeTab === 'opportunities' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Investment Opportunities</h1>
              <p className="text-gray-600 mb-6">Discover promising startups and investment opportunities</p>
              <div className="flex items-center mb-6 gap-2">
                <input type="text" placeholder="Search opportunities..." className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <button className="px-4 py-2 border border-blue-200 rounded-lg text-blue-900 font-semibold hover:bg-blue-50" onClick={() => setShowFilters(true)}>Filters</button>
                        </div>
              {/* Filter Modal */}
              {showFilters && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                    <button onClick={() => setShowFilters(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
                    <h2 className="text-xl font-bold mb-4">Filter Opportunities</h2>
                    <div className="mb-4">
                      <div className="font-semibold mb-2">Industry</div>
                      <div className="flex flex-wrap gap-2">
                        {industryOptions.map(opt => (
                          <button key={opt} type="button" onClick={() => setFilterIndustry(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt])} className={`px-3 py-1 rounded-full border ${filterIndustry.includes(opt) ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-900 text-blue-900 bg-white hover:bg-blue-50'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-semibold mb-2">Stage</div>
                      <div className="flex flex-wrap gap-2">
                        {stageOptions.map(opt => (
                          <button key={opt} type="button" onClick={() => setFilterStage(prev => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt])} className={`px-3 py-1 rounded-full border ${filterStage.includes(opt) ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-900 text-blue-900 bg-white hover:bg-blue-50'}`}>{opt}</button>
                    ))}
                  </div>
                    </div>
                    <div className="mb-4">
                      <div className="font-semibold mb-2">Funding Goal</div>
                      <div className="flex items-center gap-2">
                        <input type="number" value={filterMin} min={0} max={filterMax} onChange={e => setFilterMin(Number(e.target.value))} className="w-20 px-2 py-1 border rounded" />
                        <span>-</span>
                        <input type="number" value={filterMax} min={filterMin} max={5000000} onChange={e => setFilterMax(Number(e.target.value))} className="w-20 px-2 py-1 border rounded" />
            </div>
                  </div>
                    <button onClick={() => setShowFilters(false)} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Apply Filters</button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{opp.name}</h2>
                        <div className="text-sm text-gray-500">{opp.industry}</div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{opp.stage}</span>
                    </div>
                    <div className="mb-2 text-gray-700">{opp.description}</div>
                    <div className="mb-2 text-xs text-gray-500">Funding Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${Math.min(100, (opp.funded / opp.goal) * 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>${opp.funded.toLocaleString()} / ${opp.goal.toLocaleString()}</span>
                      <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{opp.investors} investors</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center text-yellow-500 text-sm font-semibold"><Star className="w-4 h-4 mr-1" />{opp.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">Founder: {opp.founder}<br />{opp.location}</div>
                    <div className="flex gap-2 mt-4">
                      <button
                        className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                        onClick={() => { setInvestTarget(opp); setShowInvestModal(true); }}
                      >
                        <DollarSign className="w-4 h-4" /> Invest
                      </button>
                      <button onClick={() => { setSelectedOpportunity(opp); setShowOpportunityModal(true); }} className="p-2 border border-blue-200 rounded-lg text-blue-900 hover:bg-blue-50 flex items-center justify-center">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <OpportunityDetailsModal opportunity={selectedOpportunity} isOpen={showOpportunityModal} onClose={() => setShowOpportunityModal(false)} />
            </div>
          )}
          {activeTab === 'portfolio' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">My Portfolio</h1>
              <p className="text-gray-600 mb-6">Track your investments and performance</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Overview</h2>
                  {portfolio.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 px-2 border-b last:border-0 border-gray-100">
                      <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">Invested: ${item.invested.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">${item.value.toLocaleString()}</div>
                        <div className="text-xs text-green-600 font-semibold">{item.roi}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Summary</h2>
                  <div className="flex flex-col gap-2 text-right">
                    <div className="flex justify-between"><span>Total Portfolio Value</span><span className="font-bold">${portfolio.reduce((sum, i) => sum + i.value, 0).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Total Invested</span><span className="font-bold">${portfolio.reduce((sum, i) => sum + i.invested, 0).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Total Gains</span><span className="font-bold text-green-600">+${(portfolio.reduce((sum, i) => sum + (i.value - i.invested), 0)).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Overall ROI</span><span className="font-bold text-green-600">{portfolio.length ? `+${Math.round((portfolio.reduce((sum, i) => sum + (i.value - i.invested), 0) / portfolio.reduce((sum, i) => sum + i.invested, 0)) * 100)}%` : '0%'}</span></div>
                  </div>
                </div>
                  </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <SettingsPage user={{
              fullName: 'dfgh',
              email: 'investor@demo.com',
              bio: 'fgh',
              location: 'ccgh',
              phone: '',
              company: '',
              website: ''
            }} role="investor" />
          )}
          {activeTab === 'support' && (
            <Support userRole="investor" setActiveTab={setActiveTab} />
          )}
          {activeTab === 'terms' && (
            <TermsOfUse onBack={() => setActiveTab('support')} />
          )}
          {activeTab === 'privacy' && (
            <PrivacyPolicy onBack={() => setActiveTab('support')} />
          )}
          {/* Investment Modal */}
          {showInvestModal && investTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                <button onClick={() => setShowInvestModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
                <h2 className="text-xl font-bold mb-4">Invest in {investTarget.name}</h2>
                <div className="mb-4">
                  <div className="text-gray-700 mb-2">Minimum Investment: <span className="font-semibold">${investTarget.minInvestment.toLocaleString()}</span></div>
                  <input
                    type="number"
                    min={investTarget.minInvestment}
                    value={investAmount}
                    onChange={e => setInvestAmount(e.target.value)}
                    placeholder={`Enter amount (min $${investTarget.minInvestment})`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button onClick={() => setShowInvestModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button>
                  <button
                    onClick={() => {
                      setShowInvestModal(false);
                      setInvestAmount('');
                      setPortfolio(prev => [...prev, { name: investTarget.name, invested: Number(investAmount), value: Number(investAmount) * 1.5, roi: '+50%' }]);
                    }}
                    disabled={!investAmount || Number(investAmount) < investTarget.minInvestment}
                    className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 disabled:opacity-50"
                  >
                    Invest
                  </button>
            </div>
          </div>
        </div>
          )}
        </div>
      </main>
    </>
  );
};

export default InvestorDashboard; 