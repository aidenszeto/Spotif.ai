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
