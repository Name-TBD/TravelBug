import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4173
  },
  preview: {
    port: process.env.PORT || 4173
  }
});
