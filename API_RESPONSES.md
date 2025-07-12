# API Responses Documentation

## Conversations API

### GET /api/conversations
Returns all conversations for the current user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "conv_123",
      "participants": ["user_1", "user_2"],
      "type": "deal", // "deal" or "inquiry"
      "relatedProjectId": "project_456",
      "relatedProjectName": "Smart Home IoT Platform",
      "user": {
        "id": "user_2",
        "name": "Ahmed Hassan",
        "role": "supplier", // "supplier" or "investor"
        "avatar": "/path/to/avatar.jpg",
        "company": "Tech Solutions Inc.",
        "lastSeen": "2 minutes ago"
      },
      "messages": [
        {
          "id": "msg_789",
          "senderId": "user_2",
          "text": "Hello! I received your inquiry about the IoT devices.",
          "timestamp": "2024-01-20T10:30:00Z"
        }
      ],
      "lastMessage": "Hello! I received your inquiry about the IoT devices.",
      "lastMessageTime": "2024-01-20T10:30:00Z",
      "unreadCount": 0,
      "createdAt": "2024-01-20T10:00:00Z",
      "updatedAt": "2024-01-20T10:30:00Z"
    }
  ]
}
```

### GET /api/conversations/:id
Returns a specific conversation by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv_123",
    "participants": ["user_1", "user_2"],
    "type": "deal",
    "relatedProjectId": "project_456",
    "relatedProjectName": "Smart Home IoT Platform",
    "user": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc.",
      "lastSeen": "2 minutes ago"
    },
    "messages": [
      {
        "id": "msg_789",
        "senderId": "user_2",
        "text": "Hello! I received your inquiry about the IoT devices.",
        "timestamp": "2024-01-20T10:30:00Z"
      }
    ],
    "lastMessage": "Hello! I received your inquiry about the IoT devices.",
    "lastMessageTime": "2024-01-20T10:30:00Z",
    "unreadCount": 0,
    "createdAt": "2024-01-20T10:00:00Z",
    "updatedAt": "2024-01-20T10:30:00Z"
  }
}
```

### POST /api/conversations
Creates a new conversation.

**Request:**
```json
{
  "participants": ["user_2"],
  "type": "inquiry",
  "relatedProjectId": "project_456",
  "relatedProjectName": "Smart Home IoT Platform",
  "user": {
    "id": "user_2",
    "name": "Ahmed Hassan",
    "role": "supplier",
    "avatar": "/path/to/avatar.jpg",
    "company": "Tech Solutions Inc."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv_124",
    "participants": ["user_1", "user_2"],
    "type": "inquiry",
    "relatedProjectId": "project_456",
    "relatedProjectName": "Smart Home IoT Platform",
    "user": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc.",
      "lastSeen": "Online"
    },
    "messages": [],
    "lastMessage": null,
    "lastMessageTime": null,
    "unreadCount": 0,
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z"
  }
}
```

### POST /api/conversations/:id/messages
Sends a message in a conversation.

**Request:**
```json
{
  "text": "Hello! I'm interested in your services.",
  "timestamp": "2024-01-20T11:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "msg_790",
    "senderId": "user_1",
    "text": "Hello! I'm interested in your services.",
    "timestamp": "2024-01-20T11:00:00Z",
    "conversationId": "conv_124"
  }
}
```

### GET /api/conversations/check
Checks if a conversation exists between users.

**Request Parameters:**
- `participantId`: string
- `type`: "inquiry" or "deal"

**Response:**
```json
{
  "success": true,
  "data": {
    "exists": true,
    "conversationId": "conv_123"
  }
}
```

### POST /api/conversations/deal
Creates a deal conversation.

**Request:**
```json
{
  "dealId": "deal_789",
  "participants": ["user_2"],
  "type": "deal",
  "relatedProjectId": "project_456",
  "relatedProjectName": "Smart Home IoT Platform",
  "user": {
    "id": "user_2",
    "name": "Ahmed Hassan",
    "role": "supplier",
    "avatar": "/path/to/avatar.jpg",
    "company": "Tech Solutions Inc."
  },
  "dealDetails": {
    "type": "supply",
    "category": "Electronics",
    "price": "$15,000",
    "description": "IoT devices for smart home project"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv_125",
    "dealId": "deal_789",
    "participants": ["user_1", "user_2"],
    "type": "deal",
    "relatedProjectId": "project_456",
    "relatedProjectName": "Smart Home IoT Platform",
    "user": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc.",
      "lastSeen": "Online"
    },
    "dealDetails": {
      "type": "supply",
      "category": "Electronics",
      "price": "$15,000",
      "description": "IoT devices for smart home project"
    },
    "messages": [],
    "lastMessage": null,
    "lastMessageTime": null,
    "unreadCount": 0,
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z"
  }
}
```

## Deals API

### POST /api/deals
Creates a new deal.

**Request:**
```json
{
  "participantId": "user_2",
  "participantData": {
    "id": "user_2",
    "name": "Ahmed Hassan",
    "role": "supplier",
    "avatar": "/path/to/avatar.jpg",
    "company": "Tech Solutions Inc."
  },
  "dealDetails": {
    "type": "supply",
    "category": "Electronics",
    "price": "$15,000",
    "description": "IoT devices for smart home project"
  },
  "status": "pending",
  "createdAt": "2024-01-20T11:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "deal_789",
    "participantId": "user_2",
    "participantData": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc."
    },
    "dealDetails": {
      "type": "supply",
      "category": "Electronics",
      "price": "$15,000",
      "description": "IoT devices for smart home project"
    },
    "status": "pending",
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z"
  }
}
```

### GET /api/deals/:id
Returns a specific deal by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "deal_789",
    "participantId": "user_2",
    "participantData": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc."
    },
    "dealDetails": {
      "type": "supply",
      "category": "Electronics",
      "price": "$15,000",
      "description": "IoT devices for smart home project"
    },
    "status": "pending",
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z"
  }
}
```

### GET /api/deals/:id/conversation
Returns the conversation associated with a deal.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv_125",
    "dealId": "deal_789",
    "participants": ["user_1", "user_2"],
    "type": "deal",
    "relatedProjectId": "project_456",
    "relatedProjectName": "Smart Home IoT Platform",
    "user": {
      "id": "user_2",
      "name": "Ahmed Hassan",
      "role": "supplier",
      "avatar": "/path/to/avatar.jpg",
      "company": "Tech Solutions Inc.",
      "lastSeen": "Online"
    },
    "dealDetails": {
      "type": "supply",
      "category": "Electronics",
      "price": "$15,000",
      "description": "IoT devices for smart home project"
    },
    "messages": [
      {
        "id": "msg_790",
        "senderId": "user_1",
        "text": "Hello! I'm interested in your services.",
        "timestamp": "2024-01-20T11:00:00Z"
      }
    ],
    "lastMessage": "Hello! I'm interested in your services.",
    "lastMessageTime": "2024-01-20T11:00:00Z",
    "unreadCount": 0,
    "createdAt": "2024-01-20T11:00:00Z",
    "updatedAt": "2024-01-20T11:00:00Z"
  }
}
```

## Error Responses

All API endpoints return error responses in this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

Common error codes:
- `UNAUTHORIZED`: User not authenticated
- `FORBIDDEN`: User not authorized
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `INTERNAL_ERROR`: Server error 