import React from 'react';
import Brick from '../brick/brick.jsx';
import './player.css';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks

        };

    }
    
    onDragOver(ev) {
        ev.preventDefault();
    }


    render() {
        console.log(" player bricks: ", this.state.bricks);
        return (

            <div 
                className={"player"}
                onDragOver={(e)=>this.onDragOver(e)}                    
                onDrop={(e)=>this.onDrop(e, "player")}
            >
                {
                    this.state.bricks.map((brick, i) => {
                        return (
                            <Brick
                                num1={this.state.bricks[i].num1}
                                num2={this.state.bricks[i].num2}
                            /> );
                    })
                }
            </div>
        );
    }
}

export default Player;
