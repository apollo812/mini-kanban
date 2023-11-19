from fastapi import APIRouter
from schemas.kanban_schema import schema

router = APIRouter()

@router.post("/query")
async def query_graphql(query: str):
    result = schema.execute(query)
    return result