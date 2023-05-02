// server/index.js

const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const {spawn} = require('child_process');

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/data", (req, res) => {
    let data = req.body;

    // spawn new child process to call the the python script
    // the ./server/main.py --> generates new spotify playlist
    const python = spawn('python', ['./server/main.py', `${data.user_id}`, `${data.playlist_link}`, `${data.new_playlist_name}`, `${data.amount_of_songs}`, `${data.ratings}`], );
    
    // collect data from script
    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
      
    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        //res.sendStatus(code)
        res.send({ status: code })
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port --> ${PORT}`)
})