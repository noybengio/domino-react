import React from 'react';
import './gameManager.css';
import SignIn from '../signIn/signIn.jsx';
import Lobby from '../lobby/lobby.jsx';
import Game from '../game/game.jsx';


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

let player = {
        name: "",
};

let enemies = [
    {
        name: "Tal",
 
    },
    {
        name: "Shir",
    }

];



class gameManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "signIn",
            name:"",
            status:"", //where is the player - lobby/playing
            game: {
                name: "",
                admin: "",
                players: [],
                numOfPlayers: 0,
            },
            

        };

    }

    signIn() {

        let name = document.getElementById("input").value;
        console.log("game manager sighn in name: " , name);
        this.setState({
            screen: "Lobby",
            status:"Lobby",
            name: name,
        });
    }

    enterGame(e) {
    
        let index = e.currentTarget.getAttribute("index");
        let game = {
            name: gamesDB[index].name,
            admin: gamesDB[index].admin,
            players: [],
            numPlayers: gamesDB[index].numReq,
        }
        this.setState({
            screen: "Game",
            game: game,
        });

    }

    logOut() {
        this.setState({
            screen: "signIn",
        });

    }


   render() {
        let screen = this.state.screen;
        
        return (
            <div className = "gameManager-container">
            {((screen) => {
                console.log(screen);
                switch(screen) {

                    case("signIn"):
                        return <SignIn
                            signIn = {this.signIn}
                            game = {this}
                        />;

                    case("Lobby"):
                        return <Lobby
                                    name = {this.state.name}
                                    enterGame = {this.enterGame}
                                    logOut = {this.logOut}
                                    game = {this}
                            />;

                    case("Game"):
                    let game = this.state.game;
                        return <Game
                                
                                 numPlayers = {game.numPlayers}
                                />;
                }
        })(screen)}
            </div>
        );
   }
}

export default gameManager;
