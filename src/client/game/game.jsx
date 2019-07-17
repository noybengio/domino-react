import React from 'react';
import Player from "./player/player.jsx";
import Board from "./board/board.jsx";
import Statistics from "./statistics/statistics.jsx";
import WaitingPopUp from "./waitingPopUp/waitingPopUp.jsx";
import './game.css'

class Game extends React.Component {

    constructor(props) {
        super(props);

        /*call function to get bricks and data from server */

        this.state = {
            player: this.props.player,
            enemies: this.props.enemies,
            numReq :this.props.numReq,
            numSigned: this.props.numSigned,
            general: this.props.general,
            status: this.props.status,
            board: this.props.board,

            dataInterval: setTimeout(this.getGameData.bind(this), 1000),

            onDragBrick: null,

            zoom: 100,
        };

        //this.state.interval = setInterval(this.setTime.bind(this), 1000);

    }

    createBoard() {
        let tempBoard = [];
        for (let i = 0; i < 900; i++) {
            tempBoard.push({
                index: i,
                brick: null
            })
        }
        return tempBoard;
    }

    createBricksArray() {
        let bricksArr = [];
        for (let i = 0; i < 7; i++)
            for (let j = i; j < 7; j++) {
                bricksArr.push({num1: i, num2: j, used: false});

            }

        return this.shuffleBricks(bricksArr);
    }

    shuffleBricks(bricksArr) {
        let j, x, i;
        for (i = bricksArr.length - 1; i >= 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = bricksArr[i];
            bricksArr[i] = bricksArr[j];
            bricksArr[j] = x;
        }

        return bricksArr;
    }

    splitBricks(bricksArr) {
        let playerBricks = [];
        for (let i = 0; i < 6; i++) {
            playerBricks.push(bricksArr.pop());
        }

        return ({
            playerBricks: playerBricks,
            bricksArr: bricksArr
        })
    }

    onBrickDropped(droppedIndex, res) {
        let boardNumBricks = this.state.boardNumBricks + 1;
        let boardCells = this.state.boardCells;
        let turnCounter = this.state.turnCounter + 1;
        this.setHistoryState();

        boardCells[droppedIndex].brick = res;

        this.removeBrickFromPlayerDeck();

        this.setState({
            boardCells: boardCells,
            boardNumBricks: boardNumBricks,
            turnCounter: turnCounter,
        });

        this.isGameOver();
    }

    removeBrickFromPlayerDeck() {
        let playerBricks = this.state.playerBricks;
        let i = 0;
        while (i < playerBricks.length) {
            const brick = playerBricks[i];
            if (brick.num1 === this.state.onDragBrick.num1 &&
                brick.num2 === this.state.onDragBrick.num2) {
                playerBricks.splice(i, 1);
                i = playerBricks.length;
            } else
                i++;
        }

        this.setState({playerBricks: playerBricks});
    }

    setDragBrick(num1, num2) {
        this.setState({onDragBrick: {num1: num1, num2: num2}});
    }

