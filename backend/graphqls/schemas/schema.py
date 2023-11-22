import graphene
from .list_schema import ListType
from .card_schema import CardType
from ..resolvers import card_resolvers, list_resolvers

class Query(graphene.ObjectType):
    # List
    get_list = graphene.Field(ListType, id=graphene.String(required=True))
    # Card
    CardTypeList = graphene.List(CardType)
    get_card = graphene.Field(CardTypeList, key=graphene.String(required=True), listId=graphene.String(required=True))

    # List
    def resolve_get_list(self, info, id):
        return list_resolvers.resolve_get_list(id)

    # Card
    def resolve_get_card(self, info, key, listId):
        return card_resolvers.resolve_get_card(key, listId)

