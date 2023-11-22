from database.dynamodb_client import get_dynamodb_client

class ListHandler:
    def __init__(self):
        self.dynamodb = get_dynamodb_client(local=True)
        self.table = self.dynamodb.Table('Lists')

    def get_list(self, id):
        response = self.table.get_item(Key={'id': id})
        return response.get('Item')
