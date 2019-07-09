import React from 'react';
import './gamesList.css';
import GameRoom from './gameRoom/gameRoom.jsx';
import Button from "../../basicComponents/button/button.jsx";


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
                        this.props.games.map((game, i) => {
                            return (
                                <GameRoom
                                    key = {`room-${game.name}` }
                                    name = {game.name}
                                    index = {i}
                                    playerName ={this.props.name}
                                    admin = {game.admin}
                                    numReq = {game.numReq}
                                    numSigned = {game.numSigned}
                                    status = {game.status}
                                    enterGame = {this.props.enterGame}
                                    game = {this.props.game}
                                    lobby = {this.props.lobby}
                                    deleteRoom = {this.props.deleteRoom}
                                />)
                        })
                    }
                </table>
            </div>
        );
    }
}

export default GamesList;
