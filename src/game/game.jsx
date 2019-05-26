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
            boardCells: this.createBoard(),
            onDragBrick: this,
            boardNumBricks: 0,
            gameOver: false,


        };
        this.createBricksArray();

        /*
                //const boardCells = this.state.boardCells;
                this.props.boardCells[10] = {
                    index:  this.props.boardCells[10].index,
                    brick: {num1: 2, num2: 5}
                };
                this.setState({
                    boardCells:this.props.boardCells
                });

        */
        this.shuffleBricks();
        this.setPlayerBricks();
        this.createBoard();
        this.onDrag = this.onDrag.bind(this);
        this.onBrickDropped = this.onBrickDropped.bind(this);
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

        for (let i = 0; i < 7; i++)
            for (let j = i; j < 7; j++) {
                this.state.bricksArr.push({num1: i, num2: j, used: false});
            }
    }

    shuffleBricks() {
        let j, x, i;
        for (i = this.state.bricksArr.length - 1; i >= 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.state.bricksArr[i];
            this.state.bricksArr[i] = this.state.bricksArr[j];
            this.state.bricksArr[j] = x;
        }

        return this.state.bricksArr;
    }

    hitBrick() {
        this.state.playerBricks.push(this.state.bricksArr.pop());
    }

    setPlayerBricks() {
        for (let i = 0; i < 6; i++) {
            this.hitBrick();
        }
    }

    onBrickStartDragging(draggedBrick) {
        console.log(" game onBrickStartDragging");
        this.setState((_) => {
            return {draggedBrick};
        });
    }

    onBrickDropped(droppedIndex, res) {
        //console.log(" game onBrickDropped player bricks before:", this.state.playerBricks);
      //  console.log(" game onBrickDropped board bricks before:", this.state.boardCells);
       // console.log("onBrickDropped legal brick :", res);
        let boardNumBricks = this.state.boardNumBricks + 1;
        let boardCells = this.state.boardCells;
        boardCells[droppedIndex].brick = res;
       // console.log("onBrickDropped brick[droppedIndex] :", boardCells[droppedIndex].brick);

        this.removeBrickFromPlayerDeck();
        console.log("num bricks :" , boardNumBricks);
        this.setState({boardCells: boardCells, boardNumBricks: boardNumBricks});

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

    onDrag(num1, num2, direction) {
        this.setState({onDragBrick: {num1: num1, num2: num2, direction: direction}});
    }

    //handle the first drop
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
        if (index - 10 >= 0 && this.state.boardCells[index - 10].brick && this.state.boardCells[index - 10].brick.down) {
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
        if (this.state.bricksArr.length > 0)
            playerBricks.push(bricksArr.pop());

        this.setState({playerBricks: playerBricks, bricksArr: bricksArr});

    }


    render() {
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
                        onDrag={this.onDrag}
                    />

                    <Statistics

                        grabBrick={this.grabBrick}
                        countTurns={this.state.boardNumBricks}
                        game = {this}
                        gameOver = {this.state.gameOver}

                    />
                </div>
            </div>
        );
    }
}

export default Game;