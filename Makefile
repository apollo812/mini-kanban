SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

targets: help

## Run the application
up: up-backend up-frontend up-db

## Build the application
build: build-frontend build-backend

## Push the application to docker hub
push: push-frontend push-backend

# Build the project
build-frontend:
	cd frontend && docker-compose build
build-backend:
	cd backend && docker-compose build

# Run the project
up-frontend:
	cd frontend && docker-compose up --build
up-backend:
	cd backend && docker-compose up --build
up-db:
	docker-compose up db --build

# Push the project to docker hub
push-frontend:
	cd frontend && docker push gluck0101/mini-kanban-frontend:latest
push-backend:
	cd backend && docker push gluck0101/mini-kanban-backend:latest

done: api_test ui_test ## Prepare for a commit
api_test: utest itest  ## Run unit and integration tests

ci-docker-compose := docker-compose -f .ci/docker-compose.yml

utest: cleantest ## Run unit tests
	$(ci-docker-compose) run --rm unit pytest -m unit .

itest: cleantest ## Run integration tests
	$(ci-docker-compose) run --rm integration pytest -m integration .

cleantest:  ## Clean up test containers
	$(ci-docker-compose) build
	$(ci-docker-compose) down --remove-orphans

ui_test:	## Run interface test
	$(ci-docker-compose) run --rm interface npm test -- --watchAll=false interface .
