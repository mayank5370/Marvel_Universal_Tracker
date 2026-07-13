# 🦸 Marvel Universe Tracker

> **An AI-Powered Marvel News Aggregation Platform**

Automatically collects Marvel news from multiple trusted sources, enriches articles using AI, removes duplicates, and delivers structured content through scalable REST APIs and real-time updates.

---

## 📌 Overview

Marvel Universe Tracker is a backend-focused application designed to automate the entire lifecycle of news aggregation.

Instead of manually checking multiple websites, the platform continuously monitors RSS feeds, processes articles through an automated workflow, enriches them using AI, validates duplicates, and stores structured information for fast retrieval.

The project was built to explore real-world backend engineering concepts including automation pipelines, AI integration, scalable APIs, workflow orchestration, and database design.

---

# 🚀 Features

- Automated RSS Feed Aggregation
- AI-powered Content Enrichment
- Duplicate Detection
- JWT Authentication
- Role Based Access
- Watchlist Management
- Notification System
- Real-time Updates using Socket.IO
- Search & Filtering
- Admin Dashboard APIs
- Scheduled Automation using n8n
- PostgreSQL Database
- Prisma ORM

---

# 🏗 System Architecture

> *(Insert your architecture diagram here)*

```
RSS Sources
      │
      ▼
n8n Workflow
      │
      ▼
AI Enrichment
      │
      ▼
Backend APIs
      │
      ▼
PostgreSQL
      │
      ▼
Socket.IO
      │
      ▼
Frontend
```

---

# ⚙ Workflow

Every article follows this pipeline:

```
Scheduler

↓

Google Sheets

↓

RSS Reader

↓

Normalize Data

↓

Marvel Filter

↓

Duplicate Detection

↓

AI Enrichment

↓

Backend API

↓

Database

↓

Real-time Updates
```

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT

## Automation

- n8n

## AI

- Groq Llama
- JSON Structured Output

## Real-time

- Socket.IO

## Others

- Docker
- Git
- GitHub

---

# 🤖 AI Enrichment

Instead of storing raw news articles, AI extracts:

- Characters
- Actors
- Marvel Projects
- Summary
- Content Type
- Tags
- Importance Score
- Spoiler Risk
- Official Status

Result:

```json
{
    "project": "Spider-Man 4",
    "characters": [
        "Spider-Man"
    ],
    "actors": [
        "Tom Holland"
    ],
    "importance": 9,
    "spoilerRisk": "Low"
}
```

---

# 📂 Project Structure

```
backend
│
├── controllers
├── services
├── routes
├── middleware
├── prisma
├── utils
├── sockets
├── jobs
├── validators
├── config
└── server.js
```

---

# 📡 API Modules

- Authentication
- Content
- Search
- Users
- Watchlist
- Notifications
- Admin
- Analytics
- AI

---

# 🚀 Getting Started

Clone repository

```bash
git clone https://github.com/yourusername/marvel-universe-tracker.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Run production

```bash
npm start
```

---

# 🔑 Environment Variables

```
DATABASE_URL=

JWT_SECRET=

GROQ_API_KEY=

PORT=

REDIS_URL=

SOCKET_URL=
```

---

# 📊 Engineering Highlights

✔ 20+ REST APIs

✔ Automated n8n Pipeline

✔ AI-powered Metadata Extraction

✔ Duplicate Detection

✔ JWT Authentication

✔ Real-time Updates

✔ PostgreSQL + Prisma ORM

✔ Modular Backend Architecture

---

# 🎯 Roadmap

- [x] Backend Development
- [x] AI Integration
- [x] RSS Automation
- [x] Duplicate Detection
- [x] Authentication
- [x] Real-time Updates
- [ ] Frontend
- [ ] Docker Deployment
- [ ] Kubernetes
- [ ] CI/CD Pipeline

---

# 📖 Lessons Learned

Building this project helped me understand:

- System Design
- Workflow Automation
- AI Integration
- API Design
- Database Modeling
- Backend Scalability
- Error Handling
- Production Architecture

---

# ⭐ If you found this project interesting

Give it a ⭐ on GitHub.