    setUsedBrick(num1, num2) {
        let playerBricks = this.state.playerBricks;

        let index = playerBricks.map((brick, i) => {
            if (brick !== null && brick.num1 === num1 && brick.num2 === num2)
                return i;
        });

        playerBricks[index].brick.used = true;

        return playerBricks;


    }
/*
    createDroppedBrick(neighborIndex, offNum, onNum, num1, num2, scanDir) {
        let res = null;
        if (this.state.boardNumBricks > 0) {

            if (num1 === num2) {
                res = {
                    up: (scanDir === "up" ? null : onNum),
                    down: (scanDir === "down" ? null : onNum),
                    right: (scanDir === "right" ? null : onNum),
                    left: (scanDir === "left" ? null : onNum),
                    num1: num1,
                    num2: num2,
                    direction: (this.state.boardCells[neighborIndex].brick.direction === "vertical" ? "horizontal" : "vertical"),
                    sides: 4
                };

            } else {
                let isVertical = this.state.boardCells[neighborIndex].brick.direction === "vertical";
                let direction;
                if (!isVertical && (scanDir === "up" || scanDir === "down"))
                    direction = "vertical";
                else {
                    if (isVertical && (scanDir === "left" || scanDir === "right"))
                        direction = "horizontal";
                    else
                        direction = this.state.boardCells[neighborIndex].brick.direction;
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
            if (this.state.onDragBrick.num1 === this.state.onDragBrick.num2) {
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
*/
    grabBrick() {

        fetch(`${this.props.url}/game/grabBrick/${this.props.roomId}`, {
            method: "Get"
        })
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("grab brick fetch error: ", error);
                        return;
                    })
                }

            });
    }
    noy(){
        console.log("noy");
    }
    getGameData()
    {
        fetch(`${this.props.url}/game/${this.props.roomId}`, {
            method:"Get"} )
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("get game data error :" ,error );
                        this.setState({
                            dataInterval: setTimeout(this.getGameData.bind(this), 1000)
                        });
                    })
                }
                return res.json();
            })
            .then(gamePackage => {

                console.log("get data game player :",gamePackage);

                this.setState({
                    player: gamePackage.player,
                    enemies: gamePackage.enemies,
                    general: gamePackage.general,
                    status: gamePackage.status,
                    board: gamePackage.board,
                    dataInterval: setTimeout(this.getGameData.bind(this), 1000),
                });
            })
            .catch(error => console.log("in catch error :" , error))

    }

    handleDrop(index)
    {
        let noy;
        let brickObject = {index: index,
            brick: this.state.onDragBrick};

        console.log("client handleDrop brick: ", brickObject.brick);
        fetch(`${this.props.url}/game/onDrop/${this.props.roomId}`, {
            body: JSON.stringify(brickObject),
            method: "POST"
        })
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("on drop error: ", error);
                        return;
                    })
                }

            });
    }

    isGameOver() {
        let res = {
            gameOver: false,
            winner: ""
        };
        if (this.state.playerBricks.length === 0) {
            res.gameOver = true;
            res.winner = "player1"
        }
        else if (this.state.bricksArr.length === 0 && this.state.boardNumBricks > 0) {
            if (this.isTurnPossible() === false)
                res.gameOver = true;

        }

        if( res.gameOver === true) {
            this.setState({
                gameOver:res.gameOver,
                winner: res.winner
            });

            this.setHistoryState();
        }
    }

    getAvailableBoardNums() {
        let availableNums = [];
        this.state.boardCells.map(cell => {
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

    isTurnPossible() {
        let availableNumsOnBoard = this.getAvailableBoardNums();
        for (let i = 0 ; i < this.state.playerBricks.length ; i++){
            if (availableNumsOnBoard.includes( this.state.playerBricks[i].num1) || availableNumsOnBoard.includes(this.state.playerBricks[i].num2))
                return true;
        }

        return false;
    }

    setHistoryState() {
        let newState = JSON.parse(JSON.stringify(this.state));
        delete newState.historyState;
        delete newState.historyIndex;
        let historyState = this.state.historyState;
        let historyIndex = this.state.historyIndex;

        historyState.push(newState);
        historyIndex = historyState.length - 1;


        this.setState({
            historyState: historyState,
            historyIndex: historyIndex,
        });
    }

    setPrevHistory() {
        let historyIndex = this.state.historyIndex;
        if (historyIndex > 0)
            historyIndex--;

        let prevState = this.state.historyState[historyIndex];

        this.setState({
            score1: prevState.score1,
            score2: prevState.score2,
            bricksArr: prevState.bricksArr,
            playerBricks: prevState.playerBricks,
            availableNumsOnBoard: prevState.availableNumsOnBoard,
            historyIndex: historyIndex,
            boardCells: prevState.boardCells,
            boardNumBricks: prevState.boardNumBricks,
            turnCounter: prevState.turnCounter,
            minutes: prevState.minutes,
            seconds: prevState.seconds,
            time: prevState.time
        });


    }

    setNextHistory() {
        let historyIndex = this.state.historyIndex;
        if (historyIndex < this.state.historyState.length - 1)
            historyIndex++;

        let nextState = this.state.historyState[historyIndex];

        this.setState({
            score1: nextState.score1,
            score2: nextState.score2,
            bricksArr: nextState.bricksArr,
            playerBricks: nextState.playerBricks,
            availableNumsOnBoard: nextState.availableNumsOnBoard,
            historyIndex: historyIndex,
            boardCells: nextState.boardCells,
            boardNumBricks: nextState.boardNumBricks,
            turnCounter: nextState.turnCounter,
            minutes: nextState.minutes,
            seconds: nextState.seconds,
            time: nextState.time
        });
    }

    startNewGame() {

        let boardCells = this.createBoard();
        let bricksArr = this.createBricksArray();
        let res = this.splitBricks(bricksArr);
        let playerBricks = res.playerBricks;
        bricksArr = res.bricksArr;

        this.setState({
            score1: 0,
            score2: 0,
            bricksArr: bricksArr,
            playerBricks: playerBricks,
            availableNumsOnBoard: [],
            historyState: [],
            historyIndex: -1,
            boardCells: boardCells,
            onDragBrick: null,
            boardNumBricks: 0,
            gameOver: false,
            winner: "",
            turnCounter: 0,
            zoom: 100,
            minutes: 0,
            seconds: 0,
            interval:setInterval(this.setTime.bind(this), 1000),
            time: "00:00"
        });
    }

    zoomIn() {
        let zoom = this.state.zoom;

        zoom += 5;
        // let board = document.getElementsByClassName("board")[0];
        // let style  =board.style;
        document.getElementsByClassName("board")[0].style.zoom = `${zoom}%`;

        this.setState({zoom: zoom});
    }

    zoomOut() {
        let zoom = this.state.zoom;

        zoom -= 5;
        // let board = document.getElementsByClassName("board")[0];

        // let style  =board.style.zoom;
        document.getElementsByClassName("board")[0].style.zoom = `${zoom}%`;
        this.setState({zoom: zoom});
    }

    setTime(){
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;
        let time = "";

        seconds++;

        if(seconds === 60){
            minutes++;
            seconds = 0;
        }

        time = (minutes < 10 ? `0${minutes}` : minutes) + ":" + (seconds < 10 ? `0${seconds}` : seconds);

        this.setState({
            minutes: minutes,
            seconds: seconds,
            time: time
        });


    }

    goLobby() {
        this.setState({
            screen: "Lobby",
        });

    }

    stopClock() {
        clearInterval(this.state.interval);
    }

    render() {
        const historyLength = this.state.general.historyState.length;
        if(this.state.gameOver === true)
            this.stopClock();

        return (
            <div className="game">

                <Board
                    moveBrick={this.moveBrick}
                    game={this}
                    id="board"
                    boardCells={this.state.board.boardCells}
                    handleDrop={this.handleDrop}
                    numBricks={this.state.board.boardNumBricks}
                    roomId = {this.state.roomId}
                />

                <div className = {"player-statistics-container"}>
                    <Statistics
                        //to bind button funciton
                        game={this}

                        countTurns={this.state.general.turnCounter}
                        gameOver={this.state.general.gameOver}
                        bricksArrayLength={this.state.general.bricksArrayLength}
                        winner={this.state.general.winner}

                        nextButton={this.state.general.historyIndex === this.state.general.historyState.length - 1}
                        setNextHistory={this.setNextHistory}

                        prevButton={this.state.general.historyIndex === 0}
                        setPrevHistory={this.setPrevHistory}

                        grabBrick={this.grabBrick}

                        startNewGame={this.startNewGame}

                        turnCounter={this.state.general.turnCounter}

                        undoStep = {this.undoStep}

                        zoom = {this.state.zoom}
                        zoomIn = {this.zoomIn}
                        zoomOut = {this.zoomOut}

                        time = {this.state.general.time}
                    />

                    <Player
                        id="player"
                        belongTo = {"player"}
                        name = {this.state.player.name}
                        bricks={this.state.player.bricksArr}
                        setDragBrick={this.setDragBrick}
                        game={this}
                    />

                </div>
                {this.state.enemies[0] !== undefined &&
                <Player
                    id="enemy1"
                    belongTo = {"enemy"}
                    className = {this.state.numPlayers === 2 ? "enemy-container-top" : "enemy-container-left"}
                    name = {this.state.enemies[0].name}
                    numOfBricks = {this.state.enemies[0].numBricks}
                    bricks= {this.state.enemies[0].bricks}
                    score = {this.state.enemies[0].score}
                />
                }


                {this.state.enemies[1] !== undefined &&
                <Player
                    id="enemy2"
                    belongTo = {"enemy"}
                    className = "enemy-container-right"
                    name = {this.state.enemies[1].name}
                    numOfBricks = {this.state.enemies[1].numBricks}
                    bricks= {this.state.enemies[1].bricks}
                    score = {this.state.enemies[1].score}

                />
                }

                {this.state.status === "waiting" &&
                <WaitingPopUp
                    numSigned = {this.state.numSigned}
                    numReq = {this.state.numReq}
                    status = {this.state.status}
                    lobby = {this.props.lobby}
                    goLobby = {this.props.goLobby}
                />
                }
            </div>
        );
    }
}

export default Game;