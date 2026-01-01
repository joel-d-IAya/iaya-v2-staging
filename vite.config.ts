import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const directusUrl = env.VITE_DIRECTUS_URL || 'https://cms.iaya.cloud';
  const directusToken = env.VITE_DIRECTUS_TOKEN;

  return {
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      proxy: {
        '/cms-api': {
          target: directusUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cms-api/, ''),
          headers: directusToken ? {
            'Authorization': `Bearer ${directusToken}`
          } : {}
        },
      },
    },
  };
})
