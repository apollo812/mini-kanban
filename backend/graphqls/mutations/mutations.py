import graphene
from .list_mutations import CreateList
from .card_mutations import CreateCard, CardIndexDrag

class Mutation(graphene.ObjectType):
    create_list = CreateList.Field()
    create_card = CreateCard.Field()
    card_index_drag = CardIndexDrag.Field()

