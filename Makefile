up: up-backend up-frontend up-db
build: build-frontend build-backend
push: push-frontend push-backend

# build the project
build-frontend:
	cd frontend && docker-compose build
build-backend:
	cd backend && docker-compose build

# run the project
up-frontend:
	cd frontend && docker-compose up --build
up-backend:
	cd backend && docker-compose up --build
up-db:
	docker-compose up db --build

push-frontend:
	cd frontend && docker push gluck0101/mini-kanban-frontend:latest
push-backend:
	cd backend && docker push gluck0101/mini-kanban-backend:latest
