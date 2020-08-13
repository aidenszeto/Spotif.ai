from dotenv import load_dotenv
import pymongo, dns, os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time
import json
from bson.objectid import ObjectId


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
id = input('Enter ID: ')
playlists = my_col.find_one({'_id': ObjectId(str(id))})
link = playlists['link']
id = link[34:56]

# Get track ID for each track in playlist
tracks = sp.playlist_tracks('1ztgyXj8nULNmEgmPcvWIe', fields='items(track(id))', limit=50)
track_list = tracks['items']
track_scores = 0
for track in track_list:
    id = track['track']['id']
    features = sp.audio_features(tracks=[id])
    tempo = round(features[0]['tempo']/100,2)
    energy = features[0]['energy']
    score = round((tempo + energy + playlists['emotion'])/3,1)
    track_scores += score

print(len(track_list))
print(track_scores)
