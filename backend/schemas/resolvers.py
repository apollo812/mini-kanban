from models.list_model import ListModel
from models.card_model import CardModel

def resolve_list(key):
    model = ListModel()
    return model.get_list(key)

def resolve_card(key, list_id):
    model = CardModel()
    return model.get_card(key, list_id)
