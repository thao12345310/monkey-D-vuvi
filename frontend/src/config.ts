// src/config.ts

const config = {
    api: {
      url: import.meta.env.VITE_API_URL || "http://localhost:8080",
    },
    db: {
      name: import.meta.env.VITE_DB_NAME || "monkey_d_vuvi",
      username: import.meta.env.VITE_DB_USERNAME || "admin",
      password: import.meta.env.VITE_DB_PASSWORD || "admin",
      url: import.meta.env.VITE_DB_URL || "jdbc:postgresql://host.docker.internal:5432/monkey_d_vuvi",
    },
    frontend: {
      port: import.meta.env.VITE_FRONTEND_PORT || "5173",
    },
  };
  
  export default config;
  