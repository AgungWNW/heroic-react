import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './exercises/04-state',
  server: {
    port: 3004,
  },
});
