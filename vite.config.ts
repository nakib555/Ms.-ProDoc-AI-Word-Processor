import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 2500,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                if (id.includes('lucide-react')) return 'lucide';
                if (id.includes('mathlive')) return 'mathlive';
                if (id.includes('@tiptap') || id.includes('prosemirror')) return 'tiptap';
                if (id.includes('@google/genai')) return 'genai';
                if (id.includes('mammoth')) return 'mammoth';
                if (id.includes('puppeteer')) return 'puppeteer';
                if (id.includes('hyperformula')) return 'hyperformula';
              }
            }
          }
        }
      }
    };
});