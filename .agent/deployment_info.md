# Deployment Information

## VPS Details
- **Project Path:** `/root/websites/iaya-staging`
- **User:** `root`
- **URL:** `https://v2.iaya.cloud` (Assumed based on project name)

## Deployment Command
```bash
cd /root/websites/iaya-staging && \
git pull origin main && \
npm install && \
npm run build && \
pm2 restart all
```
