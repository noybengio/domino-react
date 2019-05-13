import React from 'react';
import Player from "./player";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score1: 0,
            score2: 0,
            bricksArr: []
        };
        this.createBricksArray();
        this.shuffleBricks();
    }

    createBricksArray() {
        let bricksArr = this.state.bricksArr;

        for (let i = 0; i < 28; i++)
            for (let j = i + 1; j < 28; j++) {
                bricksArr.push({i: i, j: j});
            }

        this.setState({bricksArr: bricksArr})
    }

     shuffleBricks() {
        let j, x, i;
        for (i = this.props.bricksArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.props.bricksArr[i];
            this.props.bricksArr[i] = this.props.bricksArr[j];
            this.props.bricksArr[j] = x;
        }
        return this.props.bricksArr;
    }



    render() {
        return (
            <Player bricksArr = this.props.bricksArr/>




        )


    }

}

export default Game;