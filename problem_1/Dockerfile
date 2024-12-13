# Use an official Python runtime as a base image
FROM python:3.12-slim

WORKDIR /src

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
