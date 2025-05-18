# Use official Node image for building backend
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy only backend folder
COPY ../../backend/ ./

# Install dependencies
RUN npm install --only=production

# Final image
FROM gcr.io/distroless/nodejs18-debian11

# Copy backend from builder stage
COPY --from=builder /app /app

WORKDIR /app
EXPOSE 3000

CMD ["server.js"]
