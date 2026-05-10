# CyberShield AI — Enterprise Cybersecurity Platform

CyberShield AI is a state-of-the-art cybersecurity threat detection and monitoring platform. It leverages AI/ML to detect anomalies in system logs and network traffic, providing security analysts with real-time insights and a modern SOC (Security Operations Center) dashboard.

## 🚀 Key Features

- **AI-Powered Detection**: Uses Isolation Forest and Random Forest models to identify suspicious patterns and zero-day threats.
- **Real-time Monitoring**: WebSocket-driven threat feed and live system health status.
- **Enterprise Dashboard**: Comprehensive visualizations for threat trends, severity distribution, and attack vectors.
- **Log Analysis**: Terminal-grade log viewer with advanced filtering and search capabilities.
- **Modern UI/UX**: Dark cybersecurity theme with glassmorphism, fluid animations (Framer Motion), and responsive design.
- **Secure Architecture**: JWT-based authentication with role-based access control (RBAC).

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js + Express
- **Database**: MySQL (Sequelize ORM)
- **Real-time**: Socket.io
- **Security**: Helmet, CORS, JWT, bcrypt

### AI Engine
- **Framework**: Python FastAPI
- **Libraries**: scikit-learn, pandas, numpy
- **Models**: Isolation Forest (Anomaly Detection), Random Forest (Classification)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MySQL (Running locally or via Docker)
- Docker & Docker Compose (Optional)

### Automated Setup (Docker)
```bash
docker-compose up --build
```

### Manual Setup

#### 1. Backend
```bash
cd backend
npm install
# Configure .env file
npm start
```

#### 2. AI Engine
```bash
cd ai-engine
python -m venv venv
source venv/bin/activate # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

#### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
cybershield-ai/
├── frontend/          # Next.js Application
│   ├── src/app/       # Routes and Pages
│   └── src/components/# UI Components
├── backend/           # Node.js Express API
│   ├── models/        # Database Schemas
│   ├── routes/        # API Endpoints
│   └── controllers/   # Business Logic
├── ai-engine/         # Python AI Service
│   └── main.py        # FastAPI Inference
└── docker-compose.yml # Infrastructure Orchestration
```

## 🛡️ Security Best Practices
- Environment variables for all secrets
- CSRF and XSS protection via Helmet
- Rate limiting on all API endpoints
- Secure password hashing with bcrypt
- Strict input validation using express-validator

---
Developed by **Antigravity AI**
