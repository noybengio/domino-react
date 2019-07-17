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
            clockInterval: null,

            onDragBrick: null,

            zoom: 100,
            clock: {
                minutes: 0,
                seconds: 0,
                time: "00:00"
            }
        };
        let today = new Date();

        this.state.clock.minutes = today.getMinutes() - this.props.general.clock.minutes;
        this.state.clock.seconds = today.getSeconds() - this.props.general.clock.seconds;


        this.state.clockInterval = setInterval(this.setTime.bind(this), 1000);
       

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

    handleDrop(target) {
        let res = null;
        let index = parseInt(target.getAttribute('cellindex'), 10);

        if(target.getAttribute('turn-red') === 'true')
            target.setAttribute('turn-red' , 'false');
        if (this.state.boardNumBricks > 0) {
            res = this.isLegalDrop(index);
            if (res) {
                this.onBrickDropped(index, res.brick);
            }
            else {
                target.setAttribute('turn-red' , 'true');
            }
        } else {
            res = this.createDroppedBrick(0, null, null, this.state.onDragBrick.num1, this.state.onDragBrick.num2, null);
            this.onBrickDropped(194, res);

        }

    }

    isLegalDrop(index) {

        let res = null;
        res = this.scanDown(index);
        if (res !== null)
            return res;

        res = this.scanUp(index);

        if (res !== null)
            return res;

        res = this.scanLeft(index);

        if (res !== null)
            return res;

        res = this.scanRight(index);
        if (res !== null)
            return res;

        return null;

    }

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

    scanUp(index) {
        let res = null;
        if (index - 30 >= 0 && this.state.boardCells[index - 30].brick && this.state.boardCells[index - 30].brick.down !== null) {
            if (this.state.boardCells[index - 30].brick.down === this.state.onDragBrick.num1) {
                this.state.boardCells[index - 30].brick.down = null;
                res = {
                    brick: this.createDroppedBrick(index - 30, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "up"),
                    neighborIndex: index - 30,
                    scanDir: "up"
                };
            }


            if (this.state.boardCells[index - 30].brick.down === this.state.onDragBrick.num2) {
                this.state.boardCells[index - 30].brick.down = null;
                res = {
                    brick: this.createDroppedBrick(index - 30, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "up"),
                    neighborIndex: index - 30,
                    scanDir: "up"
                };
            }
        }


        return res;
    }

    scanDown(index) {

        let res = null;
        if (index + 30 < 900 && this.state.boardCells[index + 30].brick !== null && this.state.boardCells[index + 30].brick.up !== null) {
            if (this.state.boardCells[index + 30].brick.up === this.state.onDragBrick.num1) {
              this.state.boardCells[index + 30].brick.up = null;
                res = {
                    brick: this.createDroppedBrick(index + 30, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "down"),
                    neighborIndex: index + 30,
                    scanDir: "down"
                };
            }

            if (this.state.boardCells[index + 30].brick.up === this.state.onDragBrick.num2) {
                this.state.boardCells[index + 30].brick.up = null;
                res = {
                    brick: this.createDroppedBrick(index + 30, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "down"),
                    neighborIndex: index + 30,
                    scanDir: "down"
                };
            }

        }

        return res;
    }

    scanRight(index) {
        let res = null;
        if ((index + 1) % 30 < 30 && this.state.boardCells[index + 1].brick !== null && this.state.boardCells[index + 1].brick.left !== null) {
            if (this.state.boardCells[index + 1].brick.left === this.state.onDragBrick.num1) {
                this.state.boardCells[index + 1].brick.left = null;
                res = {
                    brick: this.createDroppedBrick(index + 1, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "right"),
                    neighborIndex: index + 1,
                    scanDir: "right"
                };
            }

            if (this.state.boardCells[index + 1].brick.left === this.state.onDragBrick.num2) {
                this.state.boardCells[index + 1].brick.left = null;
                res = {
                    brick: this.createDroppedBrick(index + 1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "right"),
                    neighborIndex: index + 1,
                    scanDir: "right"
                };
            }

        }
        return res;
    }

    scanLeft(index) {
        let res = null;
        if ((index - 1) % 30 >= 0 && this.state.boardCells[index - 1].brick !== null && this.state.boardCells[index - 1].brick.right !== null) {
            if (this.state.boardCells[index - 1].brick.right === this.state.onDragBrick.num1) {
                this.state.boardCells[index - 1].brick.right = null;
                res = {
                    brick: this.createDroppedBrick(index - 1, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "left"),
                    neighborIndex: index - 1,
                    scanDir: "left"
                };

            }
            if (this.state.boardCells[index - 1].brick.right === this.state.onDragBrick.num2) {
                this.state.boardCells[index - 1].brick.right = null;
                res = {
                    brick: this.createDroppedBrick(index - 1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "left"),
                    neighborIndex: index - 1,
                    scanDir: "left"
                };
            }

        }
        return res;
    }

    grabBrick() {
        let date = new Date;
        fetch(`${this.props.url}/game/grabBrick/${this.props.roomId}`, {
            method: "Get"
        })
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("grab brick fetch error: ");
                        return;
                    })
                }

            });
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

                console.log("get data gamer :",gamePackage);

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
        let minutes = this.state.clock.minutes;
        let seconds = this.state.clock.seconds;
        let time = "";

        seconds++;

        if(seconds === 60){
            minutes++;
            seconds = 0;
        }

        time = (minutes < 10 ? `0${minutes}` : `${minutes}`) + ":" + (seconds < 10 ? `0${seconds}` : `${seconds}`);

        this.setState({
            clock: {
                minutes: minutes,
                seconds: seconds,
                time: time
            }
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
        //const historyLength = this.state.general.historyState.length;
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
                />

                <div className = {"player-statistics-container"}>
                    <Statistics
                        //to bind button funciton
                        game={this}

                        countTurns={this.state.general.turnCounter}
                        gameOver={this.state.general.gameOver}
                        bricksArrayLength={this.state.general.bricksArrayLength}
                        winner={this.state.general.winner}

                        playerStatistics = {this.state.player.statistics}

                        //nextButton={this.state.general.historyIndex === this.state.general.historyState.length - 1}
                        nextButton = {true}
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

                        time = {this.state.clock.time}
                        turn = {this.state.general.turn}
                        name = {this.state.player.name}
                    />

                    <Player
                        id="player"
                        belongTo = {"player"}
                        name = {this.state.player.name}
                        bricks={this.state.player.bricksArr}
                        setDragBrick={this.setDragBrick}
                        game={this}
                        turn = {this.state.general.turn}
                        isTurn = {this.setState.general.turn == this.state.player.name}
                    />

                </div>
                {this.state.enemies[0] !== undefined &&
                <Player
                    belongTo = {"enemy"}
                    className = {this.state.numPlayers === 2 ? "enemy-container-top" : "enemy-container-left"}
                    name = {this.state.enemies[0].name}
                    numOfBricks = {this.state.enemies[0].numBricks}
                    bricks= {this.state.enemies[0].bricks}
                    score = {this.state.enemies[0].score}
                    turn = {this.state.general.turn}
                    isTurn = {this.setState.general.turn == this.state.enemies[0].name}
                />
                }


                {this.state.enemies[1] !== undefined &&
                <Player
                    belongTo = {"enemy"}
                    className = "enemy-container-right"
                    name = {this.state.enemies[1].name}
                    numOfBricks = {this.state.enemies[1].numBricks}
                    bricks= {this.state.enemies[1].bricks}
                    score = {this.state.enemies[1].score}
                    isTurn = {this.setState.general.turn == this.state.enemies[0].name}
                />
                }

                {this.state.status === "waiting" &&
                <WaitingPopUp
                    numSigned = {this.state.numSigned}
                    numReq = {this.state.numReq}
                    status = {this.state.status}
                    lobby = {this.props.lobby}
                    goLobby = {this.props.goLobby}
                    isTurn = {this.setState.general.turn == this.state.enemies[1].name}
                />
                }
            </div>
        );
    }
}

export default Game;