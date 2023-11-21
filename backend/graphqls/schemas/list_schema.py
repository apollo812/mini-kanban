import graphene
from models.list_model import ListModel
# Import the database client if needed

class ListType(graphene.ObjectType):
    id = graphene.String()
    title = graphene.String()
    sort = graphene.Int()

# Define any other necessary GraphQL fields and types for ListModel
