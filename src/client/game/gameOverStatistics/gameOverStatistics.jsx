import React from 'react';
import './gameOverStatistics.css';
import Button from '../../../basicComponents/button/button.jsx';



class GameOverStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <div className={"game-over-statistics-background"}>
                 <Button
                    className={"close_btn"}
                    text="✖"
                    buttonFunc = {this.props.closeGameOverStatisics}
                    game = {this.props.game}

                />
                 <h1> Game Over You Are A {`${this.props.winner === this.props.name ? "Winner" : "Loser"}!`}</h1>
                 
                <table className={"game-over-statistics-container"}>
                    <tbody>
                    <tr>
                            <td>"Place"</td> 
                            <td>"Name"</td>     
                            <td>"Grab Bricks Count"</td>
                            <td>"avgTurn"</td>         
                        </tr>
                    {
                        this.props.statistics.map( (playerStatistic, i) => {
                            return(
                                <tr>
                                    <td> {`${i + 1}`}</td> 
                                    <td>{`${playerStatistic.name}`}</td>     
                                    <td>{`${playerStatistic.grabCount}`}</td>
                                    <td>{`${playerStatistic.avgTurn} sec`}</td>         
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameOverStatistics;