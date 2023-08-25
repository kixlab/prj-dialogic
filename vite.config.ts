import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://ec2-43-201-59-27.ap-northeast-2.compute.amazonaws.com',
  plugins: [react(), tsconfigPaths(), ssr({
    baseAssets: 'http://ec2-43-201-59-27.ap-northeast-2.compute.amazonaws.com',
    // baseServer: 'http://ec2-43-201-59-27.ap-northeast-2.compute.amazonaws.com'
  })],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
  },
})
