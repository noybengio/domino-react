import React from "react";
import './statistic.css';
import Button from '../../../basicComponents/button/button.jsx';
import Info from '../../../basicComponents/info/info.jsx';
    import Zoom from './zoom/zoom.jsx';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let enemyTurn = this.props.turn !== this.props.name;
         return(  
           <div className="statistics-container">
               <div className = "general-container">
                    <div className = "info-container">  

                    <Info
                            text = "Player Turn: "
                            data = {this.props.turn}
                        />

                        <Info
                            text = "Score: "
                            data = {this.props.playerStatistics.score}
                        />

                        <Info
                            text="Grab Counter: "
                            data={this.props.playerStatistics.grabCount}
                        /> 

                         <Info
                            text = {`Avg Turn: ${this.props.playerStatistics.avgTurn} sec`}
                            data = {null}
                        />

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
                            disabled = { this.props.bricksArrayLength === 0 || this.props.gameOver || enemyTurn }
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
                                        text="Game Over"
                                        data = {this.props.winner === this.props.name ? "You Win!" : "Loser..."}
                                    />
                                </div>
                                <hr/>
                                <div className = "buttons-container">
                                    <Button
                                        text="Exit"
                                        buttonFunc={this.props.exitLobby}
                                        game={this.props.game}
                                    />
                                    <div className = {"next-prev-container"}>
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