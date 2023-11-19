.PHONY: start-frontend start-backend start-db

start-frontend:
	cd frontend && docker-compose up

start-backend:
	cd backend && docker-compose up
	
start-db:
	docker-compose up db
