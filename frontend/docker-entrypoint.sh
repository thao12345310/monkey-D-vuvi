#!/bin/sh

# Replace environment variables in nginx configuration
envsubst '${VITE_API_URL} ${VITE_BACKEND_HOST} ${VITE_WS_URL} ${PORT} ${SERVER_NAME} ${CORS_ALLOWED_ORIGIN}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'