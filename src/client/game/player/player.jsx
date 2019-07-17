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

    };

    render() {

        return (
            <>
                <div
                    className={this.props.className ? this.props.className : "player-container"}
                    onDragOver={(ev) => this.onDragOver(ev)}
                    isturn = {this.props.isTurn}
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
                    {(this.props.isTurn === false && this.props.belongTo === "player") &&
                        <div className = "disable-player"/>
                    }

            </>

        );
    }
}

export default Player;
