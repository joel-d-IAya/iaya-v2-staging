#!/bin/bash

# Configuration
PROJECT_DIR="/root/websites/iaya-staging"
cd $PROJECT_DIR

echo "--- 🚀 Mise à jour de IAya Staging ---"

# 1. Récupérer le code
echo "📦 Récupération du code depuis GitHub..."
git pull origin main

# 2. Charger les variables d'environnement (Crucial pour Vite/Docker Build)
if [ -f ".env" ]; then
    echo "🔑 Chargement des variables d'environnement..."
    export $(grep -v '^#' .env | xargs)
else
    echo "⚠️  Attention: Aucun fichier .env trouvé à la racine."
fi

# 3. Logique de Déploiement
if [ -f "docker-compose.yml" ]; then
    echo "🐳 Déploiement via Docker Compose..."
    # --build et --no-cache garantissent que Vite compile avec les dernières variables et le dernier code
    if docker compose up -d --build --force-recreate; then
        echo "✅ Déploiement Docker terminé avec succès."
    else
        echo "❌ Échec du build ou du déploiement Docker."
        exit 1
    fi
elif [ -d "dist" ]; then
    echo "📄 Mode Statique (Fallback)..."
    # Exemple de copie vers un dossier servi par Nginx
    # cp -r dist/* /var/www/iaya-staging/
    echo "⚠️  Note: Dossier dist/ détecté mais automation non configurée pour Nginx pur. Préférez Docker."
else
    echo "❌ Aucune méthode de déploiement trouvée (docker-compose.yml manquant)."
fi

echo "--- ✨ Staging à jour ---"
