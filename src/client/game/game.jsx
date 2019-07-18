import React from 'react';
import Player from "./player/player.jsx";
import Board from "./board/board.jsx";
import Statistics from "./statistics/statistics.jsx";
import WaitingPopUp from "./waitingPopUp/waitingPopUp.jsx";
import './game.css'

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numReq :this.props.numReq,
            numSigned: this.props.numSigned,
            status: this.props.status,
            player: this.props.player,
            enemies: this.props.enemies,
            general: this.props.general,
            board: this.props.board,
            clockInterval: null,

            dataInterval: setTimeout(this.getGameData.bind(this), 1000),


            onDragBrick: null,

            zoom: 100,
            clock: {
                minutes: 0,
                seconds: 0,
                time: "00:00"
            }
        };

        if(this.state.status === "playing"){
            let today = new Date();
            this.state.minutes = today.getMinutes() - this.state.general.clock.minutes;
            this.state.seconds = today.getSeconds() - this.state.general.clock.seconds;
            this.state.clockInterval = setInterval(this.setTime.bind(this), 1000);

        }

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
                if(gamePackage.status === "playing"){
                    if(this.state.status === "waiting"){
                        this.startGame(gamePackage);

                    }
                    else {
                        this.setState({
                            player: gamePackage.player,
                            enemies: gamePackage.enemies,
                            general: gamePackage.general,
                            status: gamePackage.status,
                            board: gamePackage.board,
                            dataInterval: setTimeout(this.getGameData.bind(this), 1000),
                        });
                    }
                }
                else{
                    this.setState({
                        numSigned: gamePackage.numSigned,
                        player: gamePackage.player,
                        enemies: gamePackage.enemies,
                        dataInterval: setTimeout(this.getGameData.bind(this), 1000),

                    });
                }

            })
            .catch(error => console.log("in catch error :" , error))

    }


    startGame(gamePackage)
    {
        let today = new Date();
        let minutes = today.getMinutes() - gamePackage.clock.minutes;
        let seconds = today.getSeconds() - gamePackage.clock.seconds;

        this.setState({
            player: gamePackage.player,
            enemies: gamePackage.enemies,
            numReq :gamePackage.numReq,
            numSigned: gamePackage.numSigned,
            general: gamePackage.general,
            status: gamePackage.status,
            board: gamePackage.board,
            dataInterval: setTimeout(this.getGameData.bind(this), 1000),

            onDragBrick: null,

            clock: {
                minutes: minutes,
                seconds: seconds,
            },
            clockInterval: setInterval(this.setTime.bind(this), 1000),

        });

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
        clearInterval(this.state.clockInterval);
        this.setState({clockInterval:null});
    }

    render() {
        //const historyLength = this.state.general.historyState.length;
        let gameStart = this.state.status === "playing";
        if(gameStart && this.state.general.gameOver === true)
            this.stopClock();

        return (
            <div className="game">
                {   gameStart === true &&
                    <Board
                        moveBrick={this.moveBrick}
                        game={this}
                        id="board"
                        boardCells={this.state.board.boardCells}
                        handleDrop={this.handleDrop}
                        numBricks={this.state.board.boardNumBricks}
                    />

                }

                <div className = "player-statistics-container">
                {   gameStart === true &&
                    <Statistics
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
                }

                    <Player
                        id="player"
                        belongTo = {"player"}
                        name = {this.state.player.name}
                        bricks= { this.state.status === "playing" ? this.state.player.bricksArr : undefined}
                        setDragBrick={this.setDragBrick}
                        game={this}
                        status = {this.state.status}
                        isTurn = {this.state.status === "playing" ? (this.state.general.turn === this.state.player.name) : undefined}
                    />

                </div>
                {this.state.enemies[0] !== undefined &&
                <Player
                    belongTo = {"enemy"}
                    className = {this.state.numSigned === 2 ? "enemy-container-top" : "enemy-container-left"}
                    name = {this.state.enemies[0].name}
                    bricks= { this.state.status === "playing" ? new Array(this.state.enemies[0].numBricks).fill(0) : undefined}
                    isTurn = {this.state.status === "playing" ? (this.state.general.turn === this.state.enemies[0].name) : undefined}
                    status = {this.state.status}

                />
                }


                {this.state.enemies[1] !== undefined &&
                <Player
                    belongTo = {"enemy"}
                    className = "enemy-container-right"
                    name = {this.state.enemies[1].name}
                    bricks= { this.state.status === "playing" ? new Array(this.state.enemies[1].numBricks).fill(0) : undefined}
                    isTurn = {this.state.status === "playing" ? (this.state.general.turn === this.state.enemies[1].name) : undefined}
                    status = {this.state.status}

                />

                }

                {this.state.status === "waiting" &&
                <WaitingPopUp
                    numSigned = {this.state.numSigned}
                    numReq = {this.state.numReq}
                    status = {this.state.status}
                    lobby = {this.props.lobby}
                    exitRoom = {this.props.exitRoom}
                />
                }
            </div>
        );
    }
}

export default Game;