# Use official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json package-lock.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy all files from the current directory to the container
COPY . ./

# Build the React app
RUN npm run build

# Start the app
CMD ["npm", "start"]
