# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application with source maps
ENV NODE_ENV=development
RUN npm run build

# Production stage
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Create nginx templates directory
RUN mkdir -p /etc/nginx/templates/

# Copy nginx configuration to templates directory
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built files and source maps from build stage
COPY --from=build /app/dist /usr/share/nginx/html/
COPY --from=build /app/src /usr/share/nginx/html/src/

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set proper permissions for nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx with environment variables
ENTRYPOINT ["/docker-entrypoint.sh"]