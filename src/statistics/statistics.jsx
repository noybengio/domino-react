import React from "react";
import './statistic.css';
import Button from './button/button.jsx';
import Info from './info/info.jsx';



class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
         return(  
           <div className="statistics">

                <Info
                    text="Turn Counter: "
                    data={this.props.turnCounter}
                />

                <Button
                    text="Grab Brick"
                    buttonFunc = {this.props.grabBrick}
                    game = {this.props.game}
                    disabled = { this.props.bricksArrayLength === 0 || this.props.gameOver }
                />


                {
                    (this.props.gameOver === true ?
                            <div>
                                <hr/>
                                <Info
                                    text="Game Over "
                                    data = {this.props.winner === "player1" ? "You Win!" : "Loser..."}
                                />

                                <Button
                                    text="New Game"
                                    buttonFunc={this.props.startNewGame}
                                    game={this.props.game}
                                />

                                <Button
                                    text="Prev Turn"
                                    buttonFunc={this.props.setPrevHistory}
                                    game={this.props.game}
                                    disabled = { this.props.prevButton }
                                />

                                <Button
                                    text="Next Turn"
                                    buttonFunc={this.props.setNextHistory}
                                    game={this.props.game}
                                    disabled = { this.props.nextButton }
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
