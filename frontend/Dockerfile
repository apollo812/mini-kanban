# Use official Node.js image as the base image
FROM node:16 as base

# Define a build argument named PROJECT with a default value of 'api'.
ARG PROJECT=frontend

# Set the working directory in the container
WORKDIR /app


FROM base as dev

# Copy package.json to the container
COPY ./package*.json ./
# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy all files from the current directory to the container
COPY . ./
# Start the app
CMD ["npm", "start"]


FROM base as test

# Copy package.json to the container
COPY /frontend/package*.json ./
# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy all files from the current directory to the container
COPY ./$PROJECT ./
# Build the React app
RUN npm run build
# Start the test
CMD [ "npm", "test" ]

# Set the default target stage to 'dev'.
FROM dev
