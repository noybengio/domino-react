const express = require('express');
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const game = require('./server/game');

const userManagement = require('./server/userManagement');


const app = express();
app.use(express.static(path.resolve(__dirname,"..",'public')));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true
}));

global.userList = [];


app.post('/signIn', auth.addUserToAuthList, (req, res) => {

    //console.log("server sign in post result: ", res);
});

app.post('/lobby/addRoom', auth.addRoomToRoomsList, (req, res) => {

});

app.get('/lobby',(req, res) => {

    let lobbyBody;
    lobbyBody = {
        rooms: roomsList,
        players: userList
    };

    res.json(lobbyBody);


});

app.delete('/logOut', auth.removeUserFromAuthList, (req, res) => {

});

app.delete('/deleteRoom', auth.removeRoomFromAuthList, (req, res) => {

});

app.get('/game/:id',(req, res) => {

    let lobbyBody;
    lobbyBody = {
        rooms: roomsList,
        players: userList
    };
    let roomID = req.params.id;

    console.log("roomID", roomID);
    console.log("roomsList[roomID].data", roomsList[roomID].data);
    console.log("roomsList[roomID].status", roomsList[roomID].status);

    if(roomsList[roomID].numSigned !== parseInt(roomsList[roomID].numReq)) {
        roomsList[roomID].players.push(userList[req.session.id]);
        console.log("game room players: ", roomsList[roomID].players);
        roomsList[roomID].numSigned++;
    }

           if (roomsList[roomID].data === null &&
               roomsList[roomID].numSigned === parseInt(roomsList[roomID].numReq))//first enter
        {
            roomsList[roomID].status = "playing";
            console.log("roomsList[roomID]:", roomsList[roomID]);

            let bricksArr = game.createBricksArray();

            for(let i = 0; i < roomsList[roomID].players.length; i++ ) {

                let res = game.splitBricks(bricksArr);
                let playerBricks = res.playerBricks;
                bricksArr = res.bricksArr;

                console.log("playerBricks: ", playerBricks);
                console.log("bricksArr: ", bricksArr);
            }
        }

    res.json(lobbyBody);

});

/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.
    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));