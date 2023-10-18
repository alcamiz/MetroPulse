# Use the official Python image as the base image
FROM python:latest

# Copy the requirements.txt file into the container
COPY ./requirements.txt .

# Install the Python packages from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the working directory within the container
WORKDIR /usr/python

# Specify the command to run your Flask application (you can adjust this as needed)
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:8080", "endpoints:app"]