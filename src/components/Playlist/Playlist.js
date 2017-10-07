import React from 'react';
import './Playlist.css';
import TrackList from '../Tracklist/Tracklist.js';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.onNameChange(e);
    }

    render() {
        return (
            <div class="Playlist">
                <input defaultValue={this.props.playlistName} onChange={this.handleNameChange} />
                    <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} onChange={this.handleNameChange}/>
                <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
          </div>
        );
    }
}

export default Playlist;