import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer()],
  css: {
    devSourcemap: true,
  },
  test: {
    environment: "jsdom",
  },
  // server: {
  //     allowedHosts: [
  //         "f4a4-2001-ee0-519a-62e0-d9db-7627-d09-c524.ngrok-free.app",
  //     ],
  // },
});
