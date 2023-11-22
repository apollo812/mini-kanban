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

class CardIndexDragToOther(graphene.Mutation):
    class Arguments:
        cardListId = graphene.String(required=True)
        targetListId = graphene.String(required=True)
        cardPos = graphene.Int(required=True)
        targetPos = graphene.Int(required=True)
        pass

    cards = graphene.List(CardType) 

    def mutate(self, info, cardListId, targetListId, cardPos, targetPos):
        dynamodb = get_dynamodb_client(local=True)
        table = dynamodb.Table('Cards')

        cards = graphene.List(CardType)

        card_cnt = len(table.scan(
            FilterExpression=Attr('listId').eq(cardListId)
        )['Items'])
        target_cnt = len(table.scan(
            FilterExpression=Attr('listId').eq(targetListId)
        )['Items'])

        data_card = table.scan(
            FilterExpression=Attr('listId').eq(cardListId) & Attr('index').eq(cardPos)
        )['Items']

        for num in range(targetPos, target_cnt):
            tmp_card = table.scan(
                FilterExpression=Attr('listId').eq(targetListId) & Attr('index').eq(num)
            )['Items']
            table.put_item(Item={'id': tmp_card[0]['id'], 'key': tmp_card[0]['key'], 'listId': tmp_card[0]['listId'], 'index': tmp_card[0]['index'] + 1, 'text': tmp_card[0]['text'], 'editMode': False, 'created': tmp_card[0]['created'], 'updated': tmp_card[0]['updated']})
        
        table.put_item(Item={'id': data_card[0]['id'], 'key': data_card[0]['key'], 'listId': targetListId, 'index': targetPos, 'text': data_card[0]['text'], 'editMode': False, 'created': data_card[0]['created'], 'updated': data_card[0]['updated']})
        
        for num in range(cardPos + 1, cardPos):
            tmp_card = table.scan(
                FilterExpression=Attr('listId').eq(cardListId) & Attr('index').eq(num)
            )['Items']
            table.put_item(Item={'id': tmp_card[0]['id'], 'key': tmp_card[0]['key'], 'listId': tmp_card[0]['listId'], 'index': tmp_card[0]['index'] - 1, 'text': tmp_card[0]['text'], 'editMode': False, 'created': tmp_card[0]['created'], 'updated': tmp_card[0]['updated']})
        
        card_data = table.scan(
            FilterExpression=Attr('listId').eq(cardListId) | Attr('listId').eq(targetListId)
        )['Items']

        return CardIndexDrag(cards=card_data)

class CardIndexDrag(graphene.Mutation):
    class Arguments:
        listId = graphene.String(required=True)
        cardPos = graphene.Int(required=True)
        targetPos = graphene.Int(required=True)
        pass

    cards = graphene.List(CardType)

    def mutate(self, info, listId, cardPos, targetPos):
        dynamodb = get_dynamodb_client(local=True)
        table = dynamodb.Table('Cards')

        if cardPos > targetPos:  #drag up
            tmp_card = table.scan(
                FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(cardPos)
            )['Items']
            target_card = table.scan(
                FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(targetPos)
            )['Items']
            table.put_item(Item={'id': data_card[0]['id'], 'key': data_card[0]['key'], 'listId': data_card[0]['listId'], 'index': targetPos, 'text': data_card[0]['text'], 'editMode': False, 'created': data_card[0]['created'], 'updated': data_card[0]['updated']})
            table.put_item(Item={'id': target_card[0]['id'], 'key': target_card[0]['key'], 'listId': target_card[0]['listId'], 'index': targetPos + 1, 'text': target_card[0]['text'], 'editMode': False, 'created': target_card[0]['created'], 'updated': target_card[0]['updated']})
            
            for num in range(targetPos + 1, cardPos):
                data = table.scan(
                    FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(num)
                )['Items']
                table.put_item(Item={'id': data[0]['id'], 'key': data[0]['key'], 'listId': data[0]['listId'], 'index': num + 1, 'text': data[0]['text'], 'editMode': False, 'created': data[0]['created'], 'updated': data[0]['updated']})
        
        if cardPos < targetPos:  #drag down
            data_card = table.scan(
                FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(cardPos)
            )['Items']
            target_card = table.scan(
                FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(targetPos)
            )['Items']
            print("data_card", data_card)
            print("target_card", target_card)
            table.put_item(Item={'id': data_card[0]['id'], 'key': data_card[0]['key'], 'listId': data_card[0]['listId'], 'index': targetPos, 'text': data_card[0]['text'], 'editMode': False, 'created': data_card[0]['created'], 'updated': data_card[0]['updated']})
            table.put_item(Item={'id': target_card[0]['id'], 'key': target_card[0]['key'], 'listId': target_card[0]['listId'], 'index': targetPos - 1, 'text': target_card[0]['text'], 'editMode': False, 'created': target_card[0]['created'], 'updated': target_card[0]['updated']})
            
            for num in range(cardPos + 1, targetPos):
                data = table.scan(
                    FilterExpression=Attr('listId').eq(listId) & Attr('index').eq(num)
                )['Items']
                table.put_item(Item={'id': data[0]['id'], 'key': data[0]['key'], 'listId': data[0]['listId'], 'index': num - 1, 'text': data[0]['text'], 'editMode': False, 'created': data[0]['created'], 'updated': data[0]['updated']})

        card_data = table.scan(
            FilterExpression=Attr('listId').eq(listId)
        )['Items']

        return CardIndexDrag(cards=card_data)
    
