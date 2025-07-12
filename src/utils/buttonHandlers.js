import { messageService, dealService } from '../services/messageService';

// Button Handlers for Entrepreneur Dashboard
export const buttonHandlers = {
  // Contact Button Handler
  handleContact: async (participantId, participantData, navigate) => {
    try {
      // Check if inquiry conversation already exists
      const existingConversation = await messageService.checkExistingConversation(participantId, 'inquiry');
      
      if (existingConversation.exists) {
        // Navigate to existing conversation
        navigate(`/dashboard/entrepreneur/messages?chatId=${existingConversation.conversationId}&tab=inquiry`);
      } else {
        // Create new inquiry conversation
        const newConversation = await messageService.createConversation({
          participants: [participantId],
          type: 'inquiry',
          relatedProjectId: participantData.projectId || null,
          relatedProjectName: participantData.projectName || 'New Project',
          user: participantData
        });
        
        // Navigate to new conversation
        navigate(`/dashboard/entrepreneur/messages?chatId=${newConversation.id}&tab=inquiry`);
      }
    } catch (error) {
      console.error('Error handling contact:', error);
      // Fallback: navigate to messages page with inquiry tab
      navigate('/dashboard/entrepreneur/messages?tab=inquiry');
    }
  },

  // Make a Deal Button Handler
  handleMakeDeal: async (participantId, participantData, dealDetails, navigate) => {
    try {
      // Create new deal first
      const newDeal = await dealService.createDeal({
        participantId,
        participantData,
        dealDetails,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // Create deal conversation
      const dealConversation = await messageService.createDealConversation({
        dealId: newDeal.id,
        participants: [participantId],
        type: 'deal',
        relatedProjectId: participantData.projectId || null,
        relatedProjectName: participantData.projectName || 'New Deal',
        user: participantData,
        dealDetails
      });

      // Navigate to deal conversation
      navigate(`/dashboard/entrepreneur/messages?chatId=${dealConversation.id}&tab=deal`);
    } catch (error) {
      console.error('Error handling make deal:', error);
      // Fallback: navigate to messages page with deal tab
      navigate('/dashboard/entrepreneur/messages?tab=deal');
    }
  },

  // Message Button Handler (for My Deals page)
  handleMessage: async (dealId, navigate) => {
    try {
      // Get deal conversation
      const dealConversation = await dealService.getDealConversation(dealId);
      
      if (dealConversation) {
        // Navigate to existing deal conversation
        navigate(`/dashboard/entrepreneur/messages?chatId=${dealConversation.id}&tab=deal`);
      } else {
        // Fallback: navigate to messages page with deal tab
        navigate('/dashboard/entrepreneur/messages?tab=deal');
      }
    } catch (error) {
      console.error('Error handling message:', error);
      // Fallback: navigate to messages page with deal tab
      navigate('/dashboard/entrepreneur/messages?tab=deal');
    }
  }
};

// Helper function to get participant data from different sources
export const getParticipantData = (source, sourceId) => {
  // This function should be implemented based on your data structure
  // It should return participant data in the format:
  // {
  //   id: 'participant_id',
  //   name: 'Participant Name',
  //   role: 'supplier' | 'investor',
  //   avatar: '/path/to/avatar.jpg',
  //   company: 'Company Name',
  //   projectId: 'project_id',
  //   projectName: 'Project Name'
  // }
  
  // Example implementation:
  switch (source) {
    case 'marketplace':
      // Get data from marketplace item
      return {
        id: sourceId,
        name: 'Marketplace User',
        role: 'supplier', // or 'investor'
        avatar: '/placeholder-user.jpg',
        company: 'Company Name',
        projectId: null,
        projectName: 'Current Project'
      };
    case 'myDeals':
      // Get data from deal
      return {
        id: sourceId,
        name: 'Deal Partner',
        role: 'supplier', // or 'investor'
        avatar: '/placeholder-user.jpg',
        company: 'Company Name',
        projectId: null,
        projectName: 'Deal Project'
      };
    default:
      return null;
  }
};

export default buttonHandlers; 