import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/chat.php': {
        target: 'http://localhost/DACS/public',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat\.php/, '/chat.php'),
      },
      '/add_guestbook.php': {
        target: 'http://localhost/DACS/public/guestbook_backend', // ✅ sửa lại chính xác
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/add_guestbook\.php/, '/add_guestbook.php'),
      },
      '/list_guestbook.php': {
        target: 'http://localhost/DACS/public/guestbook_backend',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/list_guestbook\.php/, '/list_guestbook.php'),
      },
    },
  },
})
