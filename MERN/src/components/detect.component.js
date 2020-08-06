import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
      super(props);

      this.onChangeURL = this.onChangeURL.bind(this);

      this.state = {
        url: ''
      }
  }

  onSubmit() {
    'use strict';

    const axios = require('axios').default;

    // Add a valid subscription key and endpoint to your environment variables.
    let subscriptionKey = "b2cf0902bf004b89b2a5096c2df5e0e3"
    let endpoint = 'https://spotifai.cognitiveservices.azure.com/face/v1.0/detect'

    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = "https://media.beliefnet.com/~/media/photos-with-attribution/people_groups/woman-happy-african-american-smiling-laughing_credit-shutterstock.jpg"
    axios({
        method: 'post',
        url: endpoint,
        params : {
            returnFaceId: true,
            returnFaceLandmarks: false,
            returnFaceAttributes: 'age,emotion'
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
        console.log('Status text: ' + response.status)
        console.log('Status text: ' + response.statusText)
        console.log()
        //console.log(response.data)
        response.data.forEach((face) => {
          console.log('Face ID: ' + face.faceId)
          console.log('Age: ' + face.faceAttributes.age)
          console.log('Emotion: ' + JSON.stringify(face.faceAttributes.emotion))
          console.log()
        });
    }).catch(function (error) {
        console.log(error)
    });
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>analyze image</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>link: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.url}
                onChange={this.onChangeURL}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="analyze" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
