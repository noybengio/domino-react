import React from 'react';
import ReactDOM from 'react-dom';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks
        };

    }


    render() {

        return (
        <div className = "board">
            <Player
                id = "Board"
                bricks = {this.state.playerBricks}/>


        </div>

        );
    }

}

export default Board;