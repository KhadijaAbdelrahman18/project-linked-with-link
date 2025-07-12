import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { buttonHandlers, getParticipantData } from '../utils/buttonHandlers';
import MarketplaceFilters from './MarketplaceFilters';
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
  TrendingUp
} from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('suppliers');
  const [supplierType, setSupplierType] = useState('all'); // 'all', 'products', 'services'
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({});
  const [supplierFilters, setSupplierFilters] = useState({});
  const [serviceFilters, setServiceFilters] = useState({});
  const [investorFilters, setInvestorFilters] = useState({});

  // Mock data for Product Suppliers
  const supplierData = [
    {
      id: 1,
      name: "Fresh Food Supplies Co.",
      category: "Raw Materials",
      description: "Premium quality ingredients for food businesses including organic vegetables, fresh meats, dairy products, and specialty ingredients. We source directly from local farms and international suppliers to ensure the highest quality standards.",
      rating: 4.8,
      reviews: 127,
      location: "New York, NY",
      country: "US",
      state: "NY",
      city: "New York",
      price: "$500-2000",
      availableNow: true,
      phone: "+1 (555) 123-4567",
      email: "contact@freshfood.com",
      website: "www.freshfood.com",
      image: "/placeholder-logo.png",
      deliveryTime: "1-3 days",
      minimumOrder: "$100"
    },
    {
      id: 2,
      name: "Kitchen Equipment Pro",
      category: "Kitchen Tools & Appliances",
      description: "Professional kitchen equipment and appliances for restaurants, cafes, and food trucks. We offer commercial-grade equipment including ovens, refrigerators, mixers, and specialized cooking tools.",
      rating: 4.6,
      reviews: 89,
      location: "Los Angeles, CA",
      country: "US",
      state: "CA",
      city: "Los Angeles",
      price: "$1000-5000",
      availableNow: true,
      phone: "+1 (555) 234-5678",
      email: "sales@kitchenpro.com",
      website: "www.kitchenpro.com",
      image: "/placeholder-logo.png",
      deliveryTime: "3-7 days",
      minimumOrder: "$500"
    },
    {
      id: 3,
      name: "Food Truck Essentials",
      category: "Food Truck Equipment",
      description: "Complete food truck setup and equipment including mobile kitchens, generators, water systems, and safety equipment. We provide turnkey solutions for food truck entrepreneurs.",
      rating: 4.9,
      reviews: 203,
      location: "Chicago, IL",
      country: "US",
      state: "IL",
      city: "Chicago",
      price: "$5000-15000",
      availableNow: false,
      phone: "+1 (555) 345-6789",
      email: "info@foodtruckessentials.com",
      website: "www.foodtruckessentials.com",
      image: "/placeholder-logo.png",
      deliveryTime: "2-4 weeks",
      minimumOrder: "$2000"
    },
    {
      id: 4,
      name: "Packaging Solutions",
      category: "Food Packaging",
      description: "Eco-friendly food packaging materials including biodegradable containers, compostable utensils, and sustainable packaging options. Perfect for environmentally conscious food businesses.",
      rating: 4.4,
      reviews: 156,
      location: "Miami, FL",
      country: "US",
      state: "FL",
      city: "Miami",
      price: "$200-800",
      availableNow: true,
      phone: "+1 (555) 456-7890",
      email: "hello@packagingsolutions.com",
      website: "www.packagingsolutions.com",
      image: "/placeholder-logo.png",
      deliveryTime: "2-5 days",
      minimumOrder: "$50"
    },
    {
      id: 5,
      name: "POS Systems Plus",
      category: "POS Systems & Tech",
      description: "Modern POS systems for food businesses with integrated payment processing, inventory management, and customer analytics. Cloud-based solutions with 24/7 support.",
      rating: 4.7,
      reviews: 94,
      location: "Seattle, WA",
      country: "US",
      state: "WA",
      city: "Seattle",
      price: "$800-3000",
      availableNow: true,
      phone: "+1 (555) 567-8901",
      email: "support@posplus.com",
      website: "www.posplus.com",
      image: "/placeholder-logo.png",
      deliveryTime: "1-2 weeks",
      minimumOrder: "$200"
    },
    {
      id: 6,
      name: "Safety First Supplies",
      category: "Safety & Hygiene",
      description: "Safety equipment and hygiene supplies including protective gear, cleaning chemicals, and compliance materials. We help food businesses meet health and safety regulations.",
      rating: 4.5,
      reviews: 78,
      location: "Boston, MA",
      country: "US",
      state: "MA",
      city: "Boston",
      price: "$300-1200",
      availableNow: true,
      phone: "+1 (555) 678-9012",
      email: "info@safetyfirst.com",
      website: "www.safetyfirst.com",
      image: "/placeholder-logo.png",
      deliveryTime: "1-3 days",
      minimumOrder: "$75"
    },
    {
      id: 7,
      name: "Beverage Equipment Solutions",
      category: "Beverage Equipment",
      description: "Specialized beverage equipment including coffee machines, juicers, blenders, and cold brew systems. We cater to cafes, juice bars, and beverage-focused businesses.",
      rating: 4.8,
      reviews: 145,
      location: "Portland, OR",
      country: "US",
      state: "OR",
      city: "Portland",
      price: "$1500-8000",
      availableNow: true,
      phone: "+1 (555) 789-0123",
      email: "sales@beverageequipment.com",
      website: "www.beverageequipment.com",
      image: "/placeholder-logo.png",
      deliveryTime: "1-2 weeks",
      minimumOrder: "$300"
    },
    {
      id: 8,
      name: "Frozen Food Suppliers",
      category: "Frozen Foods",
      description: "High-quality frozen food products including meats, vegetables, and prepared meals. We offer bulk purchasing options and reliable cold chain logistics.",
      rating: 4.3,
      reviews: 92,
      location: "Dallas, TX",
      country: "US",
      state: "TX",
      city: "Dallas",
      price: "$400-1500",
      availableNow: true,
      phone: "+1 (555) 890-1234",
      email: "orders@frozenfoods.com",
      website: "www.frozenfoods.com",
      image: "/placeholder-logo.png",
      deliveryTime: "2-4 days",
      minimumOrder: "$200"
    },
    {
      id: 9,
      name: "Organic Ingredients Hub",
      category: "Organic Ingredients",
      description: "Certified organic ingredients including spices, herbs, grains, and specialty products. We source from certified organic farms and maintain strict quality standards.",
      rating: 4.9,
      reviews: 178,
      location: "Boulder, CO",
      country: "US",
      state: "CO",
      city: "Boulder",
      price: "$300-1200",
      availableNow: true,
      phone: "+1 (555) 901-2345",
      email: "organic@ingredientshub.com",
      website: "www.ingredientshub.com",
      image: "/placeholder-logo.png",
      deliveryTime: "3-7 days",
      minimumOrder: "$150"
    },
    {
      id: 10,
      name: "Commercial Refrigeration",
      category: "Refrigeration Equipment",
      description: "Commercial refrigeration equipment including walk-in coolers, freezers, and display cases. Energy-efficient solutions with installation and maintenance services.",
      rating: 4.6,
      reviews: 134,
      location: "Phoenix, AZ",
      country: "US",
      state: "AZ",
      city: "Phoenix",
      price: "$2000-10000",
      availableNow: false,
      phone: "+1 (555) 012-3456",
      email: "refrigeration@commercial.com",
      website: "www.commercialrefrigeration.com",
      image: "/placeholder-logo.png",
      deliveryTime: "2-3 weeks",
      minimumOrder: "$1000"
    },
    {
      id: 11,
      name: "Food Service Uniforms",
      category: "Uniforms & Apparel",
      description: "Professional food service uniforms including chef coats, aprons, and safety gear. Custom embroidery and branding options available for businesses.",
      rating: 4.4,
      reviews: 87,
      location: "Nashville, TN",
      country: "US",
      state: "TN",
      city: "Nashville",
      price: "$100-500",
      availableNow: true,
      phone: "+1 (555) 123-4567",
      email: "uniforms@foodservice.com",
      website: "www.foodserviceuniforms.com",
      image: "/placeholder-logo.png",
      deliveryTime: "5-10 days",
      minimumOrder: "$50"
    },
    {
      id: 12,
      name: "Bakery Equipment Specialists",
      category: "Bakery Equipment",
      description: "Specialized bakery equipment including mixers, ovens, proofers, and decorating tools. We serve bakeries, pastry shops, and dessert businesses.",
      rating: 4.7,
      reviews: 156,
      location: "San Diego, CA",
      country: "US",
      state: "CA",
      city: "San Diego",
      price: "$800-5000",
      availableNow: true,
      phone: "+1 (555) 234-5678",
      email: "bakery@equipment.com",
      website: "www.bakeryequipment.com",
      image: "/placeholder-logo.png",
      deliveryTime: "1-2 weeks",
      minimumOrder: "$400"
    }
  ];

  // Mock data for Service Providers
  const serviceData = [
    {
      id: 1,
      name: "Legal Food Services",
      category: "Legal Services",
      description: "Legal consultation for food business compliance including licensing, permits, health regulations, and business structure. We help food entrepreneurs navigate complex legal requirements.",
      rating: 4.8,
      reviews: 112,
      location: "Washington, DC",
      country: "US",
      state: "DC",
      city: "Washington",
      price: "$150-500/hour",
      availableNow: true,
      phone: "+1 (555) 789-0123",
      email: "legal@foodservices.com",
      website: "www.legalfoodservices.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person & Virtual",
      specialties: ["Licensing", "Compliance", "Contracts"]
    },
    {
      id: 2,
      name: "Brand Design Studio",
      category: "Branding & Design",
      description: "Professional branding and design services including logo design, packaging, menus, and marketing materials. We create memorable brand identities for food businesses.",
      rating: 4.9,
      reviews: 167,
      location: "San Francisco, CA",
      country: "US",
      state: "CA",
      city: "San Francisco",
      price: "$500-2000",
      availableNow: true,
      phone: "+1 (555) 890-1234",
      email: "hello@branddesign.com",
      website: "www.branddesign.com",
      image: "/placeholder-logo.png",
      consultationType: "Virtual & In-person",
      specialties: ["Logo Design", "Packaging", "Brand Strategy"]
    },
    {
      id: 3,
      name: "Social Media Marketing Pro",
      category: "Marketing & Social Media",
      description: "Social media marketing and content creation specifically for food businesses. We help restaurants, food trucks, and food brands build engaging online presence.",
      rating: 4.6,
      reviews: 134,
      location: "Austin, TX",
      country: "US",
      state: "TX",
      city: "Austin",
      price: "$300-1200/month",
      availableNow: true,
      phone: "+1 (555) 901-2345",
      email: "marketing@socialpro.com",
      website: "www.socialpro.com",
      image: "/placeholder-logo.png",
      consultationType: "Virtual",
      specialties: ["Content Creation", "Community Management", "Paid Ads"]
    },
    {
      id: 4,
      name: "Business Consulting Group",
      category: "Business Consulting",
      description: "Strategic business consulting for food entrepreneurs including business planning, financial modeling, and growth strategies. We help food businesses scale and succeed.",
      rating: 4.7,
      reviews: 98,
      location: "Denver, CO",
      country: "US",
      state: "CO",
      city: "Denver",
      price: "$200-800/hour",
      availableNow: true,
      phone: "+1 (555) 012-3456",
      email: "consulting@businessgroup.com",
      website: "www.businessgroup.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person & Virtual",
      specialties: ["Business Planning", "Financial Analysis", "Growth Strategy"]
    },
    {
      id: 5,
      name: "Financial Advisory Services",
      category: "Financial Services",
      description: "Financial planning and advisory for food businesses including accounting, tax preparation, and investment guidance. We help food entrepreneurs manage their finances effectively.",
      rating: 4.5,
      reviews: 87,
      location: "Phoenix, AZ",
      country: "US",
      state: "AZ",
      city: "Phoenix",
      price: "$100-400/hour",
      availableNow: false,
      phone: "+1 (555) 123-4567",
      email: "finance@advisory.com",
      website: "www.advisory.com",
      image: "/placeholder-logo.png",
      consultationType: "Virtual & In-person",
      specialties: ["Accounting", "Tax Planning", "Financial Analysis"]
    },
    {
      id: 6,
      name: "Digital Marketing Experts",
      category: "Digital Marketing",
      description: "Comprehensive digital marketing solutions including SEO, PPC, email marketing, and website optimization. We help food businesses increase online visibility and sales.",
      rating: 4.8,
      reviews: 145,
      location: "Nashville, TN",
      country: "US",
      state: "TN",
      city: "Nashville",
      price: "$800-2500/month",
      availableNow: true,
      phone: "+1 (555) 234-5678",
      email: "marketing@digitalexperts.com",
      website: "www.digitalexperts.com",
      image: "/placeholder-logo.png",
      consultationType: "Virtual",
      specialties: ["SEO", "PPC", "Email Marketing"]
    },
    {
      id: 7,
      name: "Food Photography Studio",
      category: "Food Photography",
      description: "Professional food photography services for menus, websites, and marketing materials. We create stunning visuals that showcase your food in the best light.",
      rating: 4.9,
      reviews: 203,
      location: "Los Angeles, CA",
      country: "US",
      state: "CA",
      city: "Los Angeles",
      price: "$200-800/session",
      availableNow: true,
      phone: "+1 (555) 345-6789",
      email: "photography@foodstudio.com",
      website: "www.foodstudio.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person",
      specialties: ["Menu Photography", "Product Shots", "Lifestyle Photography"]
    },
    {
      id: 8,
      name: "Food Safety Training",
      category: "Food Safety Training",
      description: "Food safety training and certification programs for restaurant staff and food handlers. We help businesses comply with health regulations and maintain high safety standards.",
      rating: 4.6,
      reviews: 178,
      location: "Chicago, IL",
      country: "US",
      state: "IL",
      city: "Chicago",
      price: "$50-200/person",
      availableNow: true,
      phone: "+1 (555) 456-7890",
      email: "training@foodsafety.com",
      website: "www.foodsafety.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person & Virtual",
      specialties: ["ServSafe Certification", "HACCP Training", "Food Handler Cards"]
    },
    {
      id: 9,
      name: "Restaurant Interior Design",
      category: "Interior Design",
      description: "Restaurant interior design services including space planning, furniture selection, and decor. We create inviting atmospheres that enhance the dining experience.",
      rating: 4.7,
      reviews: 134,
      location: "Miami, FL",
      country: "US",
      state: "FL",
      city: "Miami",
      price: "$2000-15000",
      availableNow: true,
      phone: "+1 (555) 567-8901",
      email: "design@restaurant.com",
      website: "www.restaurantdesign.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person",
      specialties: ["Space Planning", "Furniture Selection", "Lighting Design"]
    },
    {
      id: 10,
      name: "Food Truck Permitting Services",
      category: "Permitting Services",
      description: "Specialized permitting services for food trucks including license applications, health inspections, and compliance assistance. We navigate the complex permitting process for you.",
      rating: 4.4,
      reviews: 96,
      location: "Seattle, WA",
      country: "US",
      state: "WA",
      city: "Seattle",
      price: "$300-1000",
      availableNow: true,
      phone: "+1 (555) 678-9012",
      email: "permits@foodtruck.com",
      website: "www.foodtruckpermits.com",
      image: "/placeholder-logo.png",
      consultationType: "Virtual & In-person",
      specialties: ["License Applications", "Health Inspections", "Compliance"]
    },
    {
      id: 11,
      name: "Menu Development Consulting",
      category: "Menu Development",
      description: "Menu development and optimization services including recipe development, pricing strategies, and seasonal menu planning. We help restaurants create profitable and appealing menus.",
      rating: 4.8,
      reviews: 167,
      location: "New Orleans, LA",
      country: "US",
      state: "LA",
      city: "New Orleans",
      price: "$500-2000",
      availableNow: true,
      phone: "+1 (555) 789-0123",
      email: "menu@development.com",
      website: "www.menudevelopment.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person & Virtual",
      specialties: ["Recipe Development", "Pricing Strategy", "Seasonal Planning"]
    },
    {
      id: 12,
      name: "Food Waste Management",
      category: "Waste Management",
      description: "Food waste management and sustainability consulting for restaurants and food businesses. We help reduce waste, lower costs, and improve environmental impact.",
      rating: 4.5,
      reviews: 89,
      location: "Portland, OR",
      country: "US",
      state: "OR",
      city: "Portland",
      price: "$200-800",
      availableNow: true,
      phone: "+1 (555) 890-1234",
      email: "waste@management.com",
      website: "www.wastemanagement.com",
      image: "/placeholder-logo.png",
      consultationType: "In-person",
      specialties: ["Waste Audits", "Composting", "Sustainability Planning"]
    }
  ];

  // Mock data for Investors
  const investorData = [
    {
      id: 1,
      name: "FoodTech Ventures",
      category: "Venture Capital",
      description: "Early-stage venture capital firm focused on food technology, sustainable agriculture, and food delivery innovations. We invest in companies that are transforming the food industry through technology.",
      rating: 4.8,
      reviews: 89,
      location: "San Francisco, CA",
      country: "US",
      state: "CA",
      city: "San Francisco",
      investmentRange: "$500K-5M",
      focusSectors: ["Food Tech", "AgTech", "Delivery"],
      preferredStage: "Series A",
      availableNow: true,
      phone: "+1 (555) 123-4567",
      email: "partners@foodtechventures.com",
      website: "www.foodtechventures.com",
      image: "/placeholder-logo.png",
      portfolioSize: "25 companies",
      avgInvestment: "$2.5M"
    },
    {
      id: 2,
      name: "Restaurant Growth Fund",
      category: "Private Equity",
      description: "Private equity firm specializing in restaurant and food service investments. We help established food businesses scale and expand through strategic capital and operational expertise.",
      rating: 4.6,
      reviews: 67,
      location: "New York, NY",
      country: "US",
      state: "NY",
      city: "New York",
      investmentRange: "$2M-20M",
      focusSectors: ["Restaurants", "Food Service", "Catering"],
      preferredStage: "Growth",
      availableNow: true,
      phone: "+1 (555) 234-5678",
      email: "investments@restaurantgrowth.com",
      website: "www.restaurantgrowth.com",
      image: "/placeholder-logo.png",
      portfolioSize: "12 companies",
      avgInvestment: "$8M"
    },
    {
      id: 3,
      name: "Sustainable Food Capital",
      category: "Impact Investment",
      description: "Impact investment fund focused on sustainable food production, organic farming, and environmentally conscious food businesses. We invest in companies that prioritize sustainability and social impact.",
      rating: 4.9,
      reviews: 134,
      location: "Portland, OR",
      country: "US",
      state: "OR",
      city: "Portland",
      investmentRange: "$100K-2M",
      focusSectors: ["Organic Farming", "Sustainable Food", "Plant-Based"],
      preferredStage: "Seed",
      availableNow: true,
      phone: "+1 (555) 345-6789",
      email: "hello@sustainablefood.com",
      website: "www.sustainablefood.com",
      image: "/placeholder-logo.png",
      portfolioSize: "18 companies",
      avgInvestment: "$800K"
    },
    {
      id: 4,
      name: "Food Truck Angels",
      category: "Angel Investment",
      description: "Angel investor network focused on food truck and mobile food businesses. We provide early-stage funding and mentorship to food entrepreneurs starting their mobile food ventures.",
      rating: 4.4,
      reviews: 156,
      location: "Austin, TX",
      country: "US",
      state: "TX",
      city: "Austin",
      investmentRange: "$25K-500K",
      focusSectors: ["Food Trucks", "Mobile Food", "Street Food"],
      preferredStage: "Pre-seed",
      availableNow: false,
      phone: "+1 (555) 456-7890",
      email: "angels@foodtruck.com",
      website: "www.foodtruckangels.com",
      image: "/placeholder-logo.png",
      portfolioSize: "45 companies",
      avgInvestment: "$150K"
    },
    {
      id: 5,
      name: "Beverage Innovation Fund",
      category: "Specialized Fund",
      description: "Specialized investment fund focused on beverage innovation, craft brewing, and non-alcoholic drink companies. We invest in unique beverage concepts with strong market potential.",
      rating: 4.7,
      reviews: 78,
      location: "Denver, CO",
      country: "US",
      state: "CO",
      city: "Denver",
      investmentRange: "$500K-3M",
      focusSectors: ["Craft Beer", "Non-alcoholic Drinks", "Beverage Tech"],
      preferredStage: "Series A",
      availableNow: true,
      phone: "+1 (555) 567-8901",
      email: "invest@beverageinnovation.com",
      website: "www.beverageinnovation.com",
      image: "/placeholder-logo.png",
      portfolioSize: "15 companies",
      avgInvestment: "$1.2M"
    },
    {
      id: 6,
      name: "Kitchen Tech Capital",
      category: "Technology Investment",
      description: "Technology-focused investment firm specializing in kitchen automation, food delivery platforms, and restaurant technology solutions. We invest in companies that digitize and optimize food operations.",
      rating: 4.5,
      reviews: 92,
      location: "Seattle, WA",
      country: "US",
      state: "WA",
      city: "Seattle",
      investmentRange: "$1M-10M",
      focusSectors: ["Kitchen Automation", "Food Delivery", "Restaurant Tech"],
      preferredStage: "Series B",
      availableNow: true,
      phone: "+1 (555) 678-9012",
      email: "partners@kitchentech.com",
      website: "www.kitchentech.com",
      image: "/placeholder-logo.png",
      portfolioSize: "22 companies",
      avgInvestment: "$3.5M"
    },
    {
      id: 7,
      name: "Health Food Ventures",
      category: "Health & Wellness",
      description: "Investment firm focused on health food, nutrition, and wellness products. We invest in companies that promote healthy eating and nutritional innovation.",
      rating: 4.8,
      reviews: 113,
      location: "Boulder, CO",
      country: "US",
      state: "CO",
      city: "Boulder",
      investmentRange: "$200K-1.5M",
      focusSectors: ["Health Food", "Nutrition", "Wellness"],
      preferredStage: "Seed",
      availableNow: true,
      phone: "+1 (555) 789-0123",
      email: "invest@healthfood.com",
      website: "www.healthfoodventures.com",
      image: "/placeholder-logo.png",
      portfolioSize: "28 companies",
      avgInvestment: "$600K"
    },
    {
      id: 8,
      name: "International Food Partners",
      category: "International Investment",
      description: "International investment firm focused on global food brands, import/export businesses, and international food market expansion. We help food companies expand globally.",
      rating: 4.3,
      reviews: 67,
      location: "Miami, FL",
      country: "US",
      state: "FL",
      city: "Miami",
      investmentRange: "$5M-50M",
      focusSectors: ["Global Food", "Import/Export", "International Expansion"],
      preferredStage: "Growth",
      availableNow: false,
      phone: "+1 (555) 890-1234",
      email: "partners@internationalfood.com",
      website: "www.internationalfood.com",
      image: "/placeholder-logo.png",
      portfolioSize: "8 companies",
      avgInvestment: "$15M"
    },
    {
      id: 9,
      name: "Food Waste Solutions Fund",
      category: "Sustainability",
      description: "Investment fund focused on food waste reduction, circular economy solutions, and sustainable food packaging. We invest in companies that address food waste challenges.",
      rating: 4.6,
      reviews: 89,
      location: "Boston, MA",
      country: "US",
      state: "MA",
      city: "Boston",
      investmentRange: "$300K-2M",
      focusSectors: ["Food Waste", "Circular Economy", "Sustainable Packaging"],
      preferredStage: "Series A",
      availableNow: true,
      phone: "+1 (555) 901-2345",
      email: "hello@foodwaste.com",
      website: "www.foodwaste.com",
      image: "/placeholder-logo.png",
      portfolioSize: "16 companies",
      avgInvestment: "$800K"
    },
    {
      id: 10,
      name: "Culinary Innovation Capital",
      category: "Culinary Investment",
      description: "Investment firm focused on culinary innovation, chef-driven concepts, and premium food experiences. We invest in companies that elevate the culinary experience.",
      rating: 4.7,
      reviews: 145,
      location: "Los Angeles, CA",
      country: "US",
      state: "CA",
      city: "Los Angeles",
      investmentRange: "$500K-5M",
      focusSectors: ["Culinary Innovation", "Chef Concepts", "Premium Food"],
      preferredStage: "Series A",
      availableNow: true,
      phone: "+1 (555) 012-3456",
      email: "invest@culinaryinnovation.com",
      website: "www.culinaryinnovation.com",
      image: "/placeholder-logo.png",
      portfolioSize: "19 companies",
      avgInvestment: "$2.2M"
    },
    {
      id: 11,
      name: "Food Security Fund",
      category: "Food Security",
      description: "Investment fund focused on food security, agricultural technology, and ensuring food access for all. We invest in companies that address global food security challenges.",
      rating: 4.4,
      reviews: 78,
      location: "Washington, DC",
      country: "US",
      state: "DC",
      city: "Washington",
      investmentRange: "$1M-8M",
      focusSectors: ["Food Security", "AgTech", "Food Access"],
      preferredStage: "Series B",
      availableNow: true,
      phone: "+1 (555) 123-4567",
      email: "partners@foodsecurity.com",
      website: "www.foodsecurity.com",
      image: "/placeholder-logo.png",
      portfolioSize: "12 companies",
      avgInvestment: "$3.8M"
    },
    {
      id: 12,
      name: "Plant-Based Future Fund",
      category: "Plant-Based Investment",
      description: "Investment fund exclusively focused on plant-based food companies, alternative proteins, and sustainable food alternatives. We invest in the future of food.",
      rating: 4.9,
      reviews: 203,
      location: "San Francisco, CA",
      country: "US",
      state: "CA",
      city: "San Francisco",
      investmentRange: "$200K-3M",
      focusSectors: ["Plant-Based", "Alternative Proteins", "Sustainable Food"],
      preferredStage: "Seed",
      availableNow: true,
      phone: "+1 (555) 234-5678",
      email: "hello@plantbased.com",
      website: "www.plantbased.com",
      image: "/placeholder-logo.png",
      portfolioSize: "31 companies",
      avgInvestment: "$1.1M"
    }
  ];

  // Get current data based on active tab and supplier type
  const getCurrentData = () => {
    if (activeTab === 'investors') {
      return investorData;
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
     supplierFilters) : investorFilters;

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = currentData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
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
          if (activeTab === 'investors') {
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
    } else if (activeTab === 'investors') {
      setInvestorFilters(newFilters);
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    if (activeTab === 'suppliers') {
      setSupplierFilters({});
      setServiceFilters({});
    } else if (activeTab === 'investors') {
      setInvestorFilters({});
    }
    setSearchQuery('');
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    if (activeTab === 'investors') {
      return Object.values(investorFilters).filter(value => value && value !== '').length;
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

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#EEF8F7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-1 mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-0">Marketplace</h1>
          <p className="text-gray-600 mt-0 mb-0">
            Connect with {activeTab === 'suppliers' ? 'Suppliers and Service Providers' : 'Investors'} for your food business
          </p>
        </div>

        {/* Main Category Toggle */}
        <div className="mb-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab('suppliers');
                setCurrentPage(1);
              }}
                className={`flex-1 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'suppliers'
                    ? 'bg-[#457B9D] text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
                <Building className="w-4 h-4 inline mr-2" />
              Suppliers
            </button>
            <button
              onClick={() => {
                setActiveTab('investors');
                setCurrentPage(1);
              }}
                className={`flex-1 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'investors'
                    ? 'bg-[#457B9D] text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
                <TrendingUp className="w-4 h-4 inline mr-2" />
              Investors
            </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter for Suppliers */}
        {activeTab === 'suppliers' && (
          <div className="mb-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <div className="flex">
                <button
                  onClick={() => setSupplierType('all')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    supplierType === 'all'
                      ? 'bg-[#457B9D]/10 text-[#457B9D]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSupplierType('products')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    supplierType === 'products'
                      ? 'bg-[#457B9D]/10 text-[#457B9D]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Product Suppliers
                </button>
                <button
                  onClick={() => setSupplierType('services')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                    supplierType === 'services'
                      ? 'bg-[#457B9D]/10 text-[#457B9D]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Service Providers
            </button>
          </div>
        </div>
          </div>
        )}

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
          <MarketplaceFilters
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
                    {filteredData.length} {activeTab === 'suppliers' ? 'suppliers' : activeTab === 'investors' ? 'investors' : 'providers'} found
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
                    <option value="price">{activeTab === 'investors' ? 'Sort by Investment Range' : 'Sort by Price'}</option>
                    <option value="reviews">Sort by Reviews</option>
                  </select>

                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
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
            <div className={`grid gap-2 ${
                viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
              {paginatedData.map((item) => {
                const CategoryIcon = getCategoryIcon(item.category);
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`${viewMode === 'list' ? 'flex-1 flex' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                        <div className={`bg-gray-100 flex items-center justify-center ${
                          viewMode === 'list' ? 'h-64' : 'h-56'
                        }`}>
                        <img
                          src={item.image}
                          alt={item.name}
                            className={`w-full h-full object-cover`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden items-center justify-center text-gray-400">
                            <CategoryIcon className="w-12 h-12" />
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 leading-tight">{item.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                            item.availableNow 
                              ? 'bg-[#457B9D]/10 text-[#457B9D]' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.availableNow ? 'Available' : 'Unavailable'}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 leading-relaxed line-clamp-2">{item.description}</p>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-900">{item.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({item.reviews})</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold text-[#457B9D]">
                            {activeTab === 'investors' ? item.investmentRange : item.price}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                            <CategoryIcon className="w-3 h-3" />
                            <span className="truncate">{item.category}</span>
                          </span>
                        </div>

                        {/* Investor-specific details */}
                        {activeTab === 'investors' && (
                          <div className="mb-2 p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">
                              <strong>Focus Sectors:</strong> {item.focusSectors?.join(', ')}
                        </div>
                            <div className="text-xs text-gray-600 mb-1">
                              <strong>Preferred Stage:</strong> {item.preferredStage}
                            </div>
                            <div className="text-xs text-gray-600">
                              <strong>Portfolio:</strong> {item.portfolioSize} • Avg: {item.avgInvestment}
                            </div>
                          </div>
                        )}

                        {/* Service-specific details */}
                        {activeTab === 'suppliers' && supplierType === 'services' && item.consultationType && (
                          <div className="mb-2 p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">
                              <strong>Consultation:</strong> {item.consultationType}
                        </div>
                            {item.specialties && (
                              <div className="text-xs text-gray-600">
                                <strong>Specialties:</strong> {item.specialties.join(', ')}
                              </div>
                            )}
                        </div>
                        )}

                        {/* Supplier-specific details */}
                        {activeTab === 'suppliers' && supplierType === 'products' && item.minimumOrder && (
                          <div className="mb-2 p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600">
                              <strong>Min Order:</strong> {item.minimumOrder}
                        </div>
                        </div>
                        )}

                        <div className="flex gap-2">
                          {activeTab === 'investors' ? (
                            <>
                              <button 
                                onClick={() => {
                                  const participantData = getParticipantData('marketplace', item.id);
                                  buttonHandlers.handleContact(item.id, participantData, navigate);
                                }}
                                className="flex-1 px-2 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#457B9D]/90 transition-colors font-medium text-sm"
                              >
                                Connect
                              </button>
                              <button 
                                onClick={() => {
                                  const participantData = getParticipantData('marketplace', item.id);
                                  const dealDetails = {
                                    type: 'investment',
                                    amount: item.investmentRange,
                                    stage: item.preferredStage,
                                    sectors: item.focusSectors
                                  };
                                  buttonHandlers.handleMakeDeal(item.id, participantData, dealDetails, navigate);
                                }}
                                className="flex-1 px-2 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#457B9D]/90 transition-colors font-medium text-sm"
                              >
                                Send Pitch
                              </button>
                              <button className="px-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                View Profile
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  const participantData = getParticipantData('marketplace', item.id);
                                  buttonHandlers.handleContact(item.id, participantData, navigate);
                                }}
                                className="flex-1 px-2 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#457B9D]/90 transition-colors font-medium text-sm"
                              >
                            Contact
                          </button>
                              <button 
                                onClick={() => {
                                  const participantData = getParticipantData('marketplace', item.id);
                                  const dealDetails = {
                                    type: activeTab === 'suppliers' ? 'supply' : 'service',
                                    category: item.category,
                                    price: item.price,
                                    description: item.description
                                  };
                                  buttonHandlers.handleMakeDeal(item.id, participantData, dealDetails, navigate);
                                }}
                                className="flex-1 px-2 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#457B9D]/90 transition-colors font-medium text-sm"
                              >
                                Make a Deal
                          </button>
                              <button className="px-2 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                Details
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === page
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
    </div>
  );
};

export default Marketplace; 