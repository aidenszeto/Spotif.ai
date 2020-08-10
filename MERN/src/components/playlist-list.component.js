import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Playlist = props => (
  <tr>
    <td>
      <a href={props.playlist.link}>{props.playlist.link}</a>
    </td>
    <td>{props.playlist.emotion}</td>
    <td>{props.playlist.age}</td>
    <td>
      <Link to={"/edit/"+props.playlist._id}>edit</Link> | <a href="#" onClick={() => { props.deletePlaylist(props.playlist._id) }}>delete</a>
    </td>
  </tr>
)

export default class PlaylistList extends Component {
  constructor(props){
    super(props);

    this.deletePlaylist = this.deletePlaylist.bind(this)

    this.state = {playlists: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/playlists/')
      .then(response => {
        this.setState({ playlists: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePlaylist(id) {
    axios.delete('http://localhost:5000/playlists/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      playlists: this.state.playlists.filter(el => el._id !== id)
    })
  }

  playlistList() {
    return this.state.playlists.map(currentplaylist => {
      return <Playlist playlist={currentplaylist} deletePlaylist={this.deletePlaylist} key={currentplaylist._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <h1>playlists</h1> <br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>link</th>
              <th>emotion</th>
              <th>age</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            { this.playlistList() }
          </tbody>
        </table>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    )
  }
}
