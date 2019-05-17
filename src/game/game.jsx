import React from 'react';
import Player from "../player/player.jsx";
import Board from "../board/board.jsx";
import Brick from "../brick/brick.jsx";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score1: 0,
            score2: 0,
            bricksArr: [],
            playerBricks: [],
            boardBricks: [],

        };
        this.createBricksArray();
        this.shuffleBricks();
        this.setPlayerBricks();

    }

    createBricksArray() {
        //let bricksArr = this.state.bricksArr;

        for (let i = 0; i < 7; i++)
            for (let j = i ; j < 7; j++) {
                this.state.bricksArr.push({num1: i, num2: j});
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

    hitBrick ()
    {
        this.state.playerBricks.push( this.state.bricksArr.pop());

    }

    setPlayerBricks() {

        for(let i = 0; i <6; i++)
        {
            this.hitBrick();
        }
        console.log ("game player bricks: " , this.state.playerBricks);
    }

    moveBrick(num1, num2) {
        console.log("move brick this : ", this);

        let i = 0;
        while (i < this.state.playerBricks.length) {

            console.log("player brick num - ", this.state.playerBricks[i].num1 ,this.state.playerBricks[i].num2 );
            console.log("move brick brick num - ",num1 ,num2 );
            if (`${this.state.playerBricks[i].num1}` === num1 && `${this.state.playerBricks[i].num2}` === num2) {

                this.state.boardBricks.push(this.state.playerBricks.splice(i, 1));
                i = this.state.playerBricks.length;
            }
            i++;
        }
        console.log("player bricks after move brick :", this.state.playerBricks);
        console.log("board bricks after move brick :", this.state.boardBricks);
    }

    render() {

        return (
        <div id = "game">
            <Board 
                className = "container-drag"
                moveBrick = {this.moveBrick}
                game = {this}
                id = "board"
                bricks = {this.state.boardBricks}
            />
            <Player
                className = "container-drag"
                id = "player1"
                bricks = {this.state.playerBricks}
                />


        </div>

        );
    }

}

export default Game;