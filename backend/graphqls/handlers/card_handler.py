from database.dynamodb_client import get_dynamodb_client
from boto3.dynamodb.conditions import Attr

class CardHandler:
    def __init__(self):
        self.dynamodb = get_dynamodb_client(local=True)
        self.table = self.dynamodb.Table('Cards')

    def get_card(self, key, listId):
        response = self.table.scan(
            FilterExpression=Attr('key').eq(key) & Attr('listId').eq(listId)
        )
        return response['Items']
