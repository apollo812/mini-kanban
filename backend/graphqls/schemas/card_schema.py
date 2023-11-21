import graphene
from models.card_model import CardModel
# Import the database client if needed

class CardType(graphene.ObjectType):
    key = graphene.String()
    list_id = graphene.String()
    index = graphene.Int()
    text = graphene.String()
    editMode = graphene.Boolean()
    created = graphene.DateTime()
    updated = graphene.DateTime()

# Define any other necessary GraphQL fields and types for CardModel
