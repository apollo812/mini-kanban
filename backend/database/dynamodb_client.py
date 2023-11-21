import boto3

def get_dynamodb_client():
    return boto3.client('dynamodb')

# Expand this to include methods for CRUD operations on DynamoDB
