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
            <div className= {"gameslist-container"}>
                {
                    this.props.games.map((game, i) => {
                        return (
                            <GameRoom
                                key = {i}
                                name = {game.name}
                                admin = {game.admin}
                                numReq = {game.numReq}
                                numSigned = {game.numSigned}
                                status = {game.status}
                                enterGame = {this.props.enterGame}
                                game = {this.props.game}
                            />)
                    })
                }
            </div>
        );
    }
}

export default GamesList;
