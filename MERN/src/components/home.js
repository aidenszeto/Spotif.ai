import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
        <text>
        enter image url: <br />
        <input type="text" name="inputImage" id="inputImage" value="" />
        <button onclick="processImage()">analyze</button><br /><br />
        <div id="wrapper" style={{width: "1020px", display: "table"}}>
            <div id="jsonOutput" style={{width: "600px", display: "table-cell"}}>
                JSON:<br />
                <textarea id="responseTextArea" class="UIInput" style={{width: "500px"}}></textarea>
            </div>
            <div id="imageDiv" style={{width: "420px", dispay: "table-cell"}}>
                image:
                <img id="sourceImage" width="400" />
            </div>
        </div>
        </text>
    )
  }
}
