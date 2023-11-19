from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp
import uvicorn
from schemas.kanban_schema import schema

app = FastAPI()

# Mount the GraphQL app
app.add_route("/graphql", GraphQLApp(schema=schema, playground=True))
