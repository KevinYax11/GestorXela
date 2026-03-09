#!/bin/bash
# deploy.sh - Production deployment script with minimal downtime

set -e  # Exit on any error

echo "🚀 Starting deployment..."
echo ""

echo "[1/6] Pulling latest changes..."
git pull origin main

echo "[2/6] Building new Docker image..."
docker compose -f docker-compose.prod.yml build

echo "[3/6] Running database migrations (if any)..."
# Payload auto-generates and runs migrations
docker compose -f docker-compose.prod.yml run --rm app pnpm payload migrate

echo "[4/6] Starting new container (old one will be replaced)..."
docker compose -f docker-compose.prod.yml up -d --no-deps --build app

echo "[5/6] Removing old images..."
docker image prune -f

echo "[6/6] Deployment complete!"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Health check:"
sleep 5  # Wait for container to start
curl -f http://localhost:3000/api/health || echo "⚠️  Warning: Health check failed"

echo ""
echo "🎉 Deployment finished successfully!"
