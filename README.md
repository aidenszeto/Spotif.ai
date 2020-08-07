# Spotif.ai
Too lazy to search for a playlist that fits your mood? Just upload a picture of yourself and Spotif.ai will take care of the rest for you! Using facial recognition software, 
Spotif.ai automatically detects your mood and recommends you the perfect Spotify playlist. Try it out!

## Getting Started
Follow these steps to get started!
- Clone this repository to download the code
- Retrieve free Azure key for [Microsoft Face](https://azure.microsoft.com/en-us/services/cognitive-services/face/)
- Set up [MongoDB](https://www.mongodb.com/) database and retrieve custom uri by clicking connect
- Add API key, MongoDB URI, and custom endpoint (if different from code) to .env file as follows\
  ``ATLAS_URI=<custom_uri>``\
  ``API_KEY=<azure_key>``\
  ``ENDPOINT=<azure_endpoint>``
- Once your database is connected, run ``nodemon server`` and ``npm start``
- Test out your web app with different picture urls!

## Features
### Analyze your Image
Type in the url of your image and click the "analyze image" button to display the detected happiness index and recommended playlist. The code for this component can be found under
**/MERN/src/components/detect.component.js**.
### Playlists
This page will display the current playlists in your MongoDB database. To edit or delete entries, simply click the link to the right of the playlist and change the values. The code for this component can be found under **/MERN/src/components/playlist-list.component.js** and **/MERN/src/components/edit-playlist.component.js**.
### Add Playlists
To add your own playlists, enter the Add Playlists page. Here, a user can input the link to a playlist, their happiness index (decimal value from 0-1), and their age to be added to the MongoDB database. The code for this component can be found under **/MERN/src/components/create-playlist.js**.
### Menu
The menu is home to the three main pages: Analyze your Image, Playlists, and Add Playlists. The code for this component can be found under **/MERN/src/components/navbar.component.js**.
