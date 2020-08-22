# Spotif.ai
Too lazy to search for a playlist that fits your mood? Just upload a picture of yourself and Spotif.ai will take care of the rest for you! Using facial recognition software, 
Spotif.ai automatically detects your mood and recommends you the perfect Spotify playlist. Try it out!

## Table of Contents
- [Prerequisites](https://github.com/aidenszeto/Spotif.ai#prerequisites)
- [Getting Started](https://github.com/aidenszeto/Spotif.ai#getting-started)
- [Features](https://github.com/aidenszeto/Spotif.ai#features)
- [How it Works](https://github.com/aidenszeto/Spotif.ai#how-it-works)
- [Database Schema](https://github.com/aidenszeto/Spotif.ai#database-schema)
- [Spotify API](https://github.com/aidenszeto/Spotif.ai#spotify-API)
- [Contact](https://github.com/aidenszeto/Spotif.ai#contact)

## Prerequisites
Please install the following before cloning:
```
 npm install mongoose
 npm install express
 npm install cors
 npm install dotenv
 npm install nodemon
 npm install bootstrap
 npm install react-router-dom
 npm install axios
```

## Getting Started
Follow these steps to get started!
1. Clone this repository to download the code
2. Retrieve free API key and corresponding endpoint for [Microsoft Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/) from Azure Cognitive Services
3. Set up [MongoDB](https://www.mongodb.com/) database and retrieve custom uri by connecting by network
4. Add API key, MongoDB URI, and custom endpoint (if different from code) to .env file as follows
 ```
    ATLAS_URI=<custom_uri>
    API_KEY=<azure_key>
    ENDPOINT=<azure_endpoint>
 ```
5. Once your database is connected, run ``nodemon server`` and ``npm start``
6. Test out your web app with different image urls!

## Features
### Analyze your Image
Type in the url of your image and click the "analyze image" button to display the detected happiness index and recommended playlist. A playlist link corresponding to your mood ill be pulled from the MongoDB database. The code for this component can be found under [**detect.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/detect.component.js).\
![Analyze your Image](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-10%20000250.png)
### Playlists
This page will display the current playlists in your MongoDB database. To edit or delete entries, simply click the link to the right of the playlist and change the values. The code for this component can be found under [**playlist-list.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/playlist-list.component.js) and [**edit-playlist.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/edit-list.component.js).\
![Playlists](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-10%20000307.png)
### Add Playlists
To add your own playlists, enter the Add Playlists page. Here, a user can input the link to a playlist, their happiness index (decimal value from 0-1), and their age. These fields will then be added as an entry into the MongoDB database. The code for this component can be found under [**create-playlist.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/create-playlist.component.js).\
![Add Playlists](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-10%20000349.png)
### Menu
The menu is home to the three main pages: Analyze your Image, Playlists, and Add Playlists. The code for this component can be found under [**navbar.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/navbar.component.js).

## How it Works
Spotif.ai was created using the MERN stack (MongoDB, Express, React, Node.js). After connections are made to both the database and localhost, [Microsoft Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) is used to access the emotional indices for each face in an uploaded image. The Face API detects the relative positions of facial features such as lips and eys to calculate a happiness level. Because the Face API returns floating point values, the happiness score is rounded to the nearest tenth. The value for happiness is then saved and compared to the MongoDB database, where documents containing a Spotify playlist link and its corresponding happiness index are stored. Comparing the face's emotional score to the database entries, the program outputs and displays the playlist with the closest score match.

Additionally, a script using [Spotify's open-source API](https://developer.spotify.com/documentation/web-api/) allows new playlists and their corresponding scores to be inputted and altered dynamically. Based on the songs' tempo, energy, and danceability, a happiness index (float from 0-1) corresponding to the playlist will be generated. Again, this index is compared to the output of the Microsoft Face API. Working in unison with the API-to-database connection, playlists will be recommended with exponentially increasing accuracy. The [**clean.py**](https://github.com/aidenszeto/Spotif.ai/blob/master/Spotify/clean.py) file takes in a MongoDB object ID and determines the track features for the corresponding playlist. These features are then used to calculate a new happiness index (thus fixing the user-inputted index) and updates the database fittingly.

## Database Schema
```
  {
    "_id": <unique MongoDB id>
    "link": <String>,
    "emotion": <Number>,
    "age": <Number>,
  }
```
**_id**: unique identifier given to every MongoDB entry\
**link:** url to a unique spotify playlist\
**emotion:** decimal value for playlists' happiness index\
**age:** integer value used to determine recommendation accuracy


However, [**clean.py**](https://github.com/aidenszeto/Spotif.ai/blob/master/Spotify/clean.py) is run on a database entry, a new field will appear. This field is used to distinguish user-inputted emotional indices from algorithm-calculatted onces, allowing the clean script to more efficiently parse through the database. Consequently, the database schema may look slightly different, with the following field:
```
 {
  "cleaned": <Boolean>
 }
```
**cleaned**: boolean value distinguishing entries with calculated emotion index

## Spotify API
Separate from the MERN app, the [**clean.py**](https://github.com/aidenszeto/Spotif.ai/blob/master/Spotify/clean.py) file dynamically determines happiness indexs for each playlist. Following a new, manual playlist entry by a user, the python script recalculates an accurate emotion value. The playlist is parsed through [Spotify API](https://developer.spotify.com/documentation/web-api/) and the [spotipy library](https://spotipy.readthedocs.io/en/2.13.0/) to receive the danceability, energy, and tempo for each individual track. 

These values, in conjunction with the user-inputted index) are averaged for each track, and averaged for the entire playlist, providing a more accurate happiness level for the playlist. The reason for including the user-inputted value is to nullify anomalies. In some instances, a song may still hold emotionally-happy value even though it's danceability, energy, and tempo say otherwise. Using the value that the user inputs takes human preferance into account while re-determining the new happiness index.

The user also has the option to run [**clean.py**](https://github.com/aidenszeto/Spotif.ai/blob/master/Spotify/clean.py) for all database entries. To do this, 'all' must be inputted to the Entry ID instead of one of the database's object IDs. As a result, the script will iterate through every item in the database and perform the emotional index algorithm on each one, updating the user-inputted values with calculated ones. However, once the script cleans an entry in the database, a new boolean field, 'cleaned', is set to true, allowing it to be skipped in the next pass.

*Note: running [**clean.py**](https://github.com/aidenszeto/Spotif.ai/blob/master/Spotify/clean.py) will take more time if the database has a large number of uncleaned items.*

## Contact
Created by [Aiden Szeto](http://aidenszeto.me/) - feel free to contact me!



[Return to the Top](https://github.com/aidenszeto/Spotif.ai#spotifai)
