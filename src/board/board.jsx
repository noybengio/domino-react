import React from 'react';
import './board.css'
import EmptyCell from '../emptyCell/emptyCell.jsx'
import Brick from '../brick/brick.jsx'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks,
            boardCells: this.props.boardCells
        };

        this.onDrop = this.onDrop.bind(this);
    }

    onDragOver(ev) {
        ev.preventDefault();
    };


    onDrop(ev, dest) {
        ev.preventDefault();
        let index = parseInt(ev.target.getAttribute('cellindex'), 10);
        this.props.onBrickDropped(index);
        //let num1 = ev.dataTransfer.getData("num1");
        // let num2 = ev.dataTransfer.getData("num2");
        //this.props.moveBrick.bind(this.props.game)(num1, num2);

    };

    render() {
        return (
            <div onDrop={this.onDrop} className={"board container-drag"}>
                <div className="board"
                     onDragOver={(ev) => this.onDragOver(ev)}
                     onDrop={(ev) => this.onDrop(ev, "board container-drag")}>
                    {
                        this.state.boardCells.map((cell, i) => {
                            return cell.brick ? <Brick key={i} num1={cell.brick.num1} num2={cell.brick.num2}/> :
                                <EmptyCell key={i} cellIndex={i}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Board;



