#!/bin/sh

# Replace environment variables in nginx configuration
envsubst '${VITE_BACKEND_HOST} ${VITE_BACKEND_PORT}  ${PORT} ${SERVER_NAME} ${CORS_ALLOWED_ORIGIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'