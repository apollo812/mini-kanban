from ..handlers.card_handler import CardHandler

def resolve_get_card(key, list_id):
    card = CardHandler()
    return card.get_card(key, list_id)