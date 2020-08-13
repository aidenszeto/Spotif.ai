from dotenv import load_dotenv
import pymongo, dns, os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time


load_dotenv()
URI = os.getenv('ATLAS_URI')
ID = os.getenv('ID')
SECRET = os.getenv('SECRET')

# Connect to MongoDB database
my_client = pymongo.MongoClient(URI)
my_db = my_client['spotifai']
my_col = my_db['playlists']

# Connect to Spotify API
client_id = ID
client_secret = SECRET
client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Convert items to list and iterate
playlists = list(my_col.find())
len = len(playlists)
for i in range(len):
    # Get playlist ID from each database entry
    link = playlists[i]['link']
    id = link[34:56]

    tracks = sp.playlist_tracks('1ztgyXj8nULNmEgmPcvWIe', fields='items(track(name))', limit=50)
    print(tracks)
