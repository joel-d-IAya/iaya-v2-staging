#!/bin/bash

# Configuration
PROJECT_DIR="/root/websites/iaya-staging"
cd $PROJECT_DIR

echo "--- 🚀 Mise à jour de IAya Staging ---"

# 1. Récupérer le code
echo "📦 Récupération du code depuis GitHub..."
git pull origin main

# 2. Logique de Déploiement
if [ -f "docker-compose.yml" ]; then
    echo "🐳 Déploiement via Docker Compose (Recommandé)..."
    # --build force la reconstruction de l'image (l'étape de build npm se fait dans le container)
    # L'utilisation de Docker permet d'isoler le build et d'éviter de polluer le système hôte.
    docker compose up -d --build
    echo "✅ Déploiement Docker terminé."
elif [ -d "dist" ]; then
    echo "📄 Mode Statique (Fallback)..."
    # Exemple de copie vers un dossier servi par Nginx
    # cp -r dist/* /var/www/iaya-staging/
    echo "⚠️  Note: Dossier dist/ détecté mais automation non configurée pour Nginx pur. Préférez Docker."
else
    echo "❌ Aucune méthode de déploiement trouvée (docker-compose.yml manquant)."
fi

echo "--- ✨ Staging à jour ---"
