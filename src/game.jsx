import React from 'react';
import Player from "./player.jsx";

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
        console.log(9123);
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


    render() {

        return (
        <div>
            <Player
                key = "player_1"
                id = "player1"
                bricks = {this.state.playerBricks}/>


        </div>

        );
    }

}

export default Game;