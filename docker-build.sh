#!/bin/bash

# Enable Docker BuildKit for faster builds with caching
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

echo "Building with BuildKit cache..."

# Build with cache mount for pnpm store (much faster subsequent builds)
docker compose build \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  app

echo "Build complete!"
