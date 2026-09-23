# 🧠 CortexAI — Multi-Agent AI Platform

CortexAI is a full-stack **Multi-Agent AI Platform** designed to provide intelligent AI assistance for multiple tasks including conversational AI, web search, coding, PDF processing, PPT generation, and image generation.

The platform is built using a **MERN-based frontend/backend ecosystem with a microservices architecture**, LangChain, LangGraph, RAG, vector search, Redis-based memory, multiple AI models, and cloud infrastructure.

---

# 🚀 Features

CortexAI provides multiple specialized AI agents that are coordinated through a central routing workflow.

## 🤖 Multi-Agent AI System

CortexAI includes the following specialized agents:

```text
                    ┌───────────────┐
                    │     START     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Router Agent │
                    └───────┬───────┘
                            │
       ┌────────────┬───────┼────────┬────────────┬─────────────┐
       ▼            ▼       ▼        ▼            ▼             ▼
    Chat Agent  Search   Coding   PDF Agent   PPT Agent   ImageGen Agent
                Agent    Agent
       │            │       │        │            │             │
       └────────────┴───────┴────────┴────────────┴─────────────┘
                            │
                            ▼
                           END


Complete Architecture 

                              ┌─────────────────────┐
                              │       USER          │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   React Frontend    │
                              │      + Vite         │
                              │   Redux Toolkit     │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │    API Gateway      │
                              │     Express.js      │
                              └──────────┬──────────┘
                                         │
             ┌───────────────────────────┼──────────────────────────┐
             │                           │                          │
             ▼                           ▼                          ▼
      ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
      │ Auth Service │           │ Chat Service │           │Billing Service│
      └──────┬───────┘           └──────┬───────┘           └──────────────┘
             │                          │
             │                          │
             └──────────────┬───────────┘
                            │
                            ▼
                   ┌─────────────────────┐
                   │    Agent Service    │
                   │                     │
                   │    LangGraph        │
                   │    LangChain        │
                   └──────────┬──────────┘
                              │
                         Router Agent
                              │
        ┌─────────────┬────────┼─────────┬────────────┬─────────────┐
        │             │        │         │            │             │
        ▼             ▼        ▼         ▼            ▼             ▼
      Chat         Search    Coding     PDF          PPT        ImageGen
      Agent        Agent     Agent      Agent        Agent        Agent
        │             │        │         │            │             │
        │             ▼        ▼         │            │             │
        │          Tavily   OpenRouter   │            │             │
        │                    DeepSeek    │            │             │
        │                                │            │             │
        └────────────────────────────────┴────────────┴─────────────┘
                              │
                              ▼
                         AI Response
                              │
                              ▼
                         React UI

     ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
     │   MongoDB    │       │    Redis     │       │   Qdrant     │
     │              │       │              │       │              │
     │ Persistent   │       │ Memory       │       │ Vector DB    │
     │ Data         │       │ Sessions     │       │ RAG          │
     └──────────────┘       └──────────────┘       └──────────────┘

                              │
                              ▼
                           AWS Cloud
                   
                                  
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

Frontend

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| React.js      | Frontend user interface           |
| Vite          | Development server and build tool |
| JavaScript    | Frontend programming              |
| CSS           | UI styling                        |
| Redux Toolkit | State management                  |
| React Router  | Client-side routing               |

Backend

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Node.js       | Backend runtime                  |
| Express.js    | REST API framework               |
| REST APIs     | Service communication            |
| Microservices | Modular backend architecture     |
| JWT           | Authentication and authorization |

AI & LLM

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| LangChain  | AI/LLM integration                 |
| LangGraph  | Multi-agent workflow orchestration |
| Groq       | Fast LLM inference                 |
| OpenRouter | Access to coding LLMs              |
| DeepSeek   | Coding model                       |
| Gemini     | Multimodal/image analysis          |
| Tavily     | Web search                         |
| RAG        | Knowledge retrieval and generation |

Database

| Technology | Purpose                             |
| ---------- | ----------------------------------- |
| MongoDB    | Persistent application database     |
| Redis      | Sessions, memory and caching        |
| Qdrant     | Vector database and semantic search |

Cloud & DevOps

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| AWS            | Cloud infrastructure        |
| AWS S3         | Cloud file/object storage   |
| Docker         | Containerization            |
| Docker Compose | Multi-service orchestration |
| Git            | Version control             |
| GitHub         | Source code hosting         |



