import React, { Component } from 'react';


export default class Home extends Component {
  constructor(props) {
      super(props);

      this.onChangeURL = this.onChangeURL.bind(this);

      this.state = {
        url: '',
        emotions: 0,
        link: '',
        response: ''
      }
  }

  submitForm(e, url) {
    var that = this;
    const axios = require('axios').default;
    // Add a valid subscription key and endpoint to your environment variables.
    let subscriptionKey = "b2cf0902bf004b89b2a5096c2df5e0e3"
    let endpoint = 'https://spotifai.cognitiveservices.azure.com/face/v1.0/detect'
    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = url.toString()
    let resultJSON = {
      "age": 0,
      "emotions": ""
    }
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
        //console.log(response.data)
        response.data.forEach((face) => {
          let age = face.faceAttributes.age
          let emotion = face.faceAttributes.emotion
          resultJSON = {
            "age": age,
            "emotions": emotion
          }
          let score = JSON.stringify(resultJSON["emotions"]["happiness"])
          console.log('Age: ' + age)
          console.log('Happiness: ' + parseFloat(score))
          that.setState({emotions: parseFloat(score)})
          let rounded = JSON.stringify(Math.round((parseFloat(score) + Number.EPSILON) * 10) / 10)
          axios.get('http://localhost:5000/playlists/'+rounded)
            .then(response => {
              let len = response.data.length
              if (len > 1)
              {
                console.log(response.data[Math.floor(Math.random() * len)]["link"])
                that.setState({link: response.data[Math.floor(Math.random() * len)]["link"]})
              }
              else {
                console.log(response.data[0]["link"])
                that.setState({link: response.data[0]["link"]})
              }
          });
          if (parseFloat(rounded) > 0.6) {
            that.setState({response: "you are happy :)"})
          }
          else if (parseFloat(rounded) >= 0.4 || parseFloat(rounded) <= 0.6) {
            that.setState({response: "you are meh :|"})
          }
          else {
            that.setState({response: "you are sad :("})
          }
        });
    }).catch(function (error) {
        console.log(error)
    });
    e.preventDefault();
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="App">analyze image</h1> <br />
        <form onSubmit={(e) => this.submitForm(e, document.getElementById("link").value)}>
          <div className="form-group">
          <label className="App">image url: </label>
            <input type="text"
                id="link"
                required
                className="form-control"
                value={this.state.url}
                onChange={this.onChangeURL}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="analyze" className="btn btn-primary" />
          </div> <br />
          <div className="App">
            <img src={this.state.url} alt="" style={{height: 500}}></img>
          </div> <br />
          <div className="App">
            <h3> {this.state.response} </h3>
            happiness index: {this.state.emotions} <br />
            click <a href={this.state.link}> here </a> for your playlist!
          </div>
        </form>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
