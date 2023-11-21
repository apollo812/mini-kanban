import graphene
from .list_mutations import CreateList
from .card_mutations import CreateCard

class Mutation(graphene.ObjectType):
    create_list = CreateList.Field()
    create_card = CreateCard.Field()

# Add more mutations as necessary
