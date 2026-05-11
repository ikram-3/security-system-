# =============================================
# Stage 1: Build Next.js Frontend
# =============================================
FROM node:20-slim AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

# Set API URL to use relative path for HF deployment
ENV NEXT_PUBLIC_API_URL=/api
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# =============================================
# Stage 2: Final Runtime Image
# =============================================
FROM python:3.10-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 18, Nginx, and supervisor
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    nginx \
    supervisor \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create app user (UID 1000 as required by HF)
RUN useradd -m -u 1000 user

WORKDIR /home/user/app

# ----- AI Engine -----
COPY ai-engine/requirements.txt ./ai-engine/
RUN pip install --no-cache-dir -r ./ai-engine/requirements.txt
COPY ai-engine/ ./ai-engine/

# ----- Backend -----
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev
COPY backend/ ./backend/

# ----- Frontend -----
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/next.config.ts ./frontend/
RUN cd frontend && npm install --omit=dev

# ----- Nginx -----
COPY nginx.conf /etc/nginx/nginx.conf

# ----- Supervisor -----
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Fix permissions so user 1000 can run nginx and write to dirs
RUN mkdir -p /var/log/nginx /var/lib/nginx/body /run/nginx /tmp/nginx \
    && chown -R user:user /home/user/app \
    && chown -R user:user /var/log/nginx /var/lib/nginx /run \
    && chown -R user:user /etc/nginx/nginx.conf \
    && chmod -R 755 /var/log/nginx /var/lib/nginx

USER user

EXPOSE 7860

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
