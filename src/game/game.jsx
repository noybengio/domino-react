import React from 'react';
import Player from "../player/player.jsx";
import Board from "../board/board.jsx";
import Statistics from "../statistics/statistics.jsx";
import './game.css'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score1: 0,
            score2: 0,
            bricksArr: [],
            playerBricks: [],
            availableNumsOnBoard: [],
            historyState: [],
            historyIndex: -1,
            boardCells: this.createBoard(),
            onDragBrick: null,
            boardNumBricks: 0,
            gameOver: false,
            winner: "",
                };
        
        this.createBricksArray();
        this.setPlayerBricks();

    }

    createBoard() {
        let tempBoard = [];
        for (let i = 0; i < 100; i++) {
            tempBoard.push({
                index: i,
                brick: null
            })
        }
        return tempBoard;
    }

    createBricksArray() {
        let bricksArr = this.state.bricksArr;

        for (let i = 0; i < 7; i++)
            for (let j = i; j < 7; j++) {
                bricksArr.push({num1: i, num2: j, used: false});
            }

        this.shuffleBricks(bricksArr);
    }

    shuffleBricks(bricksArr) {
        let j, x, i;
        for (i = bricksArr.length - 1; i >= 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = bricksArr[i];
            bricksArr[i] = bricksArr[j];
            bricksArr[j] = x;
        }

         this.setState({ bricksArr: bricksArr});
    }

    hitBrick() {
        let playerBricks = this.state.playerBricks;
        let bricksArr = this.state.bricksArr;
        playerBricks.push(bricksArr.pop());

        this.setState({playerBricks: playerBricks, bricksArr: bricksArr });
    }

    setPlayerBricks() {
        for (let i = 0; i < 6; i++) {
            this.hitBrick();
        }
    }

    /*onBrickStartDragging(draggedBrick) {
        console.log(" game onBrickStartDragging");
        this.setState((_) => {
            return {draggedBrick};
        });
    }*/

    onBrickDropped(droppedIndex, res) {
        //console.log(" game onBrickDropped player bricks before:", this.state.playerBricks);
      //  console.log(" game onBrickDropped board bricks before:", this.state.boardCells);
       // console.log("onBrickDropped legal brick :", res);

        let boardNumBricks = this.state.boardNumBricks + 1;
        let boardCells = this.state.boardCells;
        let bricksArrayLenght = this.state.bricksArr.length;
        let gameOver = false;
        let winner = "";

        this.setHistoryState();
        console.log ("localStorage", localStorage);
        boardCells[droppedIndex].brick = res;
       // console.log("onBrickDropped brick[droppedIndex] :", boardCells[droppedIndex].brick);

        this.removeBrickFromPlayerDeck();
        console.log("num bricks :" , boardNumBricks);

        if(this.state.playerBricks.length === 0){
            gameOver = true;
            winner = "player1"
        }
        else if(bricksArrayLenght == 0) {
            setAvailableBoardNums();
            if(!isTurnPossible)
                gameOver = true;
        }



        this.setState({boardCells: boardCells, boardNumBricks: boardNumBricks, gameOver: gameOver, winner: winner});

       // console.log(" game onBrickDropped player bricks after:", this.state.playerBricks);
        console.log(" game onBrickDropped board bricks after:", this.state.boardCells);
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
        console.log("setDragBrick this", this);
        this.setState({onDragBrick: {num1: num1, num2: num2}});
    }

    handleDrop(index) {
        let res = null;
        if (this.state.boardNumBricks > 0) {
            res = this.isLegalDrop(index);
            console.log("handle drop res :", res);
            if (res) {
                this.onBrickDropped(index, res.brick);
            }
        } else {
            res = this.createDroppedBrick(0, null, null, this.state.onDragBrick.num1, this.state.onDragBrick.num2, null);
            this.onBrickDropped(55, res);

        }

    }

    isLegalDrop(index) {

        let res = null;
        res = this.scanDown(index);
        if (res !== null)
            return res;
        else {

            // css red sign on the cell that isnt legal
        }

        res = this.scanUp(index);

        if (res !== null)
            return res;
        else {

        }

        res = this.scanLeft(index);

        if (res !== null)
            return res;
        else {


        }


        res = this.scanRight(index);
        if (res !== null)
            return res;
        else {

        }

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
                if(!isVertical && (scanDir === "up" || scanDir === "down"))
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
                    direction:direction ,
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
        if (index - 10 >= 0 && this.state.boardCells[index - 10].brick && this.state.boardCells[index - 10].brick.down !== null) {
            if (this.state.boardCells[index - 10].brick.down === this.state.onDragBrick.num1) {
                this.state.boardCells[index - 10].brick.down = null;
                res = {
                    brick: this.createDroppedBrick(index - 10, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "up"),
                    neighborIndex: index - 10,
                    scanDir: "up"
                };
            }


            if (this.state.boardCells[index - 10].brick.down === this.state.onDragBrick.num2) {
                this.state.boardCells[index - 10].brick.down = null;
                res = {
                    brick: this.createDroppedBrick(index - 10, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "up"),
                    neighborIndex: index - 10,
                    scanDir: "up"
                };
            }
        }

        console.log("scan up final res:", res);

        return res;
    }

    scanDown(index) {

        let res = null;
        if (index + 10 < 100 && this.state.boardCells[index + 10].brick!==null && this.state.boardCells[index + 10].brick.up !== null) {
            if (this.state.boardCells[index + 10].brick.up === this.state.onDragBrick.num1) {
                this.state.boardCells[index + 10].brick.up = null;
                res = {
                    brick: this.createDroppedBrick(index + 10, this.state.onDragBrick.num1, this.state.onDragBrick.num2, this.state.onDragBrick.num2, this.state.onDragBrick.num1, "down"),
                    neighborIndex: index + 10,
                    scanDir: "down"
                };
            }

            if (this.state.boardCells[index + 10].brick.up === this.state.onDragBrick.num2) {
                this.state.boardCells[index + 10].brick.up = null;
                res = {
                    brick: this.createDroppedBrick(index + 10, this.state.onDragBrick.num2, this.state.onDragBrick.num1, this.state.onDragBrick.num1, this.state.onDragBrick.num2, "down"),
                    neighborIndex: index + 10,
                    scanDir: "down"
                };
            }

        }

        console.log("scan down final res:", res);
        return res;
    }

    scanRight(index) {
        let res = null;
        if ((index + 1) % 10 < 10 && this.state.boardCells[index + 1].brick !== null && this.state.boardCells[index + 1].brick.left !== null) {
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
        if ((index - 1) % 10 >= 0 && this.state.boardCells[index - 1].brick !== null && this.state.boardCells[index - 1].brick.right !==null) {
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
        
        let playerBricks = this.state.playerBricks;
        let bricksArr = this.state.bricksArr;
        let gameOver = false;
        
        this.setHistoryState();

        if (this.state.bricksArr.length > 0)
            playerBricks.push(bricksArr.pop());

        else if (bricksArr.length == 0) {
            setAvailableBoardNums();
            if(!isTurnPossible)
                gameOver = true;
        }

        this.setState({playerBricks: playerBricks, bricksArr: bricksArr, gameOver: gameOver});

    }

    setAvailableBoardNums(){
        let availableNums = [];
        this.state.boardCells.map( cell => {
            if(cell.brick && cell.brick.up && !this.state.availableNumsOnBoard.includes(cell.brick.up))
                availableNums.push(cell.brick.up);

            if(cell.brick && cell.brick.down && !this.state.availableNumsOnBoard.includes(cell.brick.down))
                availableNums.push(cell.brick.dwon);

            if(cell.brick && cell.brick.right && !this.state.availableNumsOnBoard.includes(cell.brick.right))
                availableNums.push(cell.brick.right);

            if(cell.brick && cell.brick.left && !this.state.availableNumsOnBoard.includes(cell.brick.left))
                availableNums.push(cell.brick.left);
        });

        this.setState({availableNumsOnBoard: availableNumsOnBoard });
    }

    isTurnPossible() {
        this.state.playerBricks.map( brick => {
            if(this.state.availableNumsOnBoard.includes(brick.num1) || this.state.availableNumsOnBoard.includes(brick.num2))
                return true;
        });

        return false;
    }

    setHistoryState(){
        let historyState = this.state.historyState;
        let historyIndex;

        historyState.push(JSON.stringify(this.state));
        historyIndex = historyState.length - 1;

        this.setState({
                historyState: historyState, 
                historyIndex: historyIndex });
    }

    setPrevHistory() {
        let historyIndex = this.state.historyIndex;
        if(historyIndex > 0)
            historyIndex--;

        let prevState = JSON.parse(this.state.historyState[historyIndex]);

        this.setState({
            score1: prevState.score1,
            score2: prevState.score2,
            bricksArr: prevState.bricksArr,
            playerBricks: prevState.playerBricks,
            availableNumsOnBoard: prevState.availableNumsOnBoard,
            historyIndex: historyIndex,
            boardCells: prevState.boardCells,
            boardNumBricks: prevState.boardNumBricks,
        });
        

    }

    setNextHistory() {
        let historyIndex = this.state.historyIndex;
        if(historyIndex < this.state.historyState.length - 1)
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
        });
    }

    startNewGame() {

        this.setState ({
            score1: 0,
            score2: 0,
            bricksArr: [],
            playerBricks: [],
            availableNumsOnBoard: [],
            historyState: [],
            historyIndex: -1,
            boardCells: this.createBoard(),
            onDragBrick: null,
            boardNumBricks: 0,
            gameOver: false,
            winner: "",
                });
        
        this.createBricksArray();
        this.shuffleBricks();
        this.setPlayerBricks();
    }

    render() {
        let historyLenght = this.state.historyState.length;
        return (
            <div className="game">
                <Board
                    moveBrick={this.moveBrick}
                    game={this}
                    id="board"
                    boardCells={this.state.boardCells}
                    handleDrop={this.handleDrop}
                    numBricks={this.state.boardNumBricks}
                />
                <div className='player-statistics-container'>
                    <Player
                        id="player1"
                        bricks={this.state.playerBricks}
                        setDragBrick={this.setDragBrick}
                        game = {this}
                    />

                    <Statistics
                        game = {this}
                        countTurns={this.state.boardNumBricks}
                        gameOver = {this.state.gameOver}
                        bricksArrayLength = {this.state.bricksArr.length}
                        winner = {this.state.winner}
                        nextButton = {this.state.historyIndex === historyLenght - 1}
                        prevButton = {this.state.historyIndex === 0}

                        setNextHistory = { this.setNextHistory }
                        setPrevHistory = { this.setPrevHistory }
                        grabBrick={this.grabBrick}
                        startNewGame = {this.startNewGame}
                    />
                </div>
            </div>
        );
    }
}

export default Game;