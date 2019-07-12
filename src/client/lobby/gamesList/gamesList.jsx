import React from 'react';
import './gamesList.css';
import GameRoom from './gameRoom/gameRoom.jsx';


class GamesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className ={"gameslist-container"}>
            
                
                <table className= {"table-gameslist-container"}>
                    {
                        (() => {
                            let games = this.props.games;
                            let componentGames = [];
                            for (let game in games) {

                                componentGames.push(
                                    <GameRoom
                                        key = {`room-${games[`${game}`].name}`}
                                        name = {games[`${game}`].name}                                        playerName ={this.props.name}
                                        admin = {games[`${game}`].admin}
                                        numReq = {games[`${game}`].numReq}
                                        numSigned = {games[`${game}`].numSigned}
                                        status = {games[`${game}`].status}
                                        enterGame = {this.props.enterGame}
                                        game = {this.props.game}
                                        lobby = {this.props.lobby}
                                        deleteRoom = {this.props.deleteRoom}
                                    />)}
                            return componentGames;
                        })()
                    }

                </table>
            </div>
        );
    }
}

export default GamesList;
