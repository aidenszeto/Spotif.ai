import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PlaylistList from "./components/playlist-list.component";
import CreatePlaylist from "./components/create-playlist.component";
import EditPlaylist from "./components/edit-playlist.component"
import Detect from "./components/detect.component"

import "./components/css/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-wrapper">
        <Navbar />
        <br/>
        <Route path="/" exact component={Detect} />
        <Route path="/playlists" component={PlaylistList} />
        <Route path="/create" component={CreatePlaylist} />
        <Route path="/edit/:id" component={EditPlaylist} />
        </div>
      </div>
    </Router>
  );
}


export default App;
