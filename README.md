# 🧠 CortexAI

CortexAI is a full-stack AI-powered personal assistant designed to provide intelligent conversations, AI agents, web search, coding assistance, authentication, subscription-based usage, and personalized AI features through a modern microservices architecture.

The project combines a React frontend with a Node.js backend consisting of multiple independent services, making the application scalable, modular, and easier to maintain.

---

## ✨ Features

### 🤖 AI Chat
- Intelligent conversational AI
- Context-aware conversations
- Conversation history
- Create and manage multiple conversations
- Real-time AI responses
- Markdown-based responses

### 🔎 AI Web Search
- Search the web using Tavily
- Retrieve current information from the internet
- AI-generated responses based on search results
- Useful for latest information and research queries

### 💻 AI Coding Agent
- AI-powered code generation
- Code explanation
- Code debugging
- Code review
- Code optimization
- Code conversion
- Project/file generation
- Structured project artifacts

### 🧠 AI Agent System
CortexAI uses an agent-based architecture to route user requests to specialized AI capabilities.

Supported operations include:

- General AI Chat
- Web Search
- Coding
- Image Analysis
- Intent Classification

### 🔐 Authentication
- Firebase Authentication
- JWT/session-based backend authentication
- Secure cookies
- Protected routes
- User account management

### 💳 Billing & Credits
- Subscription plans
- Credit-based AI usage
- Credit deduction for AI operations
- Payment verification
- Usage limits

### 📊 Conversation Management
- Create conversations
- Retrieve conversations
- Retrieve messages
- Update conversations
- Maintain conversation history

### ⚡ Redis
Redis is used for:
- Session management
- Temporary data
- Caching
- Fast access to frequently used information

---

# 🏗️ System Architecture

CortexAI follows a microservices-oriented architecture.

```text
                                          ┌──────────────────────┐
                         │    React Frontend    │
                         │      Vite + React    │
                         └───────────┬──────────┘
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │     API Gateway      │
                         │      Port 8000       │
                         └───────────┬──────────┘
                                     │
             ┌───────────────────────┼────────────────────────┐
             │                       │                        │
             ▼                       ▼                        ▼
      ┌─────────────┐        ┌─────────────┐         ┌─────────────┐
      │    Auth     │        │    Chat     │         │   Billing   │
      │   Service   │        │   Service   │         │   Service   │
      └──────┬──────┘        └──────┬──────┘         └──────┬──────┘
             │                      │                       │
             └──────────────────────┼───────────────────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  Agent Service  │
                           │                 │
                           │  Chat Agent     │
                           │  Search Agent   │
                           │  Coding Agent   │
                           │  Image Agent    │
                           └────────┬────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
               ┌─────────┐     ┌─────────┐     ┌───────────┐
               │ MongoDB │     │  Redis  │     │ LLM APIs  │
               └─────────┘     └─────────┘     └─────┬─────┘
                                                     │
                                      ┌──────────────┼──────────────┐
                                      ▼              ▼              ▼
                                   Groq API      OpenRouter      Gemini
                                      │
                                      ▼
                                   Tavily
Project Structure
CortexAI/
│
├── .github/
│
├── backend/
│   │
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── .dockerignore
│   │   ├── .env
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   ├── services/
│   │   │
│   │   ├── agent/
│   │   │   ├── agents/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── graph/
│   │   │   ├── routes/
│   │   │   ├── temp/
│   │   │   ├── utils/
│   │   │   ├── .dockerignore
│   │   │   ├── .env
│   │   │   ├── Dockerfile
│   │   │   ├── index.js
│   │   │   ├── package.json
│   │   │   └── package-lock.json
│   │   │
│   │   ├── auth/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── .dockerignore
│   │   │   ├── .env
│   │   │   ├── Dockerfile
│   │   │   ├── index.js
│   │   │   ├── package.json
│   │   │   ├── package-lock.json
│   │   │   └── serviceAccountKey.json
│   │   │
│   │   ├── billing/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── .dockerignore
│   │   │   ├── .env
│   │   │   ├── Dockerfile
│   │   │   ├── index.js
│   │   │   ├── package.json
│   │   │   └── package-lock.json
│   │   │
│   │   └── chat/
│   │       ├── config/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── routes/
│   │       ├── .dockerignore
│   │       ├── .env
│   │       ├── Dockerfile
│   │       ├── index.js
│   │       ├── package.json
│   │       └── package-lock.json
│   │
│   ├── shared/
│   │   └── redis/
│   │       └── redis.js
│   │
│   ├── docker-compose.yml
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Artifact.jsx
│   │   │   ├── BillingDrawer.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── LoadingAnimation.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Nav.jsx
│   │   │   └── SideBar.jsx
│   │   │
│   │   ├── features/
│   │   │   ├── createConversation.js
│   │   │   ├── createOrder.js
│   │   │   ├── getConversations.js
│   │   │   ├── getCurrentUser.js
│   │   │   ├── getMessages.js
│   │   │   ├── logOut.js
│   │   │   ├── sendMessage.js
│   │   │   ├── updateConversation.js
│   │   │   └── verifyPayment.js
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── utils/
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
└── README.md
                                             How CortexAI Works
User
  │
  ▼
React Frontend
  │
  ▼
API Gateway
  │
  ▼
Authentication
  │
  ▼
Agent / Chat Service
  │
  ├───────────────► General Chat
  │
  ├───────────────► Web Search
  │                    │
  │                    ▼
  │                 Tavily
  │                    │
  │                    ▼
  │                   LLM
  │
  ├───────────────► Coding Agent
  │                    │
  │                    ▼
  │                Coding LLM
  │
  └───────────────► Image Analysis
                       │
                       ▼
                     Gemini
  │
  ▼
AI Response
  │
  ▼
Frontend
