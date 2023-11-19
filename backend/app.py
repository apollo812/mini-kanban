from fastapi import FastAPI

from starlette.responses import RedirectResponse
from starlette.status import HTTP_201_CREATED


# Create a FastAPI application
app = FastAPI(swagger_ui_parameters={"tryItOutEnabled": True})


# Define a route to handle the root endpoint and redirect to the API documentation
@app.get("/")
async def root():
    return RedirectResponse(app.docs_url)
