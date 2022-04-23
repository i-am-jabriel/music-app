export const api = "http://localhost:3030";
export const getAllSongs = async () => {
    const songs = await fetch(`${api}/songs`);
    return songs.json();
}

export const addSong = async (song) => {
    try {
        // const holdResponse = await fetch("http://localhost:3030/songs", {
        const holdResponse = await fetch(`${api}/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        });
        return holdResponse;

    } catch(error){
        console.log("Caught Error!! " + error)
    }
}