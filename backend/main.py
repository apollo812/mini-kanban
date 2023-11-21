import os
import sys

# Get the current script's directory
current_script_directory = os.path.dirname(os.path.abspath(__file__))

# Get the project root path
project_root = os.path.abspath(os.path.join(current_script_directory, os.pardir))

# Append the project root and current script directory to the system path
sys.path.append(project_root)
sys.path.append(current_script_directory)

from fastapi import FastAPI
from graphqls.schemas.schema import Query
from graphqls.mutations.mutations import Mutation
from graphene import Schema
from starlette_graphene3 import GraphQLApp, make_playground_handler #,make_graphiql_handler


app = FastAPI(title='mini-kanban-backend', description='GraphQL APIs')


schema = Schema(query=Query, mutation=Mutation)

# testing api basic Hello World
@app.get("/")
async def root():
    return {"message": "Hello World"}


# Mount the GraphQL app
app.mount("/graphql", GraphQLApp(schema=schema, on_get=make_playground_handler()))

# app.include_router(kanban_router, prefix="/kanban", tags=["kanban"])
