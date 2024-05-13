# Use official Node.js image as base
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY ./package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the frontend application to the container
COPY ./public ./public/
COPY ./src ./src/

# Expose the port on which the frontend will run (if needed)
# EXPOSE 3000

# Command to start the frontend server
CMD ["npm", "start"]

