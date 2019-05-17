import React from 'react';
import './board.css'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks
        };

    }
	onDragOver(e){
        e.preventDefault();
    }

    render() {

        return (

	        <div 
	        	className = {"board", "container-drag"}
                onDragOver={(e)=>this.onDragOver(e)}                    
                onDrop={(e)=>this.onDrop(e, "board")}
	        	>

	        </div>

        );
    }

}

export default Board;