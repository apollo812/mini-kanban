from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp
from schemas.kanban_schema import schema
from api.kanban import router as kanban_router

app = FastAPI()

# Mount the GraphQL app
app.add_route("/graphql", GraphQLApp(schema=schema, playground=True))

app.include_router(kanban_router, prefix="/kanban", tags=["kanban"])
