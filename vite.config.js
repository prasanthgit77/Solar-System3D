// vite.config.js
export default {
  base: './', // ensures relative paths for assets so they work on Vercel
  build: {
    outDir: 'dist', // Vercel looks for this directory by default
    emptyOutDir: true // clears old files before building
  }
}
