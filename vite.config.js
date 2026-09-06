import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-edge-config-middleware',
      configureServer(server) {
        server.middlewares.use('/api/config', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          const configPath = path.resolve(__dirname, 'public/site-config.json');
          if (fs.existsSync(configPath)) {
            res.end(fs.readFileSync(configPath, 'utf-8'));
          } else {
            res.end(JSON.stringify({ isInMaintenance: true }));
          }
        });
      },
    },
  ],
})

