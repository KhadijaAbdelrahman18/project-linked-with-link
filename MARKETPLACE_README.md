# Marketplace Feature

## Overview
The Marketplace is a comprehensive feature within the Entrepreneur Dashboard that allows entrepreneurs to browse and connect with product suppliers and service providers.

## Features

### 🏪 Dual Marketplace Types
- **Product Suppliers**: Hardware, equipment, packaging, and physical goods
- **Service Providers**: Design, legal, marketing, consulting services

### 🔍 Advanced Filtering System
- **Category Filter**: Equipment, Packaging, Design, Legal, Marketing
- **Location Filter**: Major cities across the US
- **Rating Filter**: Minimum star rating requirement
- **Price Range**: Min and max price inputs
- **Availability**: "Available Now" checkbox
- **Search**: Keyword search by name or description

### 📱 Responsive Design
- **Desktop**: Full sidebar filters + main content grid
- **Tablet**: Collapsible filters with responsive grid
- **Mobile**: Optimized for mobile viewing

### 🎯 Smart Features
- **Sorting**: By rating or price
- **Pagination**: 6 items per page with navigation
- **Real-time Search**: Instant filtering as you type
- **Empty States**: Helpful messages when no results found

## Component Structure

### Main Component: `src/components/Marketplace.jsx`
- Handles all marketplace logic and state management
- Responsive layout with sidebar filters and main content
- Mock data for suppliers and service providers

### Integration: `src/pages/EntrepreneurDashboard.jsx`
- Added Marketplace import and tab integration
- Accessible via sidebar navigation

### Styling: `src/index.css`
- Added line-clamp utility for text truncation
- Uses existing Tailwind CSS design system

## Usage

1. **Access**: Click "Marketplace" in the entrepreneur dashboard sidebar
2. **Switch Tabs**: Toggle between "Product Suppliers" and "Service Providers"
3. **Filter**: Use the sidebar filters to narrow down results
4. **Search**: Type keywords to find specific providers
5. **Sort**: Choose between rating or price sorting
6. **Interact**: Use "Contact", "Make a Deal", or "View Profile" buttons

## Data Structure

### Supplier/Provider Object
```javascript
{
  id: number,
  type: 'supplier' | 'service',
  name: string,
  description: string,
  location: string,
  rating: number,
  category: string,
  logo: string (emoji),
  priceRange: string,
  available: boolean,
  contact: string,
  email: string
}
```

## Design System

### Colors
- **Primary**: Teal (#0d9488) - Used for buttons and active states
- **Success**: Green (#16a34a) - Used for availability and pricing
- **Warning**: Red (#dc2626) - Used for unavailable status
- **Neutral**: Gray scale for text and borders

### Components
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Filters**: Collapsible sidebar with form controls
- **Pagination**: Numbered navigation with Previous/Next

## Future Enhancements

- [ ] Real API integration
- [ ] Advanced filtering (distance, reviews, etc.)
- [ ] Favorites/Wishlist functionality
- [ ] Direct messaging system
- [ ] Booking/Appointment scheduling
- [ ] Review and rating system
- [ ] Provider profiles with detailed information
- [ ] Price comparison features
- [ ] Location-based recommendations 