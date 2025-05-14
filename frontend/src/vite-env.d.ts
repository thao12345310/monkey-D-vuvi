interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_DB_NAME?: string;
    readonly VITE_DB_USERNAME?: string;
    readonly VITE_DB_PASSWORD?: string;
    readonly VITE_DB_URL?: string;
    readonly VITE_FRONTEND_PORT?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
