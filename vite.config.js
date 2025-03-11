import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure we don't inline assets under this size
    assetsInlineLimit: 4096,
    // Explicitly copy these directories to output
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Ensure public directory is correctly processed
  publicDir: 'public',
  // Resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Add favicon replacement logic
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (filename === 'vite.svg') {
        return '/jijah-16.png';
      }
      return filename;
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})