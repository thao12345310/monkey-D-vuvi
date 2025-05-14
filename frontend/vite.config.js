import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [tailwindcss(), react()],
        server: {
            port: parseInt(process.env.PORT || "5173"),
            host: true,
            proxy: {
                "/api": {
                    target: env.VITE_API_URL || "http://localhost:8080",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        define: {
            __DEV__: command === "serve",
        },
    };
});
