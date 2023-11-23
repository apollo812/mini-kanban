from ..handlers.card_handler import CardHandler

def resolve_get_card(key, listId):
    card = CardHandler()
    return card.get_card(key, listId)

def resolve_get_all_card():
    card = CardHandler()
    return card.get_all_card()

def resolve_del_card(id):
    card = CardHandler()
    return card.del_card(id)
