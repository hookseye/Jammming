import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
    render() {
        let track = this.props.tracks.map((track, id) => 
            <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
        );
        return (
            <div className="TrackList">
                {track}
            </div>
        );
    }
}

export default TrackList;