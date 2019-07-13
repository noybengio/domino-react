import React from 'react';
import './playersList.css';
import LobbyPlayer from './lobbyPlayer/lobbyPlayer.jsx';

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

    aaa(){
        let players = [];
        for (let player in this.props.players) {

                players.push(
                    <LobbyPlayer
                        // key = {i}
                        name={player.name}
                        //status = {player.status}
                    />)}
        return players;

    }

   render() {
        return (
            <div className= {"playerslist-container"}>
                <p>Players</p>
                <hr/>
                <div className={"players-container"}>
                    {
                        (() => {
                            let players = this.props.players;
                            let componentPlayers = [];
                            for (let player in players) {

                                componentPlayers.push(
                                    <LobbyPlayer
                                        key = {players[`${player}`].name}
                                        name={players[`${player}`].name}
                                        location = {players[`${player}`].location}
                                    />)}
                            return componentPlayers;
                        })()
                    }
                </div>
            </div>
        );
   }
}

export default PlayersList;
