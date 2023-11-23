import os
import time

import pytest
from starlette.testclient import TestClient

from backend.main import app        # Import the FastAPI application instance from the main module


# Unit test to check the sanity of the testing setup
@pytest.mark.unit
def test_sanity():
    assert 1 != 0               # Assert that 1 is not equal to 0, ensuring the minimal sanity of the test setup


# Integration test to validate the API behavior
@pytest.mark.integration
def test_api():
    time.sleep(1)               # Introduce a 1-second delay to emulate an asynchronous operation
    client = TestClient(app)    # Create a test client for the FastAPI application
