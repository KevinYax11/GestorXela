#!/bin/bash
# Quick start script for Grupo Gestor project (Local Development)

echo "=== Grupo Gestor - Quick Start (Local Dev) ==="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Start database only
echo "🗄️  Starting PostgreSQL database..."
docker-compose -f docker-compose.dev.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Failed to start database"
    exit 1
fi

echo "✓ Database started!"
echo ""

# Wait for database to be healthy
echo "⏳ Waiting for database to be ready..."
for i in {1..10}; do
    if docker exec grupo-gestor-db pg_isready -U postgres > /dev/null 2>&1; then
        echo "✓ Database is ready!"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "❌ Database took too long to start"
        exit 1
    fi
    sleep 1
done

echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time)..."
    echo "   This may take a few minutes..."
    pnpm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        echo "   Make sure pnpm is installed: npm install -g pnpm"
        exit 1
    fi
    echo "✓ Dependencies installed!"
    echo ""
fi

# Start the app
echo "🚀 Starting application..."
echo ""
echo "✅ Setup complete! Now run:"
echo ""
echo "   pnpm dev"
echo ""
echo "The app will be available at:"
echo "   Frontend:  http://localhost:3000"
echo "   Admin:     http://localhost:3000/admin"
echo ""
echo "📝 Useful commands:"
echo "   Stop database:  docker-compose -f docker-compose.dev.yml down"
echo "   View DB logs:   docker-compose -f docker-compose.dev.yml logs -f"
echo ""
