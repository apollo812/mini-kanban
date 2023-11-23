import graphene
from .list_mutations import CreateList, DeleteList, UpdateList
from .card_mutations import CreateCard, CardIndexDrag, CardIndexDragToOther, DeleteCard

class Mutation(graphene.ObjectType):
    create_list = CreateList.Field()
    update_list = UpdateList.Field()
    delete_list = DeleteList.Field()
    create_card = CreateCard.Field()
    card_index_drag = CardIndexDrag.Field()
    card_index_drag_to_other = CardIndexDragToOther.Field()
    delete_card = DeleteCard.Field()
