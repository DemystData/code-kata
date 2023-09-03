# Use an official Python runtime as the base image for backend
FROM python:3.11.3

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app/backend
WORKDIR /app/backend

# Install Flask and other dependencies
RUN pip3 install Flask Flask-CORS requests

# Copy the backend files to the container
COPY backend ./

# Expose the port for the backend
EXPOSE 5003

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor

# Copy the Supervisor configuration file to the container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Specify the command to run Supervisor
CMD ["supervisord", "-n"]