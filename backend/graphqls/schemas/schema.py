import graphene
from .list_schema import ListType
from .card_schema import CardType
from ..resolvers import card_resolvers, list_resolvers

class Query(graphene.ObjectType):
    # List
    get_list = graphene.Field(ListType, id=graphene.String(required=True))
    # Card
    get_card = graphene.Field(CardType, key=graphene.String(required=True), list_id=graphene.String(required=True))

    # List
    def resolve_get_list(self, info, id):
        return list_resolvers.resolve_get_list(id)

    # Card
    def resolve_get_card(self, info, key, list_id):
        return card_resolvers.resolve_get_card(key, list_id)

# Optionally, add filtering capabilities to these queries
