# Use an official Python base image
FROM nikolaik/python-nodejs:latest

# Set the working directory in the container
WORKDIR /app

# Define a build-time argument to specify the path to requirements.txt
ARG ANALYZER_ID

# Use the build argument to copy the specific requirements file
COPY ./${ANALYZER_ID}/requirements.txt /app/requirements.txt

# Create a virtual environment and install dependencies with pip
RUN python -m venv /app/venv && \
    /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install -r /app/requirements.txt

RUN npm install lighthouse

RUN apt-get update && apt-get install -y chromium

# Ensure commands and scripts run within the virtual environment
ENV PATH="/app/venv/bin:$PATH"

ENV CHROME_PATH=/usr/bin/chromium

# # Copy the rest of your application code to the container (as needed)
# COPY ./${ANALYZER_ID}/main.py /app

# Keep the container running for service-like behavior (adjust as needed)
CMD ["tail", "-f", "/dev/null"]


