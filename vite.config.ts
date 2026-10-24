import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
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