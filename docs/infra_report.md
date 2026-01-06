# 🌐 IAya Agency - Infrastructure Report & Knowledge Base

## 📋 General Overview
This document serves as the central source of truth for the IAya Agency infrastructure. It documents the relationships between Directus (CMS), n8n (Automation), GitHub (Source Control), and the VPS (Hosting).

---

## 🖥️ Server Infrastructure (VPS)
- **Provider:** Hostinger
- **OS:** Ubuntu 24.04 (Staging)
- **IP Address:** `72.60.250.79`
- **Main Ingress:** Traefik (Occupies ports 80 & 443)
- **Primary Network:** `root_default` (External bridge for container communication)

---

## 🔐 1. Variables d'Environnement (.env)
*Seules les clés sont listées ici pour des raisons de sécurité.*

### Front-end (Vite/React)
- `VITE_DIRECTUS_URL` : URL de l'instance Directus.
- `VITE_DIRECTUS_TOKEN` : Token statique pour l'accès aux données protégées.

### Back-end / CMS
- `SECRET` : Clé secrète de l'instance Directus.
- `DB_CLIENT` / `DB_DATABASE` / `DB_PASSWORD` : Configuration de la base de données.
- `CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC` : Configuration pour l'intégration de vidéos (YouTube).

---

## 📄 2. Procédure de Lecture des Logs
Pour diagnostiquer les problèmes sur le VPS :

### Logs des Applications (Docker)
- **Logs en temps réel :** `docker logs -f <nom_container>`
- **Dernières 100 lignes :** `docker logs --tail 100 <nom_container>`
- **Logs de Traefik (Debug) :** `docker logs root-traefik-1`

### Logs Système (Host)
- **Status Nginx (Hôte) :** `systemctl status nginx`
- **Journal Système :** `journalctl -u docker.service` ou `journalctl -xe`

---

## 🐳 3. Template Docker Standard IAya
Tout nouveau service IAya doit suivre cette structure pour une intégration immédiate avec Traefik.

### Dockerfile (Multi-stage)
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_DIRECTUS_URL
ENV VITE_DIRECTUS_URL=$VITE_DIRECTUS_URL
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose (Traefik-ready)
```yaml
services:
  app-name:
    build: .
    networks: [root_default]
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`domain.iaya.cloud`)"
      - "traefik.http.routers.app.entrypoints=websecure"
      - "traefik.http.routers.app.tls.certresolver=mytlschallenge"
      - "traefik.http.services.app.loadbalancer.server.port=80"
networks:
  root_default:
    external: true
```

---

### Script de Backup Automatisé
Un script est disponible dans `/root/websites/iaya-staging/backup_staging.sh`. Il gère :
1. Le dump SQL de la base `root-directus_db-1`.
2. La compression du dossier des médias (`/uploads`).
3. La rotation automatique (rétention de 7 jours).

### Mise en place du Cron (Quotidien)
Pour automatiser le backup chaque nuit à 3h00 :
1. `crontab -e`
2. Ajouter : `0 3 * * * /bin/bash /root/websites/iaya-staging/backup_staging.sh >> /var/log/iaya_backup.log 2>&1`

---

## 🔗 5. Index des Webhooks
Les automations IAya sont centralisées sur n8n.

| Nom | Source | Destination | Rôle |
| :--- | :--- | :--- | :--- |
| **Deploy Staging** | GitHub (Push) | VPS | Automatisation du `update_staging.sh` |
| **Contact Form** | Website | n8n / Email | Gestion des leads |
| **Directus Sync** | Directus (Flows) | n8n | Notification lors de nouveau contenu |

---

## 📜 Maintenance rapide
- **Sync Code :** `cd /root/websites/iaya-staging && ./update_staging.sh`
- **Force Git Sync :** `git fetch origin && git reset --hard origin/main`

---
*Document approuvé pour usage agence - Dernière Mise à Jour: 2026-01-06 par Antigravity*
