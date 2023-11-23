import datetime

def time2graphql():
    # Get the current date and time
    current_datetime = datetime.datetime.utcnow()  # Get the current datetime in UTC

    # Convert to GraphQL datetime format
    graphql_datetime = current_datetime.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

    return graphql_datetime