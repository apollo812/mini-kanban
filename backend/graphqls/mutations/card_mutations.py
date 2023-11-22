import uuid
import graphene
from models.card_model import CardModel
from ..schemas.card_schema import CardType
from database.dynamodb_client import get_dynamodb_client
from utils.time import time2graphql

class CreateCard(graphene.Mutation):
    class Arguments:
        listId = graphene.String(required=True)
        text = graphene.String(required=True)
        pass

    card = graphene.Field(CardType)

    def mutate(self, info, listId, text):
        dynamodb = get_dynamodb_client(local=True)
        table = dynamodb.Table('Cards')
        key = str(uuid.uuid4())
        current_datetime = time2graphql()
        table.put_item(Item={'id': key, 'key': key, 'listId': listId, 'index': 0, 'text': text, 'editMode': False, 'created': current_datetime, 'updated': current_datetime})
        return CreateCard(card=CardModel(key, key, listId, 0, text, False, current_datetime, current_datetime))

