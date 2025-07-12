import axios from 'axios';

// Base URL for API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Message Service
export const messageService = {
  // Get all conversations for current user
  getConversations: async () => {
    try {
      const response = await api.get('/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get specific conversation by ID
  getConversation: async (conversationId) => {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  },

  // Create new conversation
  createConversation: async (conversationData) => {
    try {
      const response = await api.post('/conversations', conversationData);
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Send message in conversation
  sendMessage: async (conversationId, messageData) => {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Check if conversation exists between users
  checkExistingConversation: async (participantId, type = 'inquiry') => {
    try {
      const response = await api.get(`/conversations/check`, {
        params: { participantId, type }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking existing conversation:', error);
      throw error;
    }
  },

  // Create deal conversation
  createDealConversation: async (dealData) => {
    try {
      const response = await api.post('/conversations/deal', dealData);
      return response.data;
    } catch (error) {
      console.error('Error creating deal conversation:', error);
      throw error;
    }
  }
};

// Deal Service
export const dealService = {
  // Create new deal
  createDeal: async (dealData) => {
    try {
      const response = await api.post('/deals', dealData);
      return response.data;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  // Get deal by ID
  getDeal: async (dealId) => {
    try {
      const response = await api.get(`/deals/${dealId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deal:', error);
      throw error;
    }
  },

  // Get deal conversation
  getDealConversation: async (dealId) => {
    try {
      const response = await api.get(`/deals/${dealId}/conversation`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deal conversation:', error);
      throw error;
    }
  }
};

export default api; 