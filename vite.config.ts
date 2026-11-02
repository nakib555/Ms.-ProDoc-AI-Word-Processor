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
    buildStart() {
      // 1. Pre-build: Remove any problematic source redirect files
      const targets = [
        path.resolve(__dirname, 'public', '_redirects'),
        path.resolve(__dirname, '_redirects'),
        path.resolve(__dirname, 'dist', '_redirects')
      ];
      targets.forEach(file => {
        try {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
          }
        } catch {
          // Ignore if file cannot be removed
        }
      });
    },
    generateBundle(_, bundle) {
      // 2. Bundle generation: Ensure Vite never writes _redirects into dist
      for (const fileName of Object.keys(bundle)) {
        if (fileName === '_redirects' || fileName.endsWith('/_redirects')) {
          delete bundle[fileName];
        }
      }
    },
    closeBundle() {
      // 3. Post-build: Ensure 200.html exists for SPA fallback, and verify dist/_redirects is absent
      try {
        const distDir = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const fallbackPath = path.join(distDir, '200.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, fallbackPath);
        }

        const distRedirects = path.join(distDir, '_redirects');
        if (fs.existsSync(distRedirects)) {
          fs.unlinkSync(distRedirects);
        }

        const publicRedirects = path.resolve(__dirname, 'public', '_redirects');
        if (fs.existsSync(publicRedirects)) {
          fs.unlinkSync(publicRedirects);
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