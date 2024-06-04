# Use official Node.js image as base
FROM node:18-alpine


# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the backend application to the container
COPY . .

# Expose the port on which the backend will run
# EXPOSE 3001

# Command to start the backend server
CMD ["node", "server.js"]

