import React from 'react';
import './board.css'


import EmptyCell from '../emptyCell/emptyCell.jsx'
import Brick from '../brick/brick.jsx'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boardCells: this.props.boardCells,
            numBricks :this.props.numBricks,
        };

        this.onDrop = this.onDrop.bind(this);
        this.handleDrop = this.props.handleDrop.bind(this.props.game)
    }

    onDragOver(ev) {
        ev.preventDefault();
    };


    onDrop(ev) {
        let legalBrick;
        let index = parseInt(ev.target.getAttribute('cellindex'), 10);
        this.handleDrop(index);
    };


    render() {
        console.log("board render : ", this.state.boardCells);
        return (
            <div onDrop={this.onDrop} className={"container-board"}>
                <div className="board"
                     onDragOver={(ev) => this.onDragOver(ev)}
                     onDrop={(ev) => this.onDrop(ev)}
                     >
                    {
                        this.state.boardCells.map((cell, i) => {
                            (cell.brick ? console.log("board render map cell : ", cell): console.log());
                            return cell.brick ?
                                <Brick
                                    key={i}
                                    num1={cell.brick.num1}
                                    num2={cell.brick.num2}
                                    direction = {cell.brick.direction}
                                    belongTo = { "board"}
                                />
                                :
                                <EmptyCell key={i} cellIndex={i}
                                />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Board;



