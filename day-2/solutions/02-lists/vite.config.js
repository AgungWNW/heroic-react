import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './solutions/02-lists',
  server: {
    port: 3012,
  },
});
