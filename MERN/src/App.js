import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PlaylistList from "./components/playlist-list.component";
import CreatePlaylist from "./components/create-playlist.component";
import EditPlaylist from "./components/edit-playlist.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={PlaylistList} />
        <Route path="/create" component={CreatePlaylist} />
        <Route path="/edit" component={EditPlaylist} />
      </div>
    </Router>
  );
}


export default App;
