# Use official Node.js runtime as a lightweight base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package manifest and install dependencies first for better caching
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy application source code
COPY . .

# Expose the port the app listens on
EXPOSE 5000

# Default command to run the application
CMD ["npm", "start"]
