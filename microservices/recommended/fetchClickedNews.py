import pymongo
import urllib.parse

# MongoDB connection URI
username = "sahilnarwalkumar01"
password = "KskRBW@1"
cluster_url = "cluster0.f42f14w.mongodb.net/"
database_name = "sample_mflix"
collection_name = "comments"

# Escape username and password
escaped_username = urllib.parse.quote_plus(username)
escaped_password = urllib.parse.quote_plus(password)

# Construct connection URI with escaped username and password
connection_uri = f"mongodb+srv://{escaped_username}:{escaped_password}@{cluster_url}/{database_name}?retryWrites=true&w=majority"

# Connect to MongoDB
client = pymongo.MongoClient(connection_uri)

# Access your database and collection
db = client[database_name]
collection = db[collection_name]