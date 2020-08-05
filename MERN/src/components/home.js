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
        <div id="wrapper" style={{width: "1020px", display: "table"}}>
            <div id="jsonOutput" style={{width: "600px", display: "table-cell"}}>
                JSON:
                <textarea id="responseTextArea" class="UIInput"></textarea>
            </div>
            <div id="imageDiv" style={{width: "420px", dispay: "table-cell"}}>
                image:
                <img id="sourceImage" width="400" />
            </div>
        </div>
        </body>
      </div>
    )
  }
}
