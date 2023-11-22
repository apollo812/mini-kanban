import graphene
from models.card_model import CardModel
from ..schemas.card_schema import CardType
from database.dynamodb_client import get_dynamodb_client
from utils.time import time2graphql
from boto3.dynamodb.conditions import Attr

class CreateCard(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        listId = graphene.String(required=True)
        text = graphene.String(required=True)
        pass

    card = graphene.Field(CardType)

    def mutate(self, info, id, listId, text):
        dynamodb = get_dynamodb_client(local=True)
        table = dynamodb.Table('Cards')
        current_datetime = time2graphql()

        card_cnt = len(table.scan(
            FilterExpression=Attr('listId').eq(listId)
        )['Items'])

        table.put_item(Item={'id': id, 'key': id, 'listId': listId, 'index': card_cnt, 'text': text, 'editMode': False, 'created': current_datetime, 'updated': current_datetime})
        return CreateCard(card=CardModel(id, id, listId, card_cnt, text, False, current_datetime, current_datetime))

