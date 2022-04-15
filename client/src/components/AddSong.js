import React from 'react';
import { addSong } from './networkRequests';

class AddSong extends React.Component {
    state = {
       song_name: "",
       artist: "",
       duration: "",
       track_listing: "" 
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = () => {
        addSong(this.state);
    }

    render(){
        return(
            <div className="add-song-wrap">
                <h1>Add Song!</h1>
                <label>Song name: </label>
                <input onChange={this.handleChange} name="song_name"></input>
                <label>Artist: </label>
                <input onChange={this.handleChange} name="artist"></input>
                <label>Duration: </label>
                <input onChange={this.handleChange} name="duration"></input>
                <label>Track Listing: </label>
                <input onChange={this.handleChange} name="track_listing"></input>
                <button onClick={this.onClick}>Submit</button>
            </div>
        )
    }
}

export default AddSong;