import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const gaMeasurementId = process.env.VITE_GA_MEASUREMENT_ID || env.VITE_GA_MEASUREMENT_ID || 'G-QFYBNQCTYD';
    const metaPixelId = process.env.VITE_META_PIXEL_ID || env.VITE_META_PIXEL_ID || '1627665848697345';
    process.env.VITE_GA_MEASUREMENT_ID = gaMeasurementId;
    process.env.VITE_META_PIXEL_ID = metaPixelId;

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_GA_MEASUREMENT_ID': JSON.stringify(gaMeasurementId),
        'import.meta.env.VITE_META_PIXEL_ID': JSON.stringify(metaPixelId),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
