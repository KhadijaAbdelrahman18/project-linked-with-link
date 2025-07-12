import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Edit3, 
  Save, 
  X, 
  User, 
  Building2, 
  TrendingUp, 
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  Building,
  Star
} from 'lucide-react';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';
import { Eye } from 'lucide-react';

// ServiceCard and ServiceDetailsModal (inline for now)
const ServiceCard = ({ service, onViewDetails }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
        <p className="text-sm text-gray-500">{service.category}</p>
      </div>
      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{service.status}</span>
    </div>
    <div className="mb-6">
      <span className="text-2xl font-bold text-gray-900">${service.price}</span>
    </div>
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-gray-600"><span className="font-medium">Clients:</span> {service.clients}</div>
      <div className="text-sm text-gray-600"><span className="font-medium">Projects:</span> {service.projects}</div>
      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium text-gray-900">{service.rating}</span></div>
    </div>
    <div className="flex items-center gap-3">
      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200">
        <Edit3 className="w-4 h-4" />
        <span className="text-sm font-medium">Edit</span>
      </button>
      <button onClick={() => onViewDetails(service)} className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200">
        <Eye className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ServiceDetailsModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.category}</p>
            <div className="mb-4"><span className="font-semibold">Status:</span> {service.status}</div>
            <div className="mb-4"><span className="font-semibold">Price:</span> ${service.price}</div>
            <div className="mb-4"><span className="font-semibold">Clients:</span> {service.clients}</div>
            <div className="mb-4"><span className="font-semibold">Projects:</span> {service.projects}</div>
            <div className="mb-4"><span className="font-semibold">Rating:</span> {service.rating}</div>
            <div className="mb-4"><span className="font-semibold">Description:</span> {service.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyBusiness = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "EcoTech Solutions",
    description: "Revolutionary sustainable technology platform for smart cities",
    industry: "Clean Technology",
    stage: "Growth Stage",
    location: "San Francisco, CA",
    website: "https://ecotechsolutions.com",
    phone: "+1 (555) 123-4567",
    email: "contact@ecotechsolutions.com",
    fundingRaised: 2500000,
    fundingGoal: 5000000,
    teamSize: 15,
    founded: "2021"
  });

  const [editableData, setEditableData] = useState(projectData);
  const [activeTab, setActiveTab] = useState('products');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Mock project milestones data - in real app, this would be fetched from API
  const projectMilestones = [
    {
      id: 1,
      type: 'Product',
      stage: 'MVP',
      title: 'MVP Development',
      description: 'Built and tested minimum viable product',
      targetDate: '2024-07-01',
      status: 'Completed',
      files: []
    },
    {
      id: 2,
      type: 'Service',
      stage: 'Growth',
      title: 'First Customer Acquisition',
      description: 'Onboard first 10 paying customers',
      targetDate: '2024-08-15',
      status: 'In Progress',
      files: []
    },
    {
      id: 3,
      type: 'Funding',
      stage: 'Scaling',
      title: 'Series A Funding',
      description: 'Raise $2M Series A round',
      targetDate: '2024-09-30',
      status: 'Planned',
      files: []
    },
    {
      id: 4,
      type: 'Partnership',
      stage: 'Growth',
      title: 'Market Expansion',
      description: 'Expand to 3 new cities',
      targetDate: '2024-12-01',
      status: 'Planned',
      files: []
    }
  ];

  const handleSave = () => {
    setProjectData(editableData);
    setIsEditing(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCancel = () => {
    setEditableData(projectData);
    setIsEditing(false);
  };

  const progressPercentage = (projectData.fundingRaised / projectData.fundingGoal) * 100;

  // Calculate milestones progress
  const completedMilestones = projectMilestones.filter(m => m.status === 'Completed').length;
  const milestonesProgress = projectMilestones.length > 0 ? Math.round((completedMilestones / projectMilestones.length) * 100) : 0;

  // Status badge component
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">In Progress</Badge>;
      case 'Planned':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Planned</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{status}</Badge>;
    }
  };

  const partners = [
    {
      id: 1,
      name: "GreenTech Ventures",
      type: "Investor",
      avatar: "/placeholder-logo.png",
      status: "Active",
      dealValue: "$500K",
      lastContact: "2 days ago"
    },
    {
      id: 2,
      name: "SolarTech Supplies",
      type: "Supplier",
      avatar: "/placeholder-logo.png",
      status: "Active",
      dealValue: "$75K",
      lastContact: "1 week ago"
    },
    {
      id: 3,
      name: "Clean Energy Capital",
      type: "Investor",
      avatar: "/placeholder-logo.png",
      status: "Pending",
      dealValue: "$1.2M",
      lastContact: "3 days ago"
    }
  ];

  const products = [
    { name: 'Premium Office Chairs', category: 'Furniture', status: 'Active', price: 299, stock: 45, orders: 23, rating: 4.8 },
    { name: 'Wireless Headphones', category: 'Electronics', status: 'Active', price: 149, stock: 120, orders: 67, rating: 4.6 },
    { name: 'Standing Desk', category: 'Furniture', status: 'Low Stock', price: 599, stock: 8, orders: 15, rating: 4.9 },
  ];
  const services = [
    { name: 'UI/UX Design', category: 'Design', status: 'Active', price: 1200, clients: 12, projects: 18, rating: 4.7, description: 'Professional UI/UX design services for web and mobile.' },
    { name: 'Legal Consulting', category: 'Legal', status: 'Active', price: 800, clients: 7, projects: 10, rating: 4.9, description: 'Legal advice and contract review for startups.' },
    { name: 'Marketing Strategy', category: 'Marketing', status: 'Active', price: 1500, clients: 15, projects: 22, rating: 4.8, description: 'Comprehensive marketing strategy and execution.' },
  ];

  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };
  const handleViewServiceDetails = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };
  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Project Info Card */}
      <Card className="border-2 border-[#457B9D]">
        <CardHeader className="bg-gradient-to-r from-[#457B9D] to-[#5A9BC8] text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Project Information</CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-white border-white hover:bg-white hover:text-[#457B9D]"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="text-white border-white hover:bg-green-600 hover:border-green-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-white border-white hover:bg-red-600 hover:border-red-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Project Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editableData.name}
                    onChange={(e) => setEditableData({...editableData, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900 mt-1">{projectData.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={editableData.description}
                    onChange={(e) => setEditableData({...editableData, description: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{projectData.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    Industry
                  </Label>
                  {isEditing ? (
                    <Input
                      id="industry"
                      value={editableData.industry}
                      onChange={(e) => setEditableData({...editableData, industry: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{projectData.industry}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stage" className="text-sm font-medium text-gray-700">
                    Stage
                  </Label>
                  {isEditing ? (
                    <div className="relative mt-1">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#457B9D]" />
                      <select
                        id="stage"
                        value={editableData.stage}
                        onChange={(e) => setEditableData({...editableData, stage: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-[#A8DADC] rounded-lg focus:ring-2 focus:ring-[#457B9D] focus:border-transparent appearance-none"
                      >
                        <option value="">Select business stage</option>
                        <option value="Idea Stage">Idea Stage</option>
                        <option value="MVP/Prototype">MVP/Prototype</option>
                        <option value="Early Stage Startup">Early Stage Startup</option>
                        <option value="Growth Stage">Growth Stage</option>
                        <option value="Established Business">Established Business</option>
                      </select>
                    </div>
                  ) : (
                    <Badge variant="secondary" className="mt-1">{projectData.stage}</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editableData.location}
                      onChange={(e) => setEditableData({...editableData, location: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {projectData.location}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="founded" className="text-sm font-medium text-gray-700">
                    Founded
                  </Label>
                  {isEditing ? (
                    <Input
                      id="founded"
                      value={editableData.founded}
                      onChange={(e) => setEditableData({...editableData, founded: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {projectData.founded}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={editableData.website}
                    onChange={(e) => setEditableData({...editableData, website: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Globe className="w-4 h-4 mr-1 text-gray-600" />
                    <a 
                      href={projectData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#457B9D] hover:underline flex items-center"
                    >
                      {projectData.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editableData.phone}
                      onChange={(e) => setEditableData({...editableData, phone: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      {projectData.phone}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      value={editableData.email}
                      onChange={(e) => setEditableData({...editableData, email: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center mt-1 text-gray-600">
                      <Mail className="w-4 h-4 mr-1" />
                      {projectData.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Funding Progress */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Funding Progress</h3>
              <span className="text-sm text-gray-600">
                ${projectData.fundingRaised.toLocaleString()} / ${projectData.fundingGoal.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{progressPercentage.toFixed(1)}% raised</span>
              <span>Goal: ${projectData.fundingGoal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button variant={activeTab === 'products' ? 'default' : 'outline'} onClick={() => setActiveTab('products')}>Products</Button>
            <Button variant={activeTab === 'services' ? 'default' : 'outline'} onClick={() => setActiveTab('services')}>Services</Button>
          </div>
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <ProductCard key={idx} product={product} onViewDetails={handleViewProductDetails} />
              ))}
            </div>
          )}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={idx} service={service} onViewDetails={handleViewServiceDetails} />
              ))}
            </div>
          )}
          {/* Modals rendered once at the end of CardContent */}
          <ProductDetailsModal product={selectedProduct} isOpen={isProductModalOpen} onClose={handleCloseProductModal} />
          <ServiceDetailsModal service={selectedService} isOpen={isServiceModalOpen} onClose={handleCloseServiceModal} />
        </CardContent>
      </Card>

      {/* Project Progress Section */}
      <Card className="border-2 border-[#457B9D]">
        <CardHeader className="bg-gradient-to-r from-[#457B9D] to-[#5A9BC8] text-white">
          <CardTitle className="text-xl font-bold">Project Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {projectMilestones.length > 0 ? (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Implementation Timeline</h3>
                  <span className="text-sm text-gray-700 font-semibold">{milestonesProgress}%</span>
                </div>
                <Progress value={milestonesProgress} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>{completedMilestones} of {projectMilestones.length} milestones completed</span>
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-4">
                {projectMilestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <span className={`w-3 h-3 rounded-full flex-shrink-0 block ${milestone.status === 'Completed' ? 'bg-green-500' : milestone.status === 'In Progress' ? 'bg-blue-400' : 'bg-gray-300'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {milestone.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {milestone.stage}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>Target: {milestone.targetDate}</span>
                            </div>
                            {milestone.files && milestone.files.length > 0 && (
                              <div className="flex items-center gap-1">
                                <span>📎 {milestone.files.length} file(s)</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusBadge(milestone.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="mb-4">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No milestones have been added yet for this project.</h3>
              <p className="text-gray-600 mb-6">Please visit the Milestones page to add and manage your progress.</p>
              <Button 
                variant="outline" 
                className="border-[#457B9D] text-[#457B9D] hover:bg-[#457B9D] hover:text-white"
                onClick={() => window.location.href = '/dashboard/entrepreneur/projects'}
              >
                <Target className="w-4 h-4 mr-2" />
                Go to Milestones
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Partners Section */}
      <Card className="border-2 border-[#457B9D]">
        <CardHeader className="bg-gradient-to-r from-[#457B9D] to-[#5A9BC8] text-white">
          <CardTitle className="text-xl font-bold">Partners & Connections</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={partner.avatar} />
                    <AvatarFallback>
                      {partner.type === 'Investor' ? <Building2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant={partner.type === 'Investor' ? 'default' : 'secondary'}>
                        {partner.type}
                      </Badge>
                      <Badge variant={partner.status === 'Active' ? 'default' : 'outline'}>
                        {partner.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Deal Value: {partner.dealValue} • Last Contact: {partner.lastContact}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Deal
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span>Project information saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default MyBusiness; 