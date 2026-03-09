#!/bin/bash

# Quick Start Script for Grupo Gestor

echo "🚀 Grupo Gestor Docker Setup"
echo ""

# Check if image exists
if docker images | grep -q "grupo-gestor-app"; then
  echo "✅ Image found - Starting containers (fast ~5-10 sec)..."
  docker-compose up -d
else
  echo "📦 Building image first time (this takes ~1-2 min)..."
  echo "   Run 'docker-compose build app' to rebuild if dependencies change"
  docker-compose up -d --build
fi

echo ""
echo "⏳ Waiting for services..."
docker-compose up -d
sleep 3

echo ""
echo "📊 Status:"
docker-compose ps

echo ""
echo "📝 View logs: docker-compose logs -f app"
echo "🛑 Stop:      docker-compose down"
echo "🔄 Rebuild:   docker-compose build app"
