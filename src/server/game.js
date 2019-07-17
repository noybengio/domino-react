const server = require('../server.js');


function createBricksArray() {
    let bricksArr = [];
    for (let i = 0; i < 7; i++)
        for (let j = i; j < 7; j++) {
            bricksArr.push({num1: i, num2: j, used: false});

        }

    return shuffleBricks(bricksArr);
}

function shuffleBricks(bricksArr) {
    let j, x, i;
    for (i = bricksArr.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = bricksArr[i];
        bricksArr[i] = bricksArr[j];
        bricksArr[j] = x;
    }

    return bricksArr;
}

function splitBricks(bricksArr) {
    let bricksScore = 0;
    let brick = null;
    let playerBricks = [];
    for (let i = 0; i < 6; i++) {
        brick = bricksArr.pop();
        bricksScore += brick.num1 + brick.num2;
        playerBricks.push(bricksArr.pop());
    }

    return ({
        playerBricks: playerBricks,
        bricksArr: bricksArr,
        bricksScore: bricksScore
    })
}

function changeTurn(room) {
    
    let thisTurnName = room.data.general.turn;
    let turnPlayerIndex = 0;

    room.data.players.forEach( plater, i => {
        if(player.name === ththisTurnNameisturn)
            turnPlayerIndex = i;
    });

    turnPlayerIndex++


    if(turnPlayerIndex > room.numReq)
        nextPlayerIndex = 0;

    room.data.general.turn = room.data.players[turnPlayerIndex].name;


    let today = new Date;

    room.data.general.turnStartTime = (today.getMinutes() * 60) + today.getSeconds();

}

function calcAvg(player, time, room){

    let timeInSec = (time.minutes * 60) + time.seconds;
    player.statistics.sumTurnTime += timeInSec - room.data.general.turnStartTime;

    player.statistics.avgTurn = player.statistics.sumTurnTime/ player.statistics.countTurn;


}

function createBoard() {
    let tempBoard = [];
    for (let i = 0; i < 900; i++) {
        tempBoard.push({
            index: i,
            brick: null
        })
    }
    return tempBoard;
}

function createGame(room){
    let bricksArr = createBricksArray();
    let res, tempPlayers = [];
    room.data = {};

    room.players.map( player => {
        res = splitBricks(bricksArr);
        bricksArr = res.bricksArr;
        player.bricksArr = res.playerBricks;
        player.availableNumsOnBoard = [];
        player.statistics = {
            score: res.bricksScore,
            grabCount: 0,
            avgTurn: 0.0,
            sumTurnTime: 0,
            countTurn: 0,
        }

        //console.log(player.name, " Bricks: ", player.bricksArr);
        // console.log("playerBricks: ", player);
    });

    room.status = "playing";


    room.data.players = room.players;
    room.data.bricksArr = bricksArr;

    room.data.board =  {
        boardNumBricks: 0,
        boardCells: createBoard(),

    };

    let today = new Date();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
  
    room.data.general = {
        historyState: [],
        historyIndex: -1,
        gameOver: false,
        winner: "",
        turnCounter: 0,
        turn: room.data.players[0].name,
        bricksArrayLength: room.data.bricksArr.length,
        turnStartTime: (minutes * 60) + seconds, //the time turn start

        clock: {
            minutes: minutes,
            seconds: seconds,
        }

    };

    delete room.players;

}

function setPackageGame(playerName, room) {

    let player, enemies = [];
    let gamePackage = {

        status: room.status,
        name: room.name,
        numReq: room.numReq,
        numSigned: room.numSigned,
        id: room.id

    };

    if (room.status === "playing") {

        //console.log("roomplayers :", room.data.players);
        for (let i = 0; i < room.data.players.length; i++) {
            if (room.data.players[i].name === playerName)
                player = room.data.players[i];

            else {
                //console.log("set enemies");
                enemies.push({

                    name: room.data.players[i].name,
                    numBricks: room.data.players[i].bricksArr.length,
                    score: room.data.players[i].score
                })
            }
        }

        gamePackage.general = room.data.general;
        gamePackage.board = room.data.board;
        gamePackage.player =  player;
        gamePackage.enemies = enemies;
        //console.log("set package player:", player);


    }

    return gamePackage;

}

function grabBrick(room, player, time) {

      let grabedBrick = null;


      if (room.data.bricksArr.length > 0) {
        grabedBrick = room.data.bricksArr.pop()
        player.bricksArr.push(grabedBrick);

        player.statistics.score += grabedBrick.num1 + grabedBrick.num2;

        player.statistics.grabCount++;
        player.statistics.countTurn++;
        calcAvg(player, time, room);
        room.data.general.turnCounter++;

        console.log("player after grab brick:" , player);

        return true;
    }

    return false;



}


module.exports = {createGame,setPackageGame,grabBrick};