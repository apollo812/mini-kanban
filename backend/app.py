from fastapi import FastAPI

# Create a FastAPI application
app = FastAPI(swagger_ui_parameters={"tryItOutEnabled": True})

# Define a route to handle the root endpoint and redirect to the API documentation
@app.get("/")
async def root():
    return RedirectResponse(app.docs_url)
