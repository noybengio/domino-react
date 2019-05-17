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

    render() {

        return (

	        <div 
	        	className = {"board container-drag"}
                onDragOver={(ev)=>this.onDragOver(ev)}
	        	>

	        </div>

        );
    }

}

export default Board;