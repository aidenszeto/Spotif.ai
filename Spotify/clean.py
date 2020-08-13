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
tracks = sp.playlist_tracks(id, fields='items(track(id))', limit=50)
track_list = tracks['items']
track_scores = 0
for track in track_list:
    id = track['track']['id']
    features = sp.audio_features(tracks=[id])
    tempo = features[0]['tempo']/100
    energy = features[0]['energy']
    score = (tempo + energy + playlists['emotion'])/3
    if score < 0.5:
        score *= 0.7
    track_scores += score

print(track_scores/len(track_list))
