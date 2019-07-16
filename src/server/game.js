
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
    for (let i = 0; i <= 6; i++) {
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
    let bricksArr = this.createBricksArray();
    let res, tempPlayers = [];

    

    room.players.map( player => {
        res = this.splitBricks(bricksArr);
        bricksArr = res.bricksArr;
        player.bricksArr = res.playerBricks;
        player.availableNumsOnBoard = [],
        player.scour = 0;

        console.log(player.name, " Bricks: ", player.bricksArr);
        console.log("playerBricks: ", player);
    });

    room.status = "playing";
    room.data = {

        players: room.players,
        bricksArr: bricksArr,
        
        board: {
            boardNumBricks: 0,
            boardCells: this.createBoard(),
        },

        general: {
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

    }
    delete room.players;
    
}


module.exports = {createGame };