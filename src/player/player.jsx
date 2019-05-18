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
                            <Brick
                                key={`brick-${i}`}
                                num1={this.state.bricks[i].num1}
                                num2={this.state.bricks[i].num2}
                                onDrag={this.props.onDrag}
                            />);
                    })
                }
            </div>
        );
    }
}

export default Player;
