
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
    console.log("bricks arr DB:",bricksArr );
    let brick = null;
    let playerBricks = [];
    for (let i = 0; i < 6; i++) {
        brick = bricksArr.pop();
        bricksScore = bricksScore + brick.num1 + brick.num2;
        playerBricks.push(brick);
    }

    console.log("playerBricks: ", playerBricks);

    return ({
        playerBricks: playerBricks,
        bricksArr: bricksArr,
        bricksScore: bricksScore
    })
}

function setGameOverStatistics(room) {

    let statisticsArray = [room.players.length];
    let minScore = room.players[0].statistics.score;

    for(let i = 0; i < statisticsArray.length; i++) {
        if(room.players[i].statistics.score <= minScore) {
            statisticsArray[i] = {
                statistics: room.players[i].statistics,
                name: room.players[i].name
            }
        }
    }

    statisticsArrray.sort(function(a, b){return (a.statistics.score < b.statistics.score)});

    return statisticsArrray;
}

function changeTurn(room,time) {
    
    let turnPlayerIndex = room.data.general.turnCounter % room.data.players.length;
    let player = room.data.players[turnPlayerIndex];
    player.statistics.countTurn++;

    calcAvg(player, time, room);

    room.data.general.turnCounter++;

    turnPlayerIndex = room.data.general.turnCounter % room.data.players.length;

    player = room.data.players[turnPlayerIndex];

    while(player.gameOver === true){
        turnPlayerIndex++;
        if(turnPlayerIndex > room.data.players.length - 1)
            turnPlayerIndex = 0;
        player = room.data.players[turnPlayerIndex];
    }



    room.data.general.turn = room.data.players[turnPlayerIndex].name;

    let today = new Date;

    room.data.general.turnStartTime = (today.getMinutes() * 60) + today.getSeconds();

}

