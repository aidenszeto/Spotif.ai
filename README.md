# Spotif.ai
Too lazy to search for a playlist that fits your mood? Just upload a picture of yourself and Spotif.ai will take care of the rest for you! Using facial recognition software, 
Spotif.ai automatically detects your mood and recommends you the perfect Spotify playlist. Try it out!

## Getting Started
Follow these steps to get started!
- Clone this repository to download the code
- Retrieve free API key and corresponding endpoint for [Microsoft Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/) from Azure Cognitive Services
- Set up [MongoDB](https://www.mongodb.com/) database and retrieve custom uri by connecting by network
- Add API key, MongoDB URI, and custom endpoint (if different from code) to .env file as follows\
 ```
    ATLAS_URI=<custom_uri>
    API_KEY=<azure_key>
    ENDPOINT=<azure_endpoint>
 ```
- Once your database is connected, run ``nodemon server`` and ``npm start``
- Test out your web app with different image urls!

## Features
### Analyze your Image
Type in the url of your image and click the "analyze image" button to display the detected happiness index and recommended playlist. A playlist link corresponding to your mood ill be pulled from the MongoDB database. The code for this component can be found under [**/MERN/src/components/detect.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/detect.component.js).\
![Analyze your Image](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-08%20205340.png)
### Playlists
This page will display the current playlists in your MongoDB database. To edit or delete entries, simply click the link to the right of the playlist and change the values. The code for this component can be found under [**/MERN/src/components/playlist-list.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/playlist-list.component.js) and [**/MERN/src/components/edit-playlist.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/edit-list.component.js).\
![Playlists](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-08%20205418.png)
### Add Playlists
To add your own playlists, enter the Add Playlists page. Here, a user can input the link to a playlist, their happiness index (decimal value from 0-1), and their age. These fields will then be added as an entry into the MongoDB database. The code for this component can be found under [**/MERN/src/components/create-playlist.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/create-playlist.component.js).\
![Add Playlists](https://github.com/aidenszeto/Spotif.ai/blob/master/Screenshots/Annotation%202020-08-08%20205504.png)
### Menu
The menu is home to the three main pages: Analyze your Image, Playlists, and Add Playlists. The code for this component can be found under [**/MERN/src/components/navbar.component.js**](https://github.com/aidenszeto/Spotif.ai/blob/master/MERN/src/components/navbar.component.js).

## How it Works
Spotif.ai was created using the MERN stack (MongoDB, Express, React, Node.js). After connections are made to both the database and localhost, [Microsoft Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) is used to access the emotional indices for each face in an uploaded image. Because the Face API returns floating point values, the happiness score is rounded to the nearest tenth. The value for happiness is then saved and compared to the MongoDB database, where documents containing a Spotify playlist link and its corresponding happiness index are stored. Comparing the face's emotional score to the database entries, the program outputs and displays the playlist with the closest score match.

Although the database must currently be populated manually, a script using [Spotify's open-source API](https://developer.spotify.com/documentation/web-api/) is in the works, allowing new playlists and their corresponding scores to be inputted dynamically. Based on the songs' tempo, genre, and playlist name, a happiness index (float from 0-1) corresponding to the playlist will be generated. Again, this index will be compared to the output of the Microsoft Face API. Working in unison with the API-to-database connection, playlists will be recommended with exponentially increasing accuracy.

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

## Contact
Created by [Aiden Szeto](https://www.linkedin.com/in/aidenszeto/) - feel free to contact me!
