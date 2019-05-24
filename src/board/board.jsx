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
    }

    onDragOver(ev) {
        console.log(" board on drag over");
        ev.preventDefault();
    };


    onDrop(ev) {
        let legalBrick;
        console.log("event on drop :" , ev);
        ev.preventDefault();
        let index = parseInt(ev.target.getAttribute('cellindex'), 10);
        this.props.handleDrop.bind(this.props.game)(index);
        //let num1 = ev.dataTransfer.getData("num1");
        // let num2 = ev.dataTransfer.getData("num2");
        //this.props.moveBrick.bind(this.props.game)(num1, num2);

    };


    render() {
        console.log("board render : ", this.state.boardCells);
        return (
            <div onDrop={this.onDrop} className={"board container-drag"}>
                <div className="board"
                     onDragOver={(ev) => this.onDragOver(ev)}
                     onDrop={(ev) => this.onDrop(ev, "board container-drag")}>
                    {
                        this.state.boardCells.map((cell, i) => {
                            return cell.brick ?
                                <Brick
                                    key={i} num1={cell.brick.num1}
                                    num2={cell.brick.num2}
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



