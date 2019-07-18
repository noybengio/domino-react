const express = require('express');
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const game = require('./server/game');

const app = express();
app.use(express.static(path.resolve(__dirname, "..", 'public')));

app.use(bodyParser.text());
app.use(express.static('public'));
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true
}));

global.userList = [];
global.roomsList = [];

app.get('/connect', (req, res) => {

    let sendData = "";
    console.log("new user - cheching connection......");

    if (req.session.index !== undefined)
        sendData = { name: userList[req.session.index].name,
                     location: "Lobby" };
    
    else
        sendData = { name: "", 
                     location: "signIn" };
    
    
    console.log("/ send data", sendData);

    //res.status(200);
    //res.write(sendData);
    
    //res.end()

    res.json(sendData);
});

app.post('/signIn', (req, res) => {
    const newUserName = req.body;
    const isExists = userList.some(user => {
        return newUserName === user.name;
    });

    if (isExists) {
        res.sendStatus(403);
    }
    else {
        if(req.session.index === undefined)
            req.session.index = Object.keys(userList).length;

        userList[req.session.index] = {
            name: newUserName,
            location: "Lobby"
        };


        console.log("User added: ", userList[req.session.index]);
        console.log("userList: ", userList);
        res.sendStatus(200);
    }
});

app.post('/lobby/addRoom', auth.addRoomToRoomsList, (req, res) => {

});

app.get('/lobby', (req, res) => {

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

app.delete('/exitRoom', (req, res) => {

    let roomID = parseInt(req.body, 10);
    let room = roomsList[roomID];
    let deletePlayer = userList[req.session.index];
    let delPlayerIndex = -1;

    if (room.status === "waiting") {
        room.players.forEach((player, i) => {
            if (player.name === deletePlayer.name) {
                delPlayerIndex = i;
            }
        });
        if (delPlayerIndex !== -1) {
            room.players.splice(delPlayerIndex, 1);
        }
    }
    else {
        room.data.players.forEach((player, i) => {
            if (player.name === deletePlayer.name) {
                delPlayerIndex = i;
            }
        });
        if (delPlayerIndex !== -1) {
            room.data.players.splice(delPlayerIndex, 1);
        }
    }

    if (delPlayerIndex !== -1){
        room.numSigned--;
        deletePlayer.location = "Lobby"

        if(room.numSigned === 0) {
            room.status = "waiting";
            room.data = null;
        }

        console.log("room:", room);
        console.log("users list:", userList);
        res.sendStatus(204);
    }
    else
        res.sendStatus(403);





});

app.get('/game/:id', (req, res) => {

    let roomID = req.params.id;
    let gamePackage;
    let room = roomsList[roomID];
    let player = userList[req.session.index];

    if (room.status === "waiting") {
        if (auth.checkIfUserExist(room, player) === false) {//check if it's new player

            roomsList[roomID].players.push(player);
            player.location = roomsList[roomID].name;

            roomsList[roomID].numSigned++;
        }
        if (roomsList[roomID].data === null && roomsList[roomID].numSigned === roomsList[roomID].numReq) {//start playing
            game.createGame(roomsList[roomID]);
        }
    }



    gamePackage = game.setPackageGame(userList[req.session.index].name, roomsList[roomID]);
    //console.log("server game package: ", gamePackage);
    res.json(gamePackage);


});

app.get('/game/grabBrick/:id', (req, res) => {

    let date = new Date;
    let time = {
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };

    let roomID = req.params.id;


    let brick = game.grabBrick(roomsList[roomID], userList[req.session.index]);


    if (brick === true) {
<<<<<<< HEAD
        if(roomsList[roomID].data.general.gameOver === false)
            game.changeTurn(roomsList[roomID], time);
        res.sendStatus(200);
=======
        game.changeTurn(roomsList[roomID], time);
>>>>>>> bd63c04674760750598af4480718906c5e153402
    }
    else
        if(roomsList[roomID].data.bricksArr.length ===0) {
            game.isPlayerGameOver(roomsList[roomID], userList[req.session.index]);
        }

    res.sendStatus(200);

});

app.post('/game/onDrop/:id', (req, res) => {

    let date = new Date;
    let time = {
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };

    let roomID = req.params.id;
    let dropData = JSON.parse(req.body);

    let dropped = game.handleDrop(roomsList[roomID], dropData, userList[req.session.index]);

    if (dropped === true) {
        if(roomsList[roomID].data.general.gameOver === false)
            game.changeTurn(roomsList[roomID], time);
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);

});

app.get('/game/gameOverStatistics/:id', (req, res) => {

    let gameOverStatistics = game.setGameOverStatistics(roomsList[roomID]);
    res.json(gameOverStatistics);

});




/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.
    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));