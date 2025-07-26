import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        devSourcemap: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // server: {
    //     allowedHosts: [
    //         "f4a4-2001-ee0-519a-62e0-d9db-7627-d09-c524.ngrok-free.app",
    //     ],
    // },
});
