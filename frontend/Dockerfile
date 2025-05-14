# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create entrypoint script
RUN echo '#!/bin/sh\n\
envsubst "\$VITE_BACKEND_HOST \$VITE_API_URL" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf\n\
nginx -g "daemon off;"' > /docker-entrypoint.sh \
    && chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Start nginx with environment variables
ENTRYPOINT ["/docker-entrypoint.sh"]