import graphene
from datetime import datetime
from .resolvers import resolve_list, resolve_card

class List(graphene.ObjectType):
    id = graphene.String()
    title = graphene.String()
    sort = graphene.String()

class Card(graphene.ObjectType):
    key = graphene.String()
    list_id = graphene.String()
    index = graphene.Int()
    text = graphene.String()
    editMode = graphene.Boolean()
    created = graphene.DateTime()
    updated = graphene.DateTime()

class Query(graphene.ObjectType):
    list = graphene.Field(List, key=graphene.String(required=True))
    card = graphene.Field(Card, key=graphene.String(required=True), list_id=graphene.String(required=True))

    def resolve_list(self, info, key):
        return resolve_list(key)

    def resolve_card(self, info, key, list_id):
        return resolve_card(key, list_id)

schema = graphene.Schema(query=Query)
