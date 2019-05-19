import React from 'react';
import Player from "../player/player.jsx";
import Board from "../board/board.jsx";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score1: 0,
            score2: 0,
            bricksArr: [],
            playerBricks: [],
            boardCells: this.createBoard(),
            onDragBrick:this


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

    /*
    moveBrick(num1, num2) {
        let i = 0;
        while (i < this.state.playerBricks.length) {

            if (`${this.state.playerBricks[i].num1}` === num1 && `${this.state.playerBricks[i].num2}` === num2) {

                this.state.boardBricks.push(this.state.playerBricks.splice(i, 1));
                i = this.state.playerBricks.length;
            }
            i++;
        }
    }
*/
    onBrickStartDragging(draggedBrick) {
        console.log(" game onBrickStartDragging");
        this.setState((_) => {
            return {draggedBrick};
        });
    }

    onBrickDropped(droppedIndex,onNum, offNum) {
        console.log(" game onBrickDropped");
        let boardCells = this.state.boardCells;
        boardCells[droppedIndex].brick = {
            num1: this.state.onDragBrick.num1,
            num2: this.state.onDragBrick.num2
        };
        this.removeBrickFromPlayerDeck();
        this.setState({boardCells: boardCells})
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
        console.log("game on drag :" , num1,num2);
        this.setState({onDragBrick: {num1: num1, num2: num2 , direction: direction}});
    }

    isLegalDrop(index)
    {
        if(this.state.onDragBrick.direction === "vertical"){

            if(this.state.boardCells[index - 10])
            {
                if()
            }

        }

        else
        {

        }




    }

    render() {
        return (
            <div id="game">
                <Board
                    className="container-drag"
                    moveBrick={this.moveBrick}
                    game={this}
                    id="board"
                    boardCells={this.state.boardCells}
                    onBrickDropped={this.onBrickDropped}
                />
                <Player
                    className="container-drag"
                    id="player1"
                    bricks={this.state.playerBricks}
                    onDrag={this.onDrag}
                />
            </div>
        );
    }
}

export default Game;