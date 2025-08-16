import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Variables de entorno
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8080')
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true, // Permite acceso desde cualquier IP
    cors: true,
    proxy: {
      // Solo en desarrollo, proxy al backend local
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Configuración de build para producción
  build: {
    outDir: 'dist',
    sourcemap: false, // Deshabilitado en producción por seguridad
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          axios: ['axios']
        }
      }
    },
    // Optimizaciones para producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs en producción
        drop_debugger: true
      }
    }
  },
  
  // Configuración de preview (para testing local del build)
  preview: {
    port: 4173,
    host: true,
    cors: true
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})
