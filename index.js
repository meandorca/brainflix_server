const express = require("express");
const fs= require('fs');
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');


app.use((req, res, next) => {
    console.log("request received");
    next();
})

app.use(cors());
app.use(express.json());
app.use(express.static('assets'));

app.get("/videos",(req, res) => {
    const videos = fs.readFileSync("./data/videos.json");

    res.json(JSON.parse(videos));
 
});

app.get("/videos/:id",(req, res) => {
    const videos = fs.readFileSync("./data/videos.json");
    const videosParsed = JSON.parse(videos);
    const video = videosParsed.find(video => video.id === req.params.id);
   
    res.json(video);
 
});

app.post("/videos",(req, res) => {
    let { title,description} = req.body  
    id = uuidv4();
    timestamp = Date.now();
    
    const newVideo = {
        id,
        title,
        description,
        timestamp,
        channel:"Queen Radio",
        image:"http://localhost:8000/images/image.jpg",
        views:"0",
        likes:"0",
        duration:"3:00",
        video:"http://localhost:8000/images/image.jpg",
        comments: []
    }

    const videoList = fs.readFileSync("./data/videos.json");   
    const parsedVideoList = JSON.parse(videoList);  
    parsedVideoList.push(newVideo);

    const stringifiedVideoList = JSON.stringify(parsedVideoList, null, 2);
    fs.writeFileSync("./data/videos.json",stringifiedVideoList);
    res.status(201).json(newVideo);
   
});

app.listen(8000, () => {
    console.log("Server is running on 8000");
})