from ..handlers.list_handler import ListHandler

def resolve_get_list(id):
    list = ListHandler()
    return list.get_list(id)

def resolve_get_all_list():
    list = ListHandler()
    return list.get_all_list()
