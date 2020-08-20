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


input_id = input('Enter ID: ').strip()

# Clean entire database if input is 'all'
if input_id == 'all':
    for playlists in my_col.find():
        # Get playlist ID from playlist link and entry_ID from object ID
        entry_id = playlists['_id']
        link = playlists['link']
        id = link[34:56]

        # Get track ID for each track in playlist
        tracks = sp.playlist_tracks(id, fields='items(track(id))', limit=50)
        track_list = tracks['items']
        track_scores = 0

        # Calculate new happiness index based on danceability and energy
        for track in track_list:
            id = track['track']['id']
            features = sp.audio_features(tracks=[id])
            dance = features[0]['danceability']
            energy = features[0]['energy']
            score = (dance + energy + playlists['emotion'])/3
            if score < 0.6:
                score *= 0.7
            elif score > 0.6:
                score *= 1.3
            track_scores += score

        # Average the rounded track values and fix bounds
        average = round(track_scores/len(track_list), 1)
        if average > 1:
            average = 1
        elif average < 0:
            average = 0

        my_col.update_one({'_id': ObjectId(str(entry_id))}, {'$set': {'emotion': average}})
        print(f'Happiness index for {entry_id} set to {average}')

# Clean entry with specified ID
else:
    # Convert items to list and iterate
    playlists = my_col.find_one({'_id': ObjectId(str(input_id))})
    link = playlists['link']
    id = link[34:56]

    # Get track ID for each track in playlist
    tracks = sp.playlist_tracks(id, fields='items(track(id))', limit=50)
    track_list = tracks['items']
    track_scores = 0

    # Calculate new happiness index based on danceability and energy
    for track in track_list:
        id = track['track']['id']
        features = sp.audio_features(tracks=[id])
        dance = features[0]['danceability']
        energy = features[0]['energy']
        score = (dance + energy + playlists['emotion'])/3
        if score < 0.6:
            score *= 0.7
        elif score > 0.6:
            score *= 1.3
        track_scores += score

    # Average the rounded track values and fix bounds
    average = round(track_scores/len(track_list), 1)
    if average > 1:
        average = 1
    elif average < 0:
        average = 0

    my_col.update_one({'_id': ObjectId(str(input_id))}, {'$set': {'emotion': average}})
    print(f'Happiness index for {input_id} set to {average}')
