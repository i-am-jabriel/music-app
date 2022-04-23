import React from 'react';
import { addSong } from './networkRequests';

class AddSong extends React.Component {
    state = {
       name: "",
       artistid: "",
       duration: "",
       play_count: "",
       img: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = () => {
        addSong(this.state)
            .then(this.refresh);
    }

    refresh = () => {
        this.setState({
            name: "",
            artistid: "",
            duration: "",
            play_count: "",
            img: ""
        });
        this.props.refresh();
    }

    render(){
        return(
            <div className="add-song-wrap">
                <h1>Add Song!</h1>
                {/* <label>Song name: </label>
                <input onChange={this.handleChange} name="song_name"></input>
                <label>Artist: </label>
                <input onChange={this.handleChange} name="artist"></input>
                <label>Duration: </label>
                <input onChange={this.handleChange} name="duration"></input>
                <label>Track Listing: </label>
                <input onChange={this.handleChange} name="track_listing"></input> 

                
                Doing this statically will drive you INSANE
                */}
                {Object.keys(this.state).map(name => <div key={name}>
                    <label>{name}</label>
                    <input onChange={this.handleChange} value={this.state[name]} name={name}/>
                </div>)}
                <button onClick={this.onClick}>Submit</button>
            </div>
        )
    }
}

export default AddSong;