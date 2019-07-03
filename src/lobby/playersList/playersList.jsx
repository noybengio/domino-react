import React from 'react';
import './playersList.css';
import LobbyPlayer from './lobbyPlayer/lobbyPlayer.jsx';

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

   render() {
        return (
            <div className= {"playerslist-container"}>
                <p>Players</p>
                <hr/>
                <div className={"players-container"}>
                    {
                        this.props.players.map((player, i) => {
                            return (
                                <LobbyPlayer
                                    key = {i}
                                    name = {player.name}
                                    status = {player.status}
                                />)
                        })
                    }
                </div>
            </div>
        );
   }
}

export default PlayersList;
