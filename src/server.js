const express = require('express');
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const game = require('./server/game');

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
global.roomsList = [];

app.get('/a', (req, res) => {
    console.log("new user - cheching connection......");
    if(req.session.index !== undefined) {
        userList[req.session.index].location = "lobby";
        res.json({  name: userList[req.session.index].name, location: userList[req.session.index].location});
    }
    else
        res.json({  name: "", location: "signIn"});
});

app.post('/signIn', (req, res) => {
    const newUserName = req.body;
    const isExists = userList.some(user => {
        return newUserName === user.name;
    });

    if(isExists){
        res.sendStatus(403);
    }
    else {
        req.session.index = Object.keys(userList).length;
        userList[req.session.index] = {
            name: req.body,
            location: "lobby"
        };
        console.log("in addUserToAuthList before send req.session.index", req.session.index);

        console.log(" User added :", userList[req.session.index]);
        console.log("userList: ", userList);
        res.sendStatus(200);
    }
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
    let gamePackage;

    //console.log('roomID', roomID);
    //console.log('roomsList', roomsList);

    if(roomsList[roomID].numSigned !== roomsList[roomID].numReq) {
        roomsList[roomID].players.push(userList[req.session.index]);
        userList[req.session.index].location =  roomsList[roomID].name;
        //console.log("game room ", roomsList[roomID].name ," players: ", roomsList[roomID].players);
        //console.log("game users list: ", userList);

        roomsList[roomID].numSigned++;
    }

    if (roomsList[roomID].data === null && roomsList[roomID].numSigned === roomsList[roomID].numReq) {//start playing
        game.createGame(roomsList[roomID]);
        //console.log("create game: ", roomsList[roomID])
    }

    gamePackage = game.setPackageGame(userList[req.session.index].name, roomsList[roomID]);
    //console.log("gamePackage: ",gamePackage);
    res.json(gamePackage);

});

app.get('/game/grabBrick/:id', (req, res) => {
    
    let date = new Date;
    let time = {
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }

    let roomID = req.params.id;
    console.log('get grab brick roomID' , roomID);
    
    let brick = game.grabBrick(roomsList[roomID], userList[req.session.index], time);
    console.log("grabed brick :" ,brick );

    if(brick === true){
        game.changeTurn(roomsList[roomID]);
        res.sendStatus(200);
    }
    // else
////check if bricksArr.lenght =0 then call isGameOver()
});

/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.
    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));