#!/bin/bash

# Configuration
APP_DIR="/root/websites/iaya-prod"
BRANCH="prod"

echo "🚀 Starting Production Deployment for IAya..."

# Go to project directory
cd $APP_DIR || exit

# Ensure we are on the prod branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "$BRANCH" ]; then
    echo "⚠️ Not on $BRANCH branch. Switching..."
    git checkout $BRANCH
fi

# Pull latest changes
echo "📥 Pulling latest changes from GitHub ($BRANCH)..."
git pull origin $BRANCH

# Build and restart containers
echo "🏗️ Building and restarting Docker containers..."
docker compose -f docker-compose.prod.yml up -d --build --force-recreate

# Clean up unused images to save space
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Production Deployment Complete! Service should be live on iaya.cloud"
