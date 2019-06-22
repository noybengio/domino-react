import React from 'react';
import './lobby.css';
import PlayersList from './playersList/playersList.jsx';
import GamesList from './gamesList/gamesList.jsx';

let games = [
    {
        name:"Noys Game",
        admin:"Noy",
        numReq:3,
        numSigned:0,
        status: "waiting"
    }
    ,
    {
        name:"Oz Game",
        admin:"Oz",
        numReq:2,
        numSigned:0,
        status: "waiting"
    }


];

let players = [
    {
        name:"Noy",
        status: "lobby"
    }
    ,
    {
        name:"Oz",
        status: "lobby"
    }


];


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className= {"lobby-container"}>
                <PlayersList
                    players = {players}
                />
                    <GamesList
                        games = {games}
                        enterGame = {this.props.enterGame}
                        game = {this.props.game}
                    />
            </div>
        );
    }
}

export default Lobby;