function calcAvg(player, time, room){

    let timeInSec = (time.minutes * 60) + time.seconds;
  
    player.statistics.sumTurnTime += timeInSec - room.data.general.turnStartTime;

    let avg = player.statistics.sumTurnTime / player.statistics.countTurn;
    player.statistics.avgTurn =avg.toFixed(2);


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
    //let bricksArr = bricksDB;
    let res;
    room.data = {};

    room.players.map( player => {
        console.log("create game player: ", player);
        res = splitBricks(bricksArr);
        bricksArr = res.bricksArr;
        player.bricksArr = res.playerBricks;
        player.availableNumsOnBoard = [];
        player.gameOver = false;
        player.statistics = {
            score: res.bricksScore,
            grabCount: 0,
            avgTurn: 0.0,
            sumTurnTime: 0,
            countTurn: 0,
        }

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
        winner: null,
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
        id: room.id,

    };

    if (room.status === "playing") {

        for (let i = 0; i < room.data.players.length; i++) {
            if (room.data.players[i].name === playerName)
                player = room.data.players[i];

            else {
                enemies.push({
                    name: room.data.players[i].name,
                    numBricks: room.data.players[i].bricksArr.length,
                    gameOver: room.data.players[i].statistics.gameOver

                })
            }
        }

        gamePackage.general = room.data.general;
        gamePackage.board = room.data.board;
        gamePackage.player =  player;
        gamePackage.enemies = enemies;
    }
    else{
        for (let i = 0; i < room.players.length; i++) {
            if (room.players[i].name === playerName)
                player = room.players[i];

            else {
                //console.log("set enemies");
                enemies.push(room.players[i]);

            }
        }
        gamePackage.player = player;
        gamePackage.enemies = enemies;

    }
    return gamePackage;
}

function grabBrick(room, player) {

      let grabedBrick = null;

      if (room.data.bricksArr.length > 0) {
        grabedBrick = room.data.bricksArr.pop();
        player.bricksArr.push(grabedBrick);

        player.statistics.score += grabedBrick.num1 + grabedBrick.num2;

        player.statistics.grabCount++;
        room.data.general.bricksArrayLength = room.data.bricksArr.length;

        return true;
    }

    return false;



}

function onBrickDropped(droppedIndex, brick,room,player) {

    room.data.board.boardNumBricks++;
    //let boardCells = room.data.board.boardCells;
    room.data.board.turnCounter ++;
   // this.setHistoryState();

    room.data.board.boardCells[droppedIndex].brick = brick;

    player.statistics.score -= brick.num1 + brick.num2;

    removeBrickFromPlayerDeck(room, brick, player);

    isPlayerGameOver(room,player);

    return true;
}

function isGameOver(room)
{
    let stillPlaying = 0;
    for(let i = 0; i < room.data.players.length; i++){
        if(room.data.players[i].gameOver === false)
            stillPlaying++;
    }
    switch(room.numSigned)
    {
        case (1):
            if(stillPlaying === 0)
                room.data.general.gameOver = true;
            break;

        case(2):
        case(3):
            if(stillPlaying === 1)
                room.data.general.gameOver = true;
            break;

    }

    if(room.data.general.gameOver === true && room.data.general.winner === null){
        setWinnerMinScore(room);
    }

}

function setWinnerMinScore(room) {

    let minScore = room.data.players[0].statistics.score;
    for (let i = 0; i < room.data.players.length; i++) {
        if (room.data.players[i].statistics.score <= minScore) {
            minScore = room.data.players[i].statistics.score;
            room.data.general.winner = room.data.players[i].name;
        }
    }
}

function isPlayerGameOver(room,player) {

    console.log("is player game over room: ",room);
    console.log("is player game over player: ",player);

    if (player.bricksArr.length === 0) {
        console.log("player.bricksArr.length === 0");
        player.gameOver = true;
        player.statistics.score = 0;

        if(room.data.general.winner === null) {
            console.log("room.data.general.winner === null");

            room.data.general.winner = player.name;
        }
    }
    //if no more bricks to drag and all players have bricks
    else if (room.data.bricksArr.length === 0 && room.data.board.boardNumBricks > 0) {
        console.log("room.data.bricksArr.length === 0 && room.data.board.boardNumBricks > 0");

        if (isTurnPossible(room,player) === false) {
            console.log("isTurnPossible(room,player) === false");

            player.gameOver = true;
        }
    }
    if(player.gameOver === true) {
        console.log("player.gameOver === true");
        isGameOver(room);
    }
}

function isTurnPossible(room,player) {
    let availableNumsOnBoard = getAvailableBoardNums(room);
    let playerBricks= player.bricksArr;
    for (let i = 0 ; i < playerBricks.length ; i++){
        if (availableNumsOnBoard.includes( playerBricks[i].num1) || availableNumsOnBoard.includes(playerBricks[i].num2))
            return true;
    }

    return false;
}

function getAvailableBoardNums(room) {
    let availableNums = [];
    room.data.board.boardCells.map(cell => {
        if (cell.brick!== null && cell.brick.up !== null && availableNums.includes(cell.brick.up)===false)
            availableNums.push(cell.brick.up);

        if (cell.brick!== null && cell.brick.down!== null && availableNums.includes(cell.brick.down)===false)
            availableNums.push(cell.brick.down);

        if (cell.brick!== null && cell.brick.right !== null&& availableNums.includes(cell.brick.right)===false)
            availableNums.push(cell.brick.right);

        if (cell.brick!== null && cell.brick.left !== null&& availableNums.includes(cell.brick.left)===false)
            availableNums.push(cell.brick.left);
    });

    return availableNums;
}

function removeBrickFromPlayerDeck(room, onDragBrick ,player) {
    let i = 0;
    while (i < player.bricksArr.length) {
        const playerBrick = player.bricksArr[i];
        if ((onDragBrick.num1 === playerBrick.num1 &&
            onDragBrick.num2 === playerBrick.num2) || (onDragBrick.num1 === playerBrick.num2 &&
            onDragBrick.num2 === playerBrick.num1)) {
            player.bricksArr.splice(i, 1);
            i = player.bricksArr.length;
        } else
            i++;
    }
}

function handleDrop(room,dropData,player) {
    let res = null;
    let index = parseInt(dropData.index,10);
    let brick = {
        num1: parseInt(dropData.brick.num1,10),
        num2: parseInt(dropData.brick.num2,10),
    };

    //if(target.getAttribute('turn-red') === 'true')
        //target.setAttribute('turn-red' , 'false');
    if (room.data.board.boardNumBricks > 0) {
        console.log("handleDrop second drop room:", room);

        res = isLegalDrop(index,brick,room);
        if (res) {
            return onBrickDropped(index, res.brick, room,player);
        }
        else {
            //target.setAttribute('turn-red' , 'true');
            return false;
        }
    } else {
        console.log("handleDrop first drop room:", room);

        res = createDroppedBrick(room,0, null, null,brick.num1,brick.num2, null);
        return onBrickDropped(194, res, room,player);

    }

}

function isLegalDrop(index,brick,room) {

    let res;
    res = scanDown(index,brick,room);
    if (res !== null)
        return res;

    res = scanUp(index,brick,room);

    if (res !== null)
        return res;

    res = scanLeft(index,brick,room);

    if (res !== null)
        return res;

    res = scanRight(index,brick,room);
    if (res !== null)
        return res;

    return null;

}

function createDroppedBrick(room, neighborIndex, offNum, onNum, num1, num2, scanDir) {
    let res = null;
    if (room.data.board.boardNumBricks > 0) {

        if (num1 === num2) {
            res = {
                up: (scanDir === "up" ? null : onNum),
                down: (scanDir === "down" ? null : onNum),
                right: (scanDir === "right" ? null : onNum),
                left: (scanDir === "left" ? null : onNum),
                num1: num1,
                num2: num2,
                direction: (room.data.board.boardCells[neighborIndex].brick.direction === "vertical" ? "horizontal" : "vertical"),
                sides: 4
            };

        } else {
            let isVertical = room.data.board.boardCells[neighborIndex].brick.direction === "vertical";
            let direction;
            if (!isVertical && (scanDir === "up" || scanDir === "down"))
                direction = "vertical";
            else {
                if (isVertical && (scanDir === "left" || scanDir === "right"))
                    direction = "horizontal";
                else
                    direction = room.data.board.boardCells[neighborIndex].brick.direction;
            }
            res = {
                up: (direction === "horizontal" || scanDir === "up" ? null : onNum),
                down: (direction === "horizontal" || scanDir === "down" ? null : onNum),
                right: (direction === "vertical" || scanDir === "right" ? null : onNum),
                left: (direction === "vertical" || scanDir === "left" ? null : onNum),
                num1: num1,
                num2: num2,
                direction: direction,
                sides: 2
            };
        }

    } else {
       if (num1 === num2){
            res = {
                up: num1,
                down: num1,
                right: num1,
                left: num1,
                num1: num1,
                num2: num2,
                direction: "vertical",
                sides: 4
            };


        } else {

            res = {
                up: num1,
                down: num2,
                right: null,
                left: null,
                num1: num1,
                num2: num2,
                direction: "vertical",
                sides: 2
            };

        }

    }

    return res;
}

function scanUp(index,brick,room) {
    let res = null;
    if (index - 30 >= 0 && room.data.board.boardCells[index - 30].brick && room.data.board.boardCells[index - 30].brick.down !== null) {
        if (room.data.board.boardCells[index - 30].brick.down ===brick.num1) {
            room.data.board.boardCells[index - 30].brick.down = null;
            res = {
                brick: createDroppedBrick(room,index - 30,brick.num1,brick.num2,brick.num1,brick.num2, "up"),
                neighborIndex: index - 30,
                scanDir: "up"
            };
        }


        if (room.data.board.boardCells[index - 30].brick.down ===brick.num2) {
            room.data.board.boardCells[index - 30].brick.down = null;
            res = {
                brick:createDroppedBrick(room,index - 30,brick.num2,brick.num1,brick.num2,brick.num1, "up"),
                neighborIndex: index - 30,
                scanDir: "up"
            };
        }
    }


    return res;
}

function scanDown(index,brick,room) {

    let res = null;
    if (index + 30 < 900 && room.data.board.boardCells[index + 30].brick !== null && room.data.board.boardCells[index + 30].brick.up !== null) {
        if (room.data.board.boardCells[index + 30].brick.up ===brick.num1) {
            room.data.board.boardCells[index + 30].brick.up = null;
            res = {
                brick:createDroppedBrick(room,index + 30,brick.num1,brick.num2,brick.num2,brick.num1, "down"),
                neighborIndex: index + 30,
                scanDir: "down"
            };
        }

        if (room.data.board.boardCells[index + 30].brick.up ===brick.num2) {
            room.data.board.boardCells[index + 30].brick.up = null;
            res = {
                brick:createDroppedBrick(room,index + 30,brick.num2,brick.num1,brick.num1,brick.num2, "down"),
                neighborIndex: index + 30,
                scanDir: "down"
            };
        }

    }

    return res;
}

function scanRight(index,brick,room) {
    let res = null;
    if ((index + 1) % 30 < 30 && room.data.board.boardCells[index + 1].brick !== null && room.data.board.boardCells[index + 1].brick.left !== null) {
        if (room.data.board.boardCells[index + 1].brick.left ===brick.num1) {
            room.data.board.boardCells[index + 1].brick.left = null;
            res = {
                brick: createDroppedBrick(room,index + 1,brick.num1,brick.num2,brick.num2,brick.num1, "right"),
                neighborIndex: index + 1,
                scanDir: "right"
            };
        }

        if (room.data.board.boardCells[index + 1].brick.left ===brick.num2) {
            room.data.board.boardCells[index + 1].brick.left = null;
            res = {
                brick: createDroppedBrick(room,index + 1,brick.num2,brick.num1,brick.num1,brick.num2, "right"),
                neighborIndex: index + 1,
                scanDir: "right"
            };
        }

    }
    return res;
}

function scanLeft(index,brick,room) {
    let res = null;
    if ((index - 1) % 30 >= 0 && room.data.board.boardCells[index - 1].brick !== null && room.data.board.boardCells[index - 1].brick.right !== null) {
        if (room.data.board.boardCells[index - 1].brick.right ===brick.num1) {
            room.data.board.boardCells[index - 1].brick.right = null;
            res = {
                brick: createDroppedBrick(room,index - 1,brick.num1,brick.num2,brick.num1,brick.num2, "left"),
                neighborIndex: index - 1,
                scanDir: "left"
            };

        }
        if (room.data.board.boardCells[index - 1].brick.right ===brick.num2) {
            room.data.board.boardCells[index - 1].brick.right = null;
            res = {
                brick: createDroppedBrick(room,index - 1,brick.num2,brick.num1,brick.num2,brick.num1, "left"),
                neighborIndex: index - 1,
                scanDir: "left"
            };
        }

    }
    return res;
}

module.exports = {createGame,
                setPackageGame,
                grabBrick,
                handleDrop,
                changeTurn,
    isPlayerGameOver,
    setGameOverStatistics};