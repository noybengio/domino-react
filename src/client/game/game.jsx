import React from 'react';
import Player from "./player/player.jsx";
import Board from "./board/board.jsx";
import Statistics from "./statistics/statistics.jsx";
import GameOverStatistics from "./gameOverStatistics/gameOverStatistics.jsx";

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
            showGameOverStatistics: true,
            gameOverStatistics: [],

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

        this.props.exitRoom.bind(this.props.game);

    }

    setGameOverStatistics()
    {
        let gameOverStatistics = [];
        fetch(`${this.props.url}/game/gameOverStatistics/${this.props.roomId}`, {
            method: "Get"
        })
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("cannot get gameOverStatistics error: ", error);

                    })
                }
                return res.json();
            })
            .then(resStatistics => {
                gameOverStatistics = resStatistics;

            })
            .catch(error => console.log("in catch error :" , error))
        return gameOverStatistics;

    }

    grabBrick() {

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
        let gameOverStatistics =[];
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
                        if(this.state.general.gameOver === true)
                             gameOverStatistics = this.setGameOverStatistics();
                        this.setState({
                            player: gamePackage.player,
                            enemies: gamePackage.enemies,
                            general: gamePackage.general,
                            status: gamePackage.status,
                            board: gamePackage.board,
                            dataInterval: setTimeout(this.getGameData.bind(this), 1000),
                            gameOverStatistics: gameOverStatistics

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
        let minutes = today.getMinutes() - gamePackage.general.clock.minutes;
        let seconds = today.getSeconds() - gamePackage.general.clock.seconds;

        this.setState({
            player: gamePackage.player,
            enemies: gamePackage.enemies,
            numReq :gamePackage.numReq,
            numSigned: gamePackage.numSigned,
            general: gamePackage.general,
            status: gamePackage.status,
            board: gamePackage.board,
            dataInterval: setTimeout(this.getGameData.bind(this), 1000),

            clock: {
                minutes: minutes,
                seconds: seconds,
            },
            clockInterval: setInterval(this.setTime.bind(this), 1000),

        });

    }

    handleDrop(index, target)
    {

        let brickObject = {index: index,
            brick: this.state.onDragBrick};

        if(target.getAttribute('turn-red') === 'true')
            target.setAttribute('turn-red' , 'false');

        fetch(`${this.props.url}/game/onDrop/${this.props.roomId}`, {
            body: JSON.stringify(brickObject),
            method: "POST"
        })
            .then(res => {

                if (res.status !== 200) {
                    target.setAttribute('turn-red' , 'true');
                }
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

  exitGame(){
    clearInterval(this.state.dataInterval);
    this.props.exitRoom.bind(this.props.game)();

  }

    stopIntervals() {
        clearInterval(this.state.clockInterval);
        clearTimeout(this.state.dataInterval);
    }

  exitLobby(){
    this.props.exitRoom.bind(this.props.game)();

  }

    closeGameOverStatistics(){

         this.setState({
             showGameOverStatistics: false
         })

    }

    render() {

        let gameStart = this.state.status === "playing";
        if(gameStart && this.state.general.gameOver === true)
            this.stopIntervals();

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
                        exitLobby = {this.exitLobby}
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
                    game = {this}
                    exitRoom = {this.exitGame}
                />
                }

                {
                    ( this.state.status === "playing" && (this.state.general.gameOver === true && this.state.showGameOverStatistics === true) &&
                            <GameOverStatistics
                                statistics = {this.state.gameOverStatistics}
                                name = {this.state.player.name}
                                winner = {this.state.general.winner}
                                closeGameOverStatistics = {this.closeGameOverStatistics}
                                game = {this}
                            />)
                }
            </div>
        );
    }
}

export default Game;