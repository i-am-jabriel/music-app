import React, { useEffect, useState } from 'react';
import AddSongs from './AddSong';
import { getAllSongs } from './networkRequests';

export default function Home(){
    const [songs, setSongs] = useState([]);
    
    const refresh = () => {
        getAllSongs().then(res => {
            setSongs(res);
        });
    }
    
    useEffect(refresh, []);

    return (
        <div>
            <AddSongs refresh={refresh}/>
            <ul className='song-card'>
                {songs.map(song => <li key={song.id}>
                    <img className='mini' src={song.img}alt={song.name}/>
                    {song.name}
                </li>)}
            </ul>
        </div>
    )
}