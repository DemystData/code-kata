# Use a lightweight Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the required files individually
COPY Q1_final_def.py /app/
COPY Q1_w_testcase.py /app/
COPY spec.json /app/

# Install required dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install faker

# Install required dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install pytest

# Set the default command to run the main script
CMD ["python", "Q1_w_testcase.py"]