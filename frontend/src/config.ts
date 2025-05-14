/// <reference types="vite/client" />

// src/config.ts

// Define environment variables interface to match Vite's types
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_BACKEND_HOST: string;
    readonly VITE_WS_URL: string;
    readonly PORT: string | undefined;
    readonly SERVER_NAME: string;
    readonly CORS_ALLOWED_ORIGIN: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Config interface for type safety
interface Config {
    api: {
        url: string;
        baseUrl: string;
        wsUrl: string;
    };
    server: {
        port: string | number;
        host: string;
        cors: {
            origin: string;
        };
    };
    env: {
        mode: string;
        isDevelopment: boolean;
        isProduction: boolean;
    };
}

const config: Config = {
    api: {
        // API URL for client-side requests
        url: import.meta.env.VITE_API_URL || "http://localhost:8080",
        // Backend host for server-side communication
        baseUrl: `http://${import.meta.env.VITE_BACKEND_HOST || "backend:8080"}`,
        // WebSocket URL
        wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:8080",
    },
    server: {
        port: import.meta.env.PORT || 5173,
        host: import.meta.env.SERVER_NAME || "localhost",
        cors: {
            origin: import.meta.env.CORS_ALLOWED_ORIGIN || "*",
        },
    },
    env: {
        mode: import.meta.env.MODE,
        isDevelopment: import.meta.env.DEV,
        isProduction: import.meta.env.PROD,
    },
};

export default config;
