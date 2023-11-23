import graphene
from .list_schema import ListType
from .card_schema import CardType
from ..resolvers import card_resolvers, list_resolvers

class Query(graphene.ObjectType):
    # List
    ListTypeList = graphene.List(ListType)
    get_list = graphene.Field(ListType, id=graphene.String(required=True))
    get_all_list = graphene.Field(ListTypeList)

    # Card
    CardTypeList = graphene.List(CardType)
    get_card = graphene.Field(CardTypeList, key=graphene.String(required=True), listId=graphene.String(required=True))
    get_all_card = graphene.Field(CardTypeList)
    del_card = graphene.Field(graphene.Boolean, id=graphene.String(required=True))

    # List
    def resolve_get_list(self, info, id):
        return list_resolvers.resolve_get_list(id)
    def resolve_get_all_list(self, info):
        return list_resolvers.resolve_get_all_list()

    # Card
    def resolve_get_card(self, info, key, listId):
        return card_resolvers.resolve_get_card(key, listId)
    def resolve_get_all_card(self, info):
        return card_resolvers.resolve_get_all_card()
    def resolve_del_card(self, info, id):
        return card_resolvers.resolve_del_card(id)

