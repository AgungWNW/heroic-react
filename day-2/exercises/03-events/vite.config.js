import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './exercises/03-events',
  server: {
    port: 3003,
  },
});
