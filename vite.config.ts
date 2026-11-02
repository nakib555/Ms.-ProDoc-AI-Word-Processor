import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cloudflareSpaPlugin(): Plugin {
  return {
    name: 'cloudflare-spa-fallback',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const fallbackPath = path.join(distDir, '200.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath);
        }

        const redirectsPath = path.join(distDir, '_redirects');
        if (fs.existsSync(redirectsPath)) {
          const content = fs.readFileSync(redirectsPath, 'utf-8');
          const lines = content.split('\n').filter(line => {
            const trimmed = line.trim();
            // Filter out infinite loop rules like /* /index.html 200
            if (/^\/\*\s+\/(?:index\.html|200\.html)/.test(trimmed)) {
              return false;
            }
            return true;
          });
          const cleaned = lines.join('\n').trim();
          if (cleaned.length === 0) {
            fs.unlinkSync(redirectsPath);
          } else {
            fs.writeFileSync(redirectsPath, cleaned + '\n');
          }
        }

        const publicRedirects = path.resolve(__dirname, 'public', '_redirects');
        if (fs.existsSync(publicRedirects)) {
          const content = fs.readFileSync(publicRedirects, 'utf-8');
          const lines = content.split('\n').filter(line => {
            const trimmed = line.trim();
            if (/^\/\*\s+\/(?:index\.html|200\.html)/.test(trimmed)) {
              return false;
            }
            return true;
          });
          const cleaned = lines.join('\n').trim();
          if (cleaned.length === 0) {
            fs.unlinkSync(publicRedirects);
          } else {
            fs.writeFileSync(publicRedirects, cleaned + '\n');
          }
        }
      } catch (err) {
        console.warn('Note on Cloudflare SPA fallback setup:', err);
      }
    }
  };
}

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: true,
      },
      plugins: [react(), cloudflareSpaPlugin()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        emptyOutDir: true,
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                if (id.includes('mathlive')) return 'mathlive';
                if (id.includes('@tiptap') || id.includes('prosemirror')) return 'tiptap';
                if (id.includes('hyperformula') || id.includes('hot-formula-parser')) return 'hyperformula';
                if (id.includes('mammoth')) return 'mammoth';
                if (id.includes('lucide-react')) return 'lucide';
              }
            }
          }
        }
      }
    };
});