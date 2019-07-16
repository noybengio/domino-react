import React from 'react';
import './lobby.css';
import PlayersList from './playersList/playersList.jsx';
import GamesList from './gamesList/gamesList.jsx';
import Menu from './menu/menu.jsx';
import AddRoom from './addRoom/addRoom.jsx';
import Info from "../../basicComponents/info/info.jsx";

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

        this.getDataForLobby();

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
            numReq:playersNum,
        };

        stringifiedRoom = JSON.stringify(myRoom); //sringify the new room object
        console.log("in lobby add room func room:",stringifiedRoom );
        fetch(`${this.props.url}/lobby/addRoom`, {
            body:stringifiedRoom,
            method:"POST",
            mode: "no-cors"} )
            .then(res => {
                if(res.status !== 200) {
                    res.text().then(error => {
                        console.log("add room error from server");
                        this.setState({
                            error: error,
                        });
                    })
                }
                else {
                    this.setState({
                        screen: "Lobby",
                        error: null
                    });
                }
            })
    }

    goLobby() {
        this.setState({
            screen: "Lobby",
        });

    }

    deleteRoom(e){
       let roomId = e.target.getAttribute("belongto");
       console.log("e.target.belongto",roomId);

        fetch(`${this.props.url}/deleteRoom`, {
            body:roomId,
            method:"DELETE"} )
            .then(res => {

                if (res.status !== 204) {
                    res.text().then(error => {
                        console.log(" cannot delete :", roomId);
                        this.setState({
                            error: error,
                        })
                    })
                }

            }).catch(error => console.log("in catch error :" , error))

    }

     getDataForLobby()
    {

        fetch(`${this.props.url}/lobby`, {
            method:"GET",
            mode: "no-cors"} )
            .then(res => {
                if(res.status === 200)
                {
                    return res.json();
                }
            })
            .then(lobbyBody => {
                this.setState({
                    rooms: lobbyBody.rooms,
                    players: lobbyBody.players,
                    dataTimeOut: setTimeout(this.getDataForLobby.bind(this), 1000)
                })
            })

    }

    logOut()
    {
        clearTimeout(this.state.dataTimeOut);
        this.props.logOut.bind(this.props.game)();
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
                       logOut = {this.logOut}

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
