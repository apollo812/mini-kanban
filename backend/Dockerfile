# Dockerfile for backend service
FROM python:3.10.12-slim-bullseye as base

# Define a build argument named PROJECT with a default value of 'api'.
ARG PROJECT=backend

# Create a non-root user to run the app with.
RUN groupadd --gid 1000 user &&  adduser --disabled-password --gecos '' --uid 1000 --gid 1000 user

# Set the working directory for the subsequent commands.
WORKDIR /app


# Switch to the non-root user for security purposes.
USER user

# Create a new stage named 'dev' based on the 'base' stage.
FROM base as dev

USER root
# Copy the requirements.txt file and install the Python dependencies.
COPY --chown=user:user ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

USER user
# Copy the project files into the container.
COPY --chown=user:user . ./
# Define the command to run when the container starts.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]

# Create a new stage named 'test' based on the 'base' stage.
FROM base as test

# Copy the requirements.txt file and install the Python dependencies.
COPY --chown=user:user /backend/requirements-test.txt ./
RUN pip install --no-cache-dir -r requirements-test.txt

USER root
# Copy the project files into the container.
COPY --chown=user:user ./$PROJECT /app/$PROJECT
# Create a directory for mypy cache and change its ownership to the non-root user.
RUN mkdir /app/.mypy_cache && chown user:user -R /app/.mypy_cache
# Install pytest within the test stage
RUN pip install pytest

# Define the default command to run when the container starts in the test stage
CMD ["pytest"]
# Switch back to the non-root user
USER user

# Set the default target stage to 'dev'.
FROM dev