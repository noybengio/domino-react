import React from 'react';
import Brick from '../brick/brick.jsx';
import './player.css';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onDragOver(ev) {
        ev.preventDefault();
        //console.log("player onDragOver");

    };

    render() {
        return (
            <div
                className={"player"}
                onDragOver={(ev) => this.onDragOver(ev)}
            >
                {
                    this.props.bricks.map((brick, i) => {
                        return (
                            !brick.used && <Brick
                                direction={"vertical"}
                                key={`brick-${i}`}
                                num1={brick.num1}
                                num2={brick.num2}
                                setDragBrick={this.props.setDragBrick}
                                belongTo = { "player"}
                                game = { this.props.game }
                            />);
                    })
                }
            </div>
        );
    }
}

export default Player;
