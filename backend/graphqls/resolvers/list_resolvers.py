from ..handlers.list_handler import ListHandler

def resolve_get_list(id):
    list = ListHandler()
    return list.get_list(id)