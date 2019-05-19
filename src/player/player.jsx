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
        console.log("player onDragOver");

    };

    render() {
        return (
            <div
                className={"player"}
                onDragOver={(ev) => this.onDragOver(ev)}
            >
                {
                    this.state.bricks.map((brick, i) => {
                        return (
                            !brick.used && <Brick
                                direction={"vertical"}
                                key={`brick-${i}`}
                                num1={brick.num1}
                                num2={brick.num2}
                                onDrag={this.props.onDrag}
                                belongTo = { "player"}

                            />);
                    })
                }
            </div>
        );
    }
}

export default Player;
