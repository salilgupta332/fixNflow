# Use official Node.js LTS image as base
FROM node:18

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app using nodemon or node
CMD ["node", "server.js"]
