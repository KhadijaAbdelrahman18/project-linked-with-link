import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, Phone, HelpCircle, Clock, Users, Shield } from 'lucide-react';
import LiveChatBox from '../components/LiveChatBox';
import faqsData from '../components/faqsData';

// SupportPage: Enhanced and refactored
const SupportPage = ({ onMessageSend, setActiveTab }) => {
  // Dynamically detect userRole from localStorage
  const userRole = useMemo(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userObj = JSON.parse(userStr);
        return userObj.role || 'entrepreneur';
      }
    } catch (e) {}
    return 'entrepreneur';
  }, []);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'admin', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      
      // Call callback if provided
      if (onMessageSend) {
        onMessageSend(userMessage);
      }
      
      // Simulate admin response
      setTimeout(() => {
        const adminResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will get back to you soon!",
          sender: 'admin',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, adminResponse]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // FAQs based on userRole from imported data
  const getRoleBasedFAQs = () => faqsData[userRole] || faqsData.entrepreneur;


  const getRoleColor = () => {
    switch (userRole) {
      case 'entrepreneur': return 'text-teal-600';
      case 'investor': return 'text-[#1D3557]';
      case 'supplier': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleBg = () => {
    switch (userRole) {
      case 'entrepreneur': return 'bg-teal-500';
      case 'investor': return 'bg-[#457B9D]';
      case 'supplier': return 'bg-purple-500';
      default: return 'bg-[#457B9D]';
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF8F7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Icon removed as requested */}
          <h1 className="text-5xl font-bold text-[#1D3557] mb-6 leading-tight">
            How can we help you today?
          </h1>
          <p className="text-xl text-[#457B9D] max-w-3xl mx-auto leading-relaxed">
            Our dedicated support team is here to ensure your success on our platform. Whether you're just getting started or need advanced assistance, we've got you covered with comprehensive support resources.
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white hover:border-[#A8DADC]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A8DADC] rounded-full mb-4">
              <Clock className="w-8 h-8 text-[#1D3557]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1D3557] mb-2">24/7</h3>
            <p className="text-[#457B9D]">Support Available</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white hover:border-[#A8DADC]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A8DADC] rounded-full mb-4">
              <Users className="w-8 h-8 text-[#1D3557]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1D3557] mb-2">50K+</h3>
            <p className="text-[#457B9D]">Happy Users</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white hover:border-[#A8DADC]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A8DADC] rounded-full mb-4">
              <Shield className="w-8 h-8 text-[#1D3557]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1D3557] mb-2">99%</h3>
            <p className="text-[#457B9D]">Issue Resolution</p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <button
            onClick={() => setIsChatOpen(true)}
            className="group flex items-center justify-center space-x-4 p-8 bg-[#457B9D] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-[#1D3557] border-2 border-[#457B9D] hover:border-[#A8DADC]"
          >
            <MessageSquare className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <div className="text-xl font-bold text-white group-hover:text-[#A8DADC] transition-colors duration-300">Live Chat</div>
              <div className="text-[#A8DADC] group-hover:text-white transition-colors duration-300">Get instant support</div>
            </div>
          </button>

          <a
            href="mailto:support@startup-platform.com"
            className="group flex items-center justify-center space-x-4 p-8 bg-[#457B9D] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-[#1D3557] border-2 border-[#457B9D] hover:border-[#A8DADC]"
          >
            <Mail className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <div className="text-xl font-bold text-white group-hover:text-[#A8DADC] transition-colors duration-300">Email Support</div>
              <div className="text-[#A8DADC] group-hover:text-white transition-colors duration-300">Detailed assistance</div>
            </div>
          </a>

          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-4 p-8 bg-[#457B9D] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-[#1D3557] border-2 border-[#457B9D] hover:border-[#A8DADC]"
          >
            <Phone className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left">
              <div className="text-xl font-bold text-white group-hover:text-[#A8DADC] transition-colors duration-300">WhatsApp</div>
              <div className="text-[#A8DADC] group-hover:text-white transition-colors duration-300">Quick messaging</div>
            </div>
          </a>
        </div>

        {/* Live Chat Box (extracted) */}
        <LiveChatBox
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-[#A8DADC]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A8DADC] rounded-full mb-6">
              <HelpCircle className="w-8 h-8 text-[#1D3557]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1D3557] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#457B9D] text-lg max-w-2xl mx-auto">
              Find quick answers to common questions about our platform and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {getRoleBasedFAQs().map((faq, index) => (
              <div key={index} className="group border-2 border-[#A8DADC] rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white to-[#EEF8F7] hover:from-[#EEF8F7] hover:to-[#A8DADC] hover:border-[#457B9D]">
                <h3 className="text-xl font-bold text-[#1D3557] mb-4 group-hover:text-[#457B9D] transition-colors duration-300 leading-tight">
                  {faq.question}
                </h3>
                <p className="text-[#457B9D] leading-relaxed group-hover:text-[#1D3557] transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Policies Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-[#A8DADC] mt-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#457B9D] to-[#A8DADC] rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#1D3557] mb-4">Usage Policies</h2>
            <p className="text-[#457B9D] text-lg max-w-2xl mx-auto">Learn about the terms and policies that ensure you a safe and reliable experience on our platform.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Use dashboard tab navigation if inside dashboard */}
            <Link
              to="#"
              onClick={e => {
                e.preventDefault();
                if (typeof setActiveTab === 'function') setActiveTab('terms');
              }}
              className="flex-1 text-center py-6 px-8 rounded-2xl bg-gradient-to-r from-[#A8DADC] to-[#457B9D] text-white font-bold text-xl shadow-lg hover:from-[#457B9D] hover:to-[#A8DADC] transition-all duration-300 border-2 border-[#A8DADC] hover:border-[#457B9D]"
            >
              Terms of Use
            </Link>
            <Link
              to="#"
              onClick={e => {
                e.preventDefault();
                if (typeof setActiveTab === 'function') setActiveTab('privacy');
              }}
              className="flex-1 text-center py-6 px-8 rounded-2xl bg-gradient-to-r from-[#A8DADC] to-[#457B9D] text-white font-bold text-xl shadow-lg hover:from-[#457B9D] hover:to-[#A8DADC] transition-all duration-300 border-2 border-[#A8DADC] hover:border-[#457B9D]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Contact Information Footer (summary only, no animation) */}
        <div className="mt-16 bg-gradient-to-r from-[#457B9D] to-[#1D3557] rounded-2xl p-10 text-center shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Still need assistance?
          </h3>
          <p className="text-[#A8DADC] text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
            You can reach us anytime using the methods above or through the live chat box.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;