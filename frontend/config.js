import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/produtos': 'http://localhost:8081',
      '/campanhas': 'http://localhost:8081',
      '/metricas': 'http://localhost:8081',
    },
  },
});