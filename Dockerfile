# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY backend/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY backend/ .

# Expose the port that your Express.js app is listening on
EXPOSE 5000

# Start the Express.js application
CMD [ "node", "server.js" ]
