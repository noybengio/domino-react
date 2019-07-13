import React from 'react';
import './lobby.css';
import PlayersList from './playersList/playersList.jsx';
import GamesList from './gamesList/gamesList.jsx';
import Menu from './menu/menu.jsx';
import AddRoom from './addRoom/addRoom.jsx';
import Info from "../../basicComponents/info/info.jsx.js";

let gamesDB = [
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

let playersDB = [
    {
            name: "Noy's Game",
            admin: "Noy",
            numReq:2,
            numSigned: 0,
            status: "waiting"
    },
    {
        name: "Oz's Game",
        admin: "Oz",
        numReq:3,
        numSigned: 0,
        status: "waiting"
    }
];


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "Lobby",
            rooms: [],
            players: [],
            myRoom: null,
            error : null,
            dataTimeOut: null
        };

    }

    addRoomPopUp() {
        console.log("add room pop up");

        this.setState({
            screen: "addRoom",
        });
    }

    addRoom() {
        let myRoom = null;
        let stringifiedRoom = null;
        let gameName = document.getElementById("roomName").value;
        let playersNum = document.getElementById("playerNum").value;
        console.log("addRoom:\n", "\troom name: ", gameName, "\n\tplayers num: ", playersNum);
        
        myRoom = {
            name: gameName,
            admin: this.props.name,
            numReq:playersNum,
            numSigned: 0,
            status: "waiting"
        };

        stringifiedRoom = JSON.stringify(myRoom); //sringify the new room object
        console.log("in lobby add room func room:",stringifiedRoom );
        fetch('/lobby/addRoom', {
            body:stringifiedRoom,
            method:"POST"} )
            .then(res => {
                if(res.status !== 200) {
                    res.text().then(error => {
                        console.log("add room error from server");
                        this.setState({
                            error: error,
                        });
                    })
                }
            else
                {
                    this.setState({
                        screen: "Lobby",
                        myRoom: myRoom
                    });
                }
            })
    }

    goLobby() {
        this.setState({
            screen: "Lobby",
        });

    }

    deleteRoom(){
        let games = this.state.games;

        games.splice(0, 1) ;
        this.setState({
            games: games,
            myRoom: null,
        });
    }

     getDataForLobby()
    {

        console.log("in get data to lobby");

        fetch('/lobby', {
            method:"GET"} )
            .then(res => {
                if(res.status === 200)
                {
                    return res.json();
                }
            })
            .then(lobbyBody => {
                console.log(lobbyBody);
                this.setState({
                    rooms: lobbyBody.rooms,
                    players: lobbyBody.players,
                    dataTimeOut: setTimeout(this.getDataForLobby.bind(this), 1000)
                })
            })

    }


    componentDidMount() {
        console.log("in componentDidMount");

        this.getDataForLobby();
    }



    render() {
        let screen = this.state.screen;
        return (
            <div className= {"lobby-container"}>

                {screen === "addRoom" && 
                    <AddRoom
                        game = {this}
                        addRoom = {this.addRoom}
                        goLobby = {this.goLobby}
                        error = {this.state.error}
                    />
                }
                <PlayersList
                    players = {this.state.players}
                />

                <div className={"menu-gamesList-container"}>
                    <Menu
                       name = {this.props.name}
                       game = {this.props.game}
                       lobby = {this}
                       addRoomPopUp = {this.addRoomPopUp}
                       logOut = {this.props.logOut}
                       myRoom = {this.state.myRoom}

                    />
                    <GamesList
                        games = {this.state.rooms}
                        enterGame = {this.props.enterGame}
                        game = {this.props.game}
                        lobby = {this}
                        name = {this.props.name}
                        deleteRoom = {this.deleteRoom}
                    />
                </div >
                    
            </div>
        );
    }
}

export default Lobby;
