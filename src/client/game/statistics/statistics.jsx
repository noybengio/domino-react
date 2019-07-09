import React from "react";
import './statistic.css';
import Button from '../../basicComponents/button/button.jsx';
import Info from '../../basicComponents/info/info.jsx';
    import Zoom from './zoom/zoom.jsx';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
         return(  
           <div className="statistics-container">
               <div className = "general-container">
                    <div className = "info-container">                  
                        <Info
                            text="Time:"
                            data={this.props.time}
                        />

                        <Info
                            text="Turn Counter: "
                            data={this.props.turnCounter}
                        />
                    </div>

                    <hr/>

                    <div className = "buttons-container">
                        <Button
                            text="Grab Brick"
                            buttonFunc = {this.props.grabBrick}
                            game = {this.props.game}
                            disabled = { this.props.bricksArrayLength === 0 || this.props.gameOver }
                        />
                        
                        <Zoom
                            game = { this.props.game }
                            zoomIn = { this.props.zoomIn }
                            zoomOut = { this.props.zoomOut }
                            zoom = {this.props.zoom}
                        />
                    </div>
                    
                </div>    

                {
                    this.props.gameOver === true &&
                            <div
                            className = {"general-container"}>
                                <div className = "info-container">
                                    <Info
                                        text="Game Over "
                                        data = {this.props.winner === "player1" ? "You Win!" : "Loser..."}
                                    />
                                </div>
                                <hr/>
                                <div className = "buttons-container">
                                    <Button
                                        text="New Game"
                                        buttonFunc={this.props.startNewGame}
                                        game={this.props.game}
                                    />
                                    <div className = {"next-prev-container"}>
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
                                </div>
                            </div>
                }

            </div>

        );


    }
}

    export default Statistics;