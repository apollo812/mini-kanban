.PHONY: start-backend start-frontend start-db

start-frontend:
	cd frontend && docker-compose up --build

start-backend:
	cd backend && docker-compose up --build
	
start-db:
	docker-compose up db --build
