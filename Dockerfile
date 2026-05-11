# Build stage for Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Final stage
FROM python:3.10-slim

# Install Node.js and Nginx
RUN apt-get update && apt-get install -y \
    curl \
    nginx \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup AI Engine
COPY ai-engine/requirements.txt ./ai-engine/
RUN pip install --no-cache-dir -r ./ai-engine/requirements.txt
COPY ai-engine/ ./ai-engine/

# Setup Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend/

# Setup Frontend (Copy built files)
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/next.config.ts ./frontend/
RUN cd frontend && npm install --production

# Copy Nginx configuration and startup script
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh .
RUN chmod +x start.sh

# Create a non-root user and set permissions
RUN useradd -m -u 1000 user
RUN chown -R user:user /app /var/lib/nginx /var/log/nginx /run
USER user

EXPOSE 7860

CMD ["./start.sh"]
