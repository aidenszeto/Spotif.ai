from dotenv import load_dotenv
import pymongo, dns, os

load_dotenv()
URI = os.getenv('ATLAS_URI')

# Connect to MongoDB database
my_client = pymongo.MongoClient(URI)
my_db = my_client['spotifai']
my_col = my_db['playlists']

# Convert items to list and iterate
playlists = list(my_col.find())
len = len(playlists)
for i in range(len):
    link = playlists[i]['link']
    id = link[34:]
    print(id)
