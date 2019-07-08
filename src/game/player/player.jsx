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
            <div 
                className={this.props.className ? this.props.className : "player-container"}
                onDragOver=  { this.props.belongTo === "player" ? (ev) => this.onDragOver(ev) : null}
            >
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
                                    belongTo = { this.props.belongTo }
                                    game = { this.props.game }
                                />);
                        })
                    :
                        this.props.bricks.map((brick, i) => {
                            return (
                                <Brick
                                direction = {this.props.className !== "enemie-container-top" ? "horizontal" : "vertical"}
                                key={`${this.props.name}-brick-${i}`}
                                className = {"enemie-brick"}
                                belongTo = { this.props.belongTo } />
                            );
                       })
                }
            </div>
        );
    }
}

export default Player;
