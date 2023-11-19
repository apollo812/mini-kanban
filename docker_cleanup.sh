#!/bin/bash

# chmod +x docker_cleanup.sh
# ./docker_cleanup.sh
# Function to stop and remove containers
stop_and_remove_containers() {
    # Check if there are any running containers
    if [ -n "$(docker ps -aq)" ]; then
        # Stop all running containers
        echo "Stopping all Docker containers..."
        docker stop $(docker ps -aq)

        # Remove all containers
        echo "Removing all Docker containers..."
        docker rm $(docker ps -aq)
    else
        echo "No running Docker containers to stop."
    fi
}

# Function to remove images
remove_images() {
    # Check if there are any images
    if [ -n "$(docker images -q)" ]; then
        # Remove all Docker images
        echo "Removing all Docker images..."
        docker rmi $(docker images -q)
    else
        echo "No Docker images to remove."
    fi
}

# Stop and remove containers
stop_and_remove_containers

# Remove images
remove_images

# Clean up dangling images and layers
echo "Cleaning up dangling images..."
docker image prune -a -f

# Remove unused volumes
echo "Removing unused Docker volumes..."
docker volume prune -f

# Remove unused networks
echo "Removing unused Docker networks..."
docker network prune -f

# Perform a system-wide prune (optional)
echo "Performing Docker system prune..."
docker system prune -a -f --volumes

echo "Docker cleanup complete."
