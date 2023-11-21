import graphene
from models.list_model import ListModel
from graphqls.schemas.list_schema import ListType

class CreateList(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        sort = graphene.Int(required=True)

    list = graphene.Field(ListType)

    def mutate(self, info, title, sort):
        # Logic to create a list
        return CreateList(list=ListModel("1", title, sort))

# Define update and delete mutations as needed
