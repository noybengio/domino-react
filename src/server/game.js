
function createBricksArray() {
    let bricksArr = [];
    for (let i = 0; i < 8; i++)
        for (let j = i; j < 8; j++) {
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
    let playerBricks = [];
    for (let i = 0; i < 6; i++) {
        playerBricks.push(bricksArr.pop());
    }

    return ({
        playerBricks: playerBricks,
        bricksArr: bricksArr
    })
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
        player.score = 0;

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

    room.data.general = {
        historyState: [],
        historyIndex: -1,
        gameOver: false,
        winner: "",
        turnCounter: 0,
        turn: room.data.players[0].name,
        bricksArrayLength: room.data.bricksArr.length,

        clock: {
            interval: null,
            minutes: 0,
            seconds: 0,
            text: "00:00"
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
        console.log("set package player:", player);


    }

    return gamePackage;

}

function grabBrick(room, playerName) {

        for(let i = 0; i < room.data.players.length; i++ ) {
            //if (room.data.players[i].name === playerName) {
                //this.setHistoryState();

                if (room.data.bricksArr.length > 0) {
                    room.data.players[i].bricksArr.push(room.data.bricksArr.pop());
                    console.log("grab brick player bricks:" , room.data.players[i].bricksArr);
                    room.general.turnCounter++;

                    return true;
                }

            }
      //  }



}


module.exports = {createGame,setPackageGame,grabBrick};