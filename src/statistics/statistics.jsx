import React from "react";
import './statistic.css';
import Button from './button/button.jsx';
import Info from './info/info.jsx';



class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameOver: this.props.gameState,
            countTurns: this.props.countTurns,
            winner: this.props.winner

        };
    }

    render() {

        console.log(" statistics turns counter : ", this.props.countTurns);
        return (
            <div>

                <Info
                    text="Turn Counter: "
                    data={this.props.countTurns}
                />

                <Button
                    text="Grab Brick"
                    buttonFunc={this.props.grabBrick}
                    game={this.props.game}
                />

                {
                    (this.state.gameOver === false ?
                            <div>
                                <hr/>
                                <Button
                                    text="New Game"
                                    buttonFunc={this.props.startNewGame}
                                    game={this.props.game}
                                />

                                <Button
                                    text="Prev Turn"
                                    buttonFunc={this.props.prevTurn}
                                    game={this.props.game}
                                />

                                <Button
                                    text="Next Turn"
                                    buttonFunc={this.props.nextTurn}
                                    game={this.props.game}
                                />

                                <Info
                                    text={this.state.winner === "player1" ? "You Win!" : "Loser..."}

                                />

                            </div>
                            :
                            <div>
                            </div>
                    )
                }

            </div>

        );


    }
}






    export default Statistics;
