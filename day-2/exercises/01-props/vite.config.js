import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './exercises/01-props',
  server: {
    port: 3001,
  },
});
