import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SelectRolePage from "./pages/SelectRolePage"
import CompleteProfileEntrepreneur from "./pages/CompleteProfileEntrepreneur"
import CompleteProfileInvestor from "./pages/CompleteProfileInvestor"
import CompleteProfileSupplier from "./pages/CompleteProfileSupplier"
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard"
import DashboardInvestor from "./pages/DashboardInvestor"
import DashboardSupplier from "./pages/DashboardSupplier"
import Support from "./pages/Support"
import TermsOfUse from "./components/TermsofUse"
import PrivacyPolicy from "./components/Privacy Policy"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/select-role" element={<SelectRolePage />} />
        <Route path="/complete-profile/entrepreneur" element={<CompleteProfileEntrepreneur />} />
        <Route path="/complete-profile/investor" element={<CompleteProfileInvestor />} />
        <Route path="/complete-profile/supplier" element={<CompleteProfileSupplier />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        {/* Entrepreneur Dashboard Routes */}
        <Route path="/dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/profile" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/investors" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/funding" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/projects" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/partnerships" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/messages" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/documents" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/calendar" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/analytics" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/settings" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/my-business" element={<EntrepreneurDashboard />} />
        <Route path="/dashboard/entrepreneur/my-deals" element={<EntrepreneurDashboard />} />
        
        {/* Investor Dashboard Routes */}
        <Route path="/dashboard/investor" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/profile" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/portfolio" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/deals" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/startups" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/due-diligence" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/messages" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/documents" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/calendar" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/analytics" element={<DashboardInvestor />} />
        <Route path="/dashboard/investor/settings" element={<DashboardInvestor />} />
        
        {/* Supplier Dashboard Routes */}
        <Route path="/dashboard/supplier" element={<DashboardSupplier />} />
        <Route path="/dashboard/entrepreneur/support" element={<Support userRole="entrepreneur" />} />
        <Route path="/dashboard/investor/support" element={<Support userRole="investor" />} />
        <Route path="/dashboard/supplier/support" element={<Support userRole="supplier" />} />
        <Route path="/dashboard/supplier/profile" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/clients" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/services" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/orders" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/revenue" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/messages" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/documents" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/calendar" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/analytics" element={<DashboardSupplier />} />
        <Route path="/dashboard/supplier/settings" element={<DashboardSupplier />} />
      </Routes>
    </Router>
  )
}

export default App