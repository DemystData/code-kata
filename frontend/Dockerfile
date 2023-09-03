# Use an official Node.js runtime as the base image for frontend
FROM node:18

# Set the working directory to /app/frontend
WORKDIR /app/frontend

# Copy the frontend files to the container
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./

# Expose the port for the frontend
EXPOSE 3000

# Specify the command to run the frontend
CMD ["npm", "start"]