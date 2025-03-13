# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the application port (change if necessary)
EXPOSE 4002

# Start the application (use `node dist/index.js` if build output is in dist/)
CMD ["node", "dist/server.js"]