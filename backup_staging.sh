#!/bin/bash

# IAya Staging Backup Script
# Created by Antigravity for IAya Agency

BACKUP_DIR="/root/backups"
TIMESTAMP=$(date +%F_%H-%M-%S)
DB_CONTAINER="root-directus_db-1"
DIRECTUS_CONTAINER="root-directus-1"
RETENTION_DAYS=7

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

echo "🚀 Starting backup for $TIMESTAMP..."

# 1. Database Backup (PostgreSQL)
echo "💾 Dumping PostgreSQL database..."
docker exec "$DB_CONTAINER" pg_dump -U directus directus > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
if [ $? -eq 0 ]; then
    echo "✅ Database dump successful."
    gzip "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"
else
    echo "❌ Database dump FAILED."
fi

# 2. Assets Backup (Directus Uploads)
# We assume the uploads are in /uploads inside the container
echo "🖼️ Backing up Directus uploads..."
docker cp "$DIRECTUS_CONTAINER":/uploads "$BACKUP_DIR/uploads_$TIMESTAMP"
if [ $? -eq 0 ]; then
    tar -czf "$BACKUP_DIR/assets_backup_$TIMESTAMP.tar.gz" -C "$BACKUP_DIR" "uploads_$TIMESTAMP"
    rm -rf "$BACKUP_DIR/uploads_$TIMESTAMP"
    echo "✅ Assets backup successful."
else
    echo "❌ Assets backup FAILED (Could not copy from container)."
fi

# 3. Clean up old backups
echo "🧹 Pruning backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +$RETENTION_DAYS -delete

echo "🏁 Backup process completed."
