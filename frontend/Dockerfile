# Use official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy all files from the current directory to the container
COPY . ./

# Build the React app
RUN npm run build

# Start the app
CMD ["npm", "start"]
