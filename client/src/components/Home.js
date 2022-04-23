import React from 'react';
import AddSongs from './AddSong';
import { getAllSongs } from './networkRequests';

class Home extends React.Component {
    state = {
        songs: []
    }
    
    componentDidMount(){
        this.refresh();
    }

    refresh = () => {
        getAllSongs().then(res => {
            this.setState({ songs: res });
        });
    }

    render(){
        return (
            <div>
                <AddSongs refresh={this.refresh}/>
                <ul className='song-card'>
                    {this.state.songs.map(song => <li key={song.id}>
                        <img className='mini' src={song.img}alt={song.name}/>
                        {song.name}
                    </li>)}
                </ul>
            </div>
        )
    }
}

export default Home;