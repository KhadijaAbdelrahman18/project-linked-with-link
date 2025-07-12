import React from 'react';
import { motion } from 'framer-motion';
import QuickStats from './overview/QuickStats';
import BusinessAnalytics from './overview/BusinessAnalytics';
import ActivityFeed from './overview/ActivityFeed';
import ProjectSummaryCard from './overview/ProjectSummaryCard';

// Mock data
const mockData = {
  stats: {
    totalMilestones: 30,
    confirmedDeals: 12,
    contactedSuppliers: 25,
    contactedInvestors: 18
  },
  milestoneProgress: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    completed: [5, 10, 15, 20, 25, 30]
  },
  dealStatus: {
    confirmed: 12,
    pending: 20,
    rejected: 8
  },
  supplierEngagement: {
    productSuppliers: 15,
    serviceProviders: 10
  },
  activityTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    messages: [15, 25, 35, 45, 55, 65],
    offers: [8, 12, 18, 25, 32, 40],
    edits: [10, 18, 25, 32, 40, 48]
  },
  projectReadiness: {
    legal: 85,
    suppliers: 70,
    investors: 90,
    marketing: 65,
    operations: 80
  }
};

const mockActivities = [
  {
    type: 'milestone',
    message: 'Added milestone: Launch Marketing Campaign',
    time: '2 hours ago'
  },
  {
    type: 'supplier',
    message: 'Contacted supplier: Tech Solutions Inc.',
    time: '5 hours ago'
  },
  {
    type: 'investor',
    message: 'New investor interested in your project',
    time: '1 day ago'
  },
  {
    type: 'deal',
    message: 'Deal confirmed with Angel Investor Group',
    time: '2 days ago'
  }
];

const mockProject = {
  title: 'E-Commerce Platform Launch',
  status: 'active',
  startDate: 'October 15, 2023',
  description: 'Building a next-generation e-commerce platform with AI-powered recommendations.',
  suggestions: [
    '3 milestones pending completion',
    'Consider reaching out to more investors',
    'Update your business profile'
  ],
  onViewDetails: () => window.location.href = '/my-business'
};

export default function OverviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Overview</h1>
        <p className="text-gray-600 text-lg">Track your progress and manage your business activities</p>
      </motion.div>

      <QuickStats stats={mockData.stats} />
      
      <div className="mb-6">
        <BusinessAnalytics data={mockData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectSummaryCard project={mockProject} />
        <ActivityFeed activities={mockActivities} />
      </div>

      <ActivityFeed activities={mockActivities} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-gray-500 mt-8 pt-8 border-t border-gray-100"
      >
        Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </motion.div>
    </motion.div>
  );
}