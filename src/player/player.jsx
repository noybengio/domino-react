import React from 'react';
import Brick from './brick/brick.jsx';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bricks: this.props.bricks

        };

    }


    render() {
        console.log(" player bricks: ", this.state.bricks);
        return (

            <div>
                {
                    this.state.bricks.map((brick, i) => {
                        return (
                            <Brick
                                key = {`brick ${i}`}
                                id = {`${this.state.bricks[i].num1},${this.state.bricks[i].num2}`}
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
