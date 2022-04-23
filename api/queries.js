const Pool = require('pg').Pool;

const pool = new Pool({
    // user: 'postgres',
    // // host: 'localhost',
    // host: 'music.c7xclwu5il92.us-east-1.rds.amazonaws.com',
    // database: 'music',
    // password: 'postgres',
    // port: 5432
    connectionString: process.env.PSQL_CONNECTION
});

const getAllSongs = (req, res) => {
    pool.query('SELECT * FROM songs', (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const addSong = (req, res) => {
    try {
        const { name, artistid, duration, play_count, img } = req.body;
        pool.query(
            `INSERT INTO songs (name, artistid, duration, play_count, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, artistid, duration, play_count, img],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, "<--- result!")
                res.status(200).json(results.rows)
            }
        );
    } catch (e) {
        console.log("ERROR CAUGHT! " + err.message)
    }
};

const deleteSongById = (req, res) => {
    const song_id = parseInt(req.params.song_id);

    pool.query(`DELETE FROM songs WHERE id=${song_id}`, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateSongNameById = (req, res) => {
    const { song_id } = req.params;
    // gives us an array of all the keys on req.body
    const keys = Object.keys(req.body);
    // gives us an array of all the values on req.body
    const values = Object.values(req.body);

    // Adding to our UPDATE sql statement
    const configureString = () => {
        // Building the column / value pairs after our SET keyword 
        let sqlStatement = '';
        // Iterating over our keys from our request body and building our sqlStatement
        for(let i = 0; i < keys.length; i++){
            // If we are looking at the last key, we want to omit the comma...
            if(i === keys.length-1) sqlStatement += `${keys[i]}=$${i+1}`
            // ... otherwise, we want to add it because there are more column/value pairs
            else sqlStatement += `${keys[i]}=$${i+1}, `
        }
        return sqlStatement;
    }

    pool.query(
        `UPDATE songs SET ${configureString()} WHERE id=$${keys.length+1}`,
        [...values, song_id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
}

module.exports = {
    addSong,
    getAllSongs,
    deleteSongById,
    updateSongNameById
}