# mini-kanban

## 1. Overview

- The Trello/Kanban like interface must be implemented from scratch not re-using a fully featured Kanban board package.
- However the drag and drop functionality can leverage a react library
- An option to order the cards by date of creation or by custom
- Run App in Docker container

## 2. Technology

### Frontend: React / Hooks + Tailwind css (or equivalent) / Apollo Client GraphQL (no redux preferably)

I created the Mini Kanban Board using React, without using Redux but with useReducer.  
I used React hooks, Tailwind CSS, and Apollo Client. 🚀

### Backend: Python / Graphene + DB: DynamoDB Local

I built the backend using python-graphene, FastAPI, and DynamoDB local. 🚀

### CI/CD + Docker + Docker-compose + Github action + Makefile

I set up the CI/CD pipeline with Docker, Docker-Compose, GitHub Actions, and a Makefile for infrastructure configuration. 🐳🚀

## 3. Usage

### Git clone
``git clone https://github.com/apollo812/mini-kanban.git``
``cd mini-kanban``

### Run the project
``make up``

- Fronend: ``hosting localhost:3000``
- GraphQL: ``hosting localhost:5000/grapgql``

### Build the project
``make build``

## 4. Docker hub link

### Backend
https://hub.docker.com/repository/docker/gluck0101/mini-kanban-backend

### Frontend
https://hub.docker.com/repository/docker/gluck0101/mini-kanban-frontend

## 5. Loom

https://www.loom.com/share/d8c07c91c42d484888df0048b144eab8
