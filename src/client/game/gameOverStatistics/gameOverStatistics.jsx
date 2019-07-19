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
                <div className='game-over-statistics-container'>
                    <div className='game-over-statistics-header'>
                        <Button
                            className={"close_btn"}
                            text="✖"
                            buttonFunc={this.props.closeGameOverStatistics}
                            game={this.props.game}

                        />
                        <h1> Game Over You Are A {`${this.props.winner === this.props.name ? "Winner" : "Loser"}!`}</h1>
                    </div>
                    <table className={"game-over-statistics-table"}>
                        <tbody>
                        <tr>
                            <td>Place</td>
                            <td>Name</td>
                            <td>Score</td>
                            <td>Grab Bricks Count</td>
                            <td>avgTurn</td>
                        </tr>
                        {
                            this.props.statistics.map((playerStatistic, i) => {
                                return (
                                    <tr>
                                        <td> {`${i + 1}`}</td>
                                        <td>{`${playerStatistic.name}`}</td>
                                        <td>{`${playerStatistic.statistics.score}`}</td>
                                        <td>{`${playerStatistic.statistics.grabCount}`}</td>
                                        <td>{`${playerStatistic.statistics.avgTurn} sec`}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default GameOverStatistics;