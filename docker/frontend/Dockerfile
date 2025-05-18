# Use nginx base image to serve static files
FROM nginx:alpine

# Copy your static frontend files into the nginx HTML directory
COPY ../../frontend /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
