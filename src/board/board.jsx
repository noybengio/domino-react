import React from 'react';
import './board.css'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks
        };

    }
	onDragOver(ev){
        ev.preventDefault();
    };

    onDrop (ev,dest){
        let num1 = ev.dataTransfer.getData("num1");
        let num2 = ev.dataTransfer.getData("num2");
        this.props.moveBrick.bind(this.props.game)(num1 , num2);
        console.log("on drop moveBrick : " , this.props.moveBrick);

    };

    render() {
        console.log("board bricks :" , this.state.bricks);
        return (

	        <div 
	        	className = {"board container-drag"}
                onDragOver={(ev)=>this.onDragOver(ev)}
                onDrop={(ev) => this.onDrop(ev,"board")}
	        	>

	        </div>

        );

    }

}

export default Board;