# Use an official Python runtime as a parent image
FROM python:3.6

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

ARG requirements=requirements/requirements_prod.txt
ENV DJANGO_SETTINGS_MODULE=clairvoyance.settings.settings_prod

# Install Python dependencies
COPY requirements/ /app/backend/requirements
RUN pip3 install --upgrade pip -r $requirements

# Add the rest of the code
COPY . /app/backend

# Make port 8000 available for the app
EXPOSE 8000

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD python3 manage.py runserver 0.0.0.0:8000