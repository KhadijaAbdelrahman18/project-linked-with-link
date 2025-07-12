# منطق الأزرار الثلاثة في داشبورد ريادي الأعمال

## نظرة عامة

تم إنشاء نظام متكامل لثلاثة أزرار في داشبورد ريادي الأعمال باستخدام React و Axios للتعامل مع الـ API. النظام يدعم:

1. **زرار Contact**: للتواصل الأولي مع الموردين والمستثمرين
2. **زرار Make a Deal**: لإنشاء صفقات جديدة
3. **زرار Message**: للوصول المباشر لمحادثات الصفقات الموجودة

## الملفات المطلوبة

### 1. `src/services/messageService.js`
خدمة للتعامل مع API calls للمحادثات والصفقات.

### 2. `src/utils/buttonHandlers.js`
منطق الأزرار الثلاثة مع وظائف التنقل.

### 3. `src/components/Messages.jsx`
صفحة المحادثات المحدثة لقراءة المعاملات من URL.

## كيفية استخدام الأزرار

### زرار Contact

```javascript
import { buttonHandlers, getParticipantData } from '../utils/buttonHandlers';

// في Marketplace أو أي صفحة أخرى
const handleContact = (participantId, item) => {
  const participantData = getParticipantData('marketplace', participantId);
  buttonHandlers.handleContact(participantId, participantData, navigate);
};

// استخدام الزر
<button onClick={() => handleContact(item.id, item)}>
  Contact
</button>
```

**المنطق:**
- يتحقق من وجود محادثة inquiry بين المستخدمين
- إذا وجدت: ينتقل للمحادثة الموجودة
- إذا لم توجد: ينشئ محادثة جديدة وينتقل إليها
- يفتح صفحة الرسائل على تبويب "inquiry"

### زرار Make a Deal

```javascript
const handleMakeDeal = (participantId, item) => {
  const participantData = getParticipantData('marketplace', participantId);
  const dealDetails = {
    type: 'supply', // أو 'investment' أو 'service'
    category: item.category,
    price: item.price,
    description: item.description
  };
  buttonHandlers.handleMakeDeal(participantId, participantData, dealDetails, navigate);
};

// استخدام الزر
<button onClick={() => handleMakeDeal(item.id, item)}>
  Make a Deal
</button>
```

**المنطق:**
- ينشئ صفقة جديدة في قاعدة البيانات
- ينشئ محادثة من نوع "deal" مرتبطة بالصفقة
- ينتقل لصفحة الرسائل على تبويب "deal"
- يفتح المحادثة الجديدة مباشرة

### زرار Message (في My Deals)

```javascript
const handleMessage = (dealId) => {
  buttonHandlers.handleMessage(dealId, navigate);
};

// استخدام الزر
<button onClick={() => handleMessage(deal.id)}>
  Message
</button>
```

**المنطق:**
- يبحث عن محادثة الصفقة المرتبطة بـ dealId
- ينتقل مباشرة لصفحة الرسائل على تبويب "deal"
- يفتح المحادثة المحددة

## قراءة المعاملات في Messages.jsx

```javascript
import { useSearchParams } from 'react-router-dom';

export default function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // قراءة المعاملات من URL
  const chatId = searchParams.get('chatId');
  const tabType = searchParams.get('tab');
  
  // تحديد التبويب النشط
  useEffect(() => {
    if (tabType && (tabType === 'deal' || tabType === 'inquiry')) {
      setActiveTab(tabType);
    }
  }, [tabType]);
  
  // تحديد المحادثة المحددة
  useEffect(() => {
    if (chatId && conversations.length > 0) {
      const conversation = conversations.find(conv => conv.id === chatId);
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, [chatId, conversations]);
}
```

## شكل URL المتوقع

```
/dashboard/entrepreneur/messages?chatId=conv_123&tab=deal
/dashboard/entrepreneur/messages?chatId=conv_456&tab=inquiry
/dashboard/entrepreneur/messages?tab=deal
/dashboard/entrepreneur/messages?tab=inquiry
```

## API Endpoints المطلوبة

### Conversations
- `GET /api/conversations` - جلب جميع المحادثات
- `POST /api/conversations` - إنشاء محادثة جديدة
- `POST /api/conversations/:id/messages` - إرسال رسالة
- `GET /api/conversations/check` - التحقق من وجود محادثة
- `POST /api/conversations/deal` - إنشاء محادثة صفقة

### Deals
- `POST /api/deals` - إنشاء صفقة جديدة
- `GET /api/deals/:id` - جلب صفقة محددة
- `GET /api/deals/:id/conversation` - جلب محادثة الصفقة

## مثال على الاستخدام الكامل

```javascript
// في Marketplace.jsx
import { useNavigate } from 'react-router-dom';
import { buttonHandlers, getParticipantData } from '../utils/buttonHandlers';

const Marketplace = () => {
  const navigate = useNavigate();
  
  const handleContact = (item) => {
    const participantData = getParticipantData('marketplace', item.id);
    buttonHandlers.handleContact(item.id, participantData, navigate);
  };
  
  const handleMakeDeal = (item) => {
    const participantData = getParticipantData('marketplace', item.id);
    const dealDetails = {
      type: 'supply',
      category: item.category,
      price: item.price,
      description: item.description
    };
    buttonHandlers.handleMakeDeal(item.id, participantData, dealDetails, navigate);
  };
  
  return (
    <div>
      {/* ... باقي الكود ... */}
      <button onClick={() => handleContact(item)}>Contact</button>
      <button onClick={() => handleMakeDeal(item)}>Make a Deal</button>
    </div>
  );
};
```

## ملاحظات مهمة

1. **التعامل مع الأخطاء**: جميع الوظائف تحتوي على try-catch للتعامل مع أخطاء API
2. **Fallback**: في حالة فشل API، يتم التنقل لصفحة الرسائل مع التبويب المناسب
3. **التوافق**: النظام متوافق مع البيانات الوهمية للتطوير
4. **التحديث التلقائي**: المحادثات تتحدث تلقائياً عند إرسال رسائل جديدة

## التطوير المستقبلي

- إضافة إشعارات في الوقت الفعلي
- دعم الملفات المرفقة في الرسائل
- إضافة مؤشرات حالة القراءة
- دعم المحادثات الجماعية 