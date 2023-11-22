import graphene
from models.card_model import CardModel

class CardType(graphene.ObjectType):
    id = graphene.String()
    key = graphene.String()
    listId = graphene.String()
    index = graphene.Int()
    text = graphene.String()
    editMode = graphene.Boolean()
    created = graphene.String()
    updated = graphene.String()
