import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div>
        <body>
        enter image url: <input type="text" name="inputImage" id="inputImage"
            value="" />
        <button onclick="processImage()">analyze</button>
        <div id="wrapper">
            <div id="jsonOutput">
                JSON:
                <textarea id="responseTextArea" class="UIInput"></textarea>
            </div>
            <div id="imageDiv">
                image:
                <img id="sourceImage" width="400" />
            </div>
        </div>
        </body>
      </div>
    )
  }
}
