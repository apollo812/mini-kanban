import uuid
import graphene
from models.list_model import ListModel
from ..schemas.list_schema import ListType
from database.dynamodb_client import get_dynamodb_client
from utils.time import time2graphql
from datetime import datetime

class CreateList(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        sort = graphene.String(required=True)

    list = graphene.Field(ListType)

    def mutate(self, info, title, sort):
        dynamodb = get_dynamodb_client(local=True)
        table = dynamodb.Table('Lists')
        id = title.replace(" ", "-").lower() + '-' + str(uuid.uuid4())
        current_datetime = time2graphql()
        table.put_item(Item={'id': id, 'title': title, 'sort': sort, 'created': current_datetime, 'updated': current_datetime})
        return CreateList(list=ListModel(id, title, sort, current_datetime, current_datetime))

