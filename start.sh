#!/bin/bash

# Start AI Engine (FastAPI)
echo "Starting AI Engine..."
cd /app/ai-engine && uvicorn main:app --host 127.0.0.1 --port 8000 &

# Start Backend (Node.js)
echo "Starting Backend..."
cd /app/backend && node server.js &

# Start Frontend (Next.js)
echo "Starting Frontend..."
cd /app/frontend && npm start &

# Start Nginx
echo "Starting Nginx Reverse Proxy on port 7860..."
nginx -c /etc/nginx/nginx.conf
