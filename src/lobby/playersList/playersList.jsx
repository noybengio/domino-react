import React from './node_modules/react';
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
        );
   }
}

export default PlayersList;
