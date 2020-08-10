import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePlaylist extends Component {
  constructor(props) {
      super(props);

      this.onChangeLink = this.onChangeLink.bind(this);
      this.onChangeEmotion = this.onChangeEmotion.bind(this);
      this.onChangeAge = this.onChangeAge.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        link: '',
        emotion: 0.0,
        age: 0
      }
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value
    });
  }

  onChangeEmotion(e) {
    this.setState({
      emotion: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const playlist = {
      link: this.state.link,
      emotion: this.state.emotion,
      age: this.state.age
    }

    console.log(playlist);

    axios.post('http://localhost:5000/playlists/add', playlist)
      .then((res) => console.log(res.data));

    window.location = '/';
  }


  render() {
    return(
      <div className="container">
        <h1 className="App">add playlist</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>link: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.link}
                onChange={this.onChangeLink}
                />
          </div>
          <div className="form-group">
            <label>emotion: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.emotion}
                onChange={this.onChangeEmotion}
                />
          </div>
          <div className="form-group">
            <label>age: </label>
            <input
                required
                type="text"
                className="form-control"
                value={this.state.age}
                onChange={this.onChangeAge}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="add playlist" className="btn btn-primary" />
          </div>
        </form>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
      )
    }
  }
