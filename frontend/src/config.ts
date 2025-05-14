/// <reference types="vite/client" />

// src/config.ts

// Define environment variables interface to match Vite's types
interface ImportMetaEnv {
    readonly VITE_BACKEND_HOST: string;
    readonly VITE_BACKEND_PORT: string;
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

// Determine the protocol based on the environment and hostname
const isLocalhost = (host: string) => {
    return host === "localhost" || host === "backend" || host.includes("127.0.0.1");
};

const getProtocol = (host: string) => {
    return isLocalhost(host) ? "http" : "https";
};

const getWsProtocol = (host: string) => {
    return isLocalhost(host) ? "ws" : "wss";
};

const backendHost = import.meta.env.VITE_BACKEND_HOST || "localhost";
const backendPort = import.meta.env.VITE_BACKEND_PORT || "8080";
const protocol = getProtocol(backendHost);
const wsProtocol = getWsProtocol(backendHost);

const config: Config = {
    api: {
        // API URL for client-side requests
        url: `${protocol}://${backendHost}${backendPort ? `:${backendPort}` : ""}`,
        // Backend host for server-side communication
        baseUrl: `${protocol}://${backendHost}${backendPort ? `:${backendPort}` : ""}`,
        // WebSocket URL
        wsUrl: `${wsProtocol}://${backendHost}${backendPort ? `:${backendPort}` : ""}`,
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
