import graphene
from models.card_model import CardModel
from graphqls.schemas.card_schema import CardType

class CreateCard(graphene.Mutation):
    class Arguments:
        # Arguments for creating a card
        pass

    card = graphene.Field(CardType)

    def mutate(self, info, list_id, index, text):
        # Logic to create a card
        return CreateCard(card=CardModel("1", list_id, index, text))

# Define update and delete mutations as needed
