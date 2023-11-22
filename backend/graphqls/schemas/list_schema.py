import graphene
from models.list_model import ListModel

class ListType(graphene.ObjectType):
    id = graphene.String()
    title = graphene.String()
    sort = graphene.String()
    created = graphene.String()
    updated = graphene.String()

