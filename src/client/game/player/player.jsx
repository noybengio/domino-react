import React from 'react';
import Brick from '../brick/brick.jsx';
import './player.css';

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onDragOver(ev) {
        ev.preventDefault();

    };

    render() {



        return (
            <>
                {
                    this.props.status === "playing" ?

                    <>
                        <div
                            className={this.props.className ? this.props.className : "player-container"}
                            onDragOver={(ev) => this.onDragOver(ev)}
                            isturn={this.props.isTurn} >
                            {
                                this.props.belongTo === "player" ?

                                    this.props.bricks.map((brick, i) => {
                                        return (
                                            !brick.used && <Brick
                                                direction={"vertical"}
                                                key={`${this.props.name}-brick-${i}`}
                                                num1={brick.num1}
                                                num2={brick.num2}
                                                setDragBrick={this.props.setDragBrick}
                                                belongTo={this.props.belongTo}
                                                game={this.props.game}
                                            />);
                                    })
                                    :
                                    this.props.bricks.map((brick, i) => {
                                        return (
                                            <Brick
                                                direction={this.props.className !== "enemy-container-top" ? "horizontal" : "vertical"}
                                                key={`${this.props.name}-brick-${i}`}
                                                setDragBrick={this.props.setDragBrick}
                                                belongTo={this.props.belongTo}
                                                game={this.props.game}
                                            />);
                                    })
                            }
                        </div>
                        { this.props.isTurn === false && <div className="disable-player" />}
                    </>
                    :
                        <div className={this.props.className ? this.props.className : "player-container"}/>

                }
            </>

        );
    }
}

export default Player;