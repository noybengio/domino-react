const express = require('express');
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const game = require('./server/game');

const userManagement = require('./server/userManagement');


const app = express();
app.use(express.static(path.resolve(__dirname,"..",'public')));

app.use(bodyParser.text());
app.use(express.static('public'));
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true
}));

global.userList = [];

app.get('/a', (req, res) => {
    console.log("new user - cheching connection......");
    if(req.session.index !== undefined) {
        userList[req.session.index].location = "lobby"
        res.json({  name: userList[req.session.index].name, location: userList[req.session.index].location});
    }
    else
    res.json({  name: "", location: "signIn"});
});

app.post('/signIn', auth.addUserToAuthList, (req, res) => {

    //console.log("server sign in post result: ", res);
});

app.post('/lobby/addRoom', auth.addRoomToRoomsList, (req, res) => {

});

app.get('/lobby',(req, res) => {

    let lobbyBody = {
        rooms: roomsList,
        players: userList,
    };

    res.json(lobbyBody);


});

app.delete('/logOut', auth.removeUserFromAuthList, (req, res) => {

});

app.delete('/deleteRoom', auth.removeRoomFromAuthList, (req, res) => {

});

app.get('/game/:id', (req, res) => {

    let roomID = req.params.id;

    console.log("roomID", roomID);
    console.log("roomsList[roomID].data: ", roomsList[roomID].data);
    console.log("roomsList[roomID].status: ", roomsList[roomID].status);

    if(roomsList[roomID].numSigned !== roomsList[roomID].numReq) {
        roomsList[roomID].players.push(userList[req.session.index]);
        userList[req.session.index].location =  roomsList[roomID].name;
        console.log("game room ", roomsList[roomID].name ," players: ", roomsList[roomID].players);
        console.log("game users list: ", userList);

        roomsList[roomID].numSigned++;
    }

    if (roomsList[roomID].data === null && roomsList[roomID].numSigned === roomsList[roomID].numReq) {//start playing
        game.createGame(roomsList[roomID]);
        console.log("create gmae: ", roomsList[roomID])
    }
        
        /*roomsList[roomID].status = "playing";
        console.log("roomsList[roomID]: ", roomsList[roomID]);

        let bricksArr = game.createBricksArray();
        let res;
        roomsList[roomID].players.map( player => {
            res = game.splitBricks(bricksArr);
            bricksArr = res.bricksArr;
            player.bricksArr = res.playerBricks;
            player.availableNumsOnBoard = [],
            player.scour = 0;

            console.log(player.name, " Bricks: ", player.bricksArr);
            console.log("playerBricks: ", player);
        });
    
        roomsList[roomID].data.players = roomsList[roomID].players;
        delete roomsList[roomID].players;
        roomsList[roomID].data.bricksArr = bricksArr;

        roomsList[roomID].data.board = {
            boardNumBricks: 0,
            boardCells: game.createBoard(),
        }

        roomsList[roomID].data.general = {
            historyState: [],
            historyIndex: -1,
            gameOver: false,
            winner: "",
            turnCounter: 0,
            clock: {
                interval: null,
                minutes: 0,
                seconds: 0,
                text: "00:00"
            }
           
        }

    }*/
    console.log("start game: ",roomsList[roomID] )
    res.json(roomsList[roomID]);

});

/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.
    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));