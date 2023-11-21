import graphene
from .list_schema import ListType
from .card_schema import CardType
from models.list_model import ListModel
from models.card_model import CardModel
from database.dynamodb_client import get_dynamodb_client

class Query(graphene.ObjectType):
    lists = graphene.List(ListType)
    cards = graphene.List(CardType)

    def resolve_lists(self, info):
        # Here you'll implement the logic to fetch data from DynamoDB
        dynamodb = get_dynamodb_client()
        # Example: Fetching data from DynamoDB (you need to implement the actual logic)
        # items = dynamodb.scan(TableName='YourTableName')['Items']
        # return [ListModel(item['id'], item['title'], item['sort']) for item in items]
        return []  # Replace with actual data

    def resolve_cards(self, info):
        # Implement the logic to fetch cards from DynamoDB
        dynamodb = get_dynamodb_client()
        # Example: Fetching data from DynamoDB (implement actual logic)
        # items = dynamodb.scan(TableName='YourCardTableName')['Items']
        # return [CardModel(...) for item in items]
        return []  # Replace with actual data

# Optionally, add filtering capabilities to these queries
