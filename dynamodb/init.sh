#!/bin/bash

aws dynamodb create-table --cli-input-json file:///dynamodb/lists-table.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file:///dynamodb/cards-table.json --endpoint-url http://localhost:8000
