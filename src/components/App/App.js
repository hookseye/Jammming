import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: '', artist: '', album: ''}],
      playlistName: 'Playlist Name',
      playlistTracks: [{name: '', artist: '', album: ''}]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackCheck = tracks.find(a => a.id === tracks.id);
    if (!trackCheck) {
      this.setState({playlistTracks: [...tracks, track]});
    };
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracklist = tracks.filter(() => track.id !== tracks.id);
    this.setState({playlistTracks: newTracklist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    Spotify.savePlaylist();
    this.setState({playlistName: 'New Playlist'});
    this.setState({searchResults: []});
  }

  search(search) {
    let results = Spotify.search(search);
    this.setState({searchResults: results});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
