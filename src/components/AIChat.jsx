import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const AIChat = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message based on user role
      const welcomeMessage = getWelcomeMessage();
      setMessages([{
        id: '1',
        text: welcomeMessage,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, userRole]);

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'entrepreneur':
        return "مرحباً! أنا مساعدك الذكي في Elevante. يمكنني مساعدتك في إنشاء خطة العمل، البحث عن المستثمرين، أو أي استفسارات حول ريادة الأعمال. كيف يمكنني مساعدتك اليوم؟";
      case 'investor':
        return "أهلاً بك! أنا هنا لمساعدتك في تحليل الفرص الاستثمارية، تقييم الشركات الناشئة، وإدارة محفظتك الاستثمارية. ما الذي تود معرفته؟";
      case 'supplier':
        return "مرحباً! يمكنني مساعدتك في إدارة منتجاتك، التواصل مع العملاء، وتطوير استراتيجيات المبيعات. كيف يمكنني خدمتك؟";
      default:
        return "مرحباً! كيف يمكنني مساعدتك اليوم؟";
    }
  };

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Common responses
    if (lowerMessage.includes('مرحبا') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "مرحباً بك! كيف يمكنني مساعدتك اليوم؟";
    }

    // Role-specific responses
    switch (userRole) {
      case 'entrepreneur':
        if (lowerMessage.includes('خطة عمل') || lowerMessage.includes('business plan')) {
          return "لإنشاء خطة عمل ناجحة، تحتاج إلى: 1) تحديد المشكلة والحل 2) تحليل السوق المستهدف 3) نموذج العمل 4) الخطة المالية 5) استراتيجية التسويق. هل تريد مساعدة في أي من هذه النقاط؟";
        }
        if (lowerMessage.includes('مستثمر') || lowerMessage.includes('investor') || lowerMessage.includes('تمويل')) {
          return "للعثور على المستثمرين المناسبين: 1) حدد مرحلة شركتك 2) اختر المستثمرين المتخصصين في مجالك 3) حضر عرضاً تقديمياً مقنعاً 4) استخدم شبكتك المهنية. يمكنك استخدام قسم 'المستثمرين' في لوحة التحكم للبحث.";
        }
        return "كرائد أعمال، يمكنني مساعدتك في خطط العمل، البحث عن التمويل، إدارة الفريق، أو استراتيجيات النمو. ما هو التحدي الذي تواجهه؟";

      case 'investor':
        if (lowerMessage.includes('تقييم') || lowerMessage.includes('evaluation') || lowerMessage.includes('due diligence')) {
          return "لتقييم الشركات الناشئة، ركز على: 1) قوة الفريق المؤسس 2) حجم السوق والنمو المحتمل 3) نموذج العمل والإيرادات 4) الميزة التنافسية 5) الخطة المالية. هل تريد تفاصيل أكثر حول أي نقطة؟";
        }
        if (lowerMessage.includes('محفظة') || lowerMessage.includes('portfolio')) {
          return "لإدارة محفظة استثمارية متوازنة: 1) نوع في القطاعات والمراحل 2) راقب الأداء بانتظام 3) ادعم الشركات بالخبرة والشبكة 4) خطط لاستراتيجية الخروج. يمكنك مراجعة محفظتك في قسم 'Portfolio'.";
        }
        return "كمستثمر، يمكنني مساعدتك في تحليل الفرص، تقييم المخاطر، إدارة المحفظة، أو استراتيجيات الاستثمار. ما الذي تود مناقشته؟";

      case 'supplier':
        if (lowerMessage.includes('منتج') || lowerMessage.includes('product')) {
          return "لتحسين عرض منتجاتك: 1) حدد احتياجات العملاء بدقة 2) اضمن جودة عالية ومستقرة 3) قدم أسعاراً تنافسية 4) وفر خدمة عملاء ممتازة 5) طور علاقات طويلة المدى. هل تحتاج مساعدة في تطوير منتج معين؟";
        }
        if (lowerMessage.includes('عميل') || lowerMessage.includes('customer')) {
          return "لبناء قاعدة عملاء قوية: 1) فهم احتياجات السوق 2) قدم قيمة مضافة واضحة 3) حافظ على التواصل المستمر 4) اطلب تقييمات وتحسن باستمرار. استخدم قسم 'العملاء' لإدارة علاقاتك.";
        }
        return "كمورد، يمكنني مساعدتك في تطوير المنتجات، إدارة العملاء، تحسين العمليات، أو استراتيجيات النمو. كيف يمكنني مساعدتك؟";

      default:
        return "أعتذر، لم أفهم سؤالك بوضوح. هل يمكنك إعادة صياغته؟";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs opacity-90">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;
