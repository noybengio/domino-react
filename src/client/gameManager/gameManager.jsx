import React from 'react';
import './gameManager.css';
import SignIn from '../signIn/signIn.jsx';
import Lobby from '../lobby/lobby.jsx';
import Game from '../game/game.jsx';

/* get data from array of objects
        let gamesDB = {
            a:{
                name: "Noys Game",
                admin:"Noy",
                numReq:3,
                numSigned:0,
                status: "waiting"
            }
            ,
            b:{
                name:"Oz Game",
                admin:"Oz",
                numReq:2,
                numSigned:0,
                status: "waiting"
            }
   };
        console.log("gameDB ", gamesDB['a'].name);




        for (let i in gamesDB){
            console.log("for i: ", gamesDB[`${i}`]);
        }

 */
/*
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
        numOfBricks: 6,
        bricks: new Array(6).fill(0)
    },
    {
        name: "Shir",
        numOfBricks: 6,
        bricks: new Array(6).fill(0)
    }

];
*/

class gameManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: "signIn",
            name:"",
            status:"", //where is the player - lobby/playing
            error: null,
            game: {
                name: "",
                admin: "",
                player: null,
                enemies: [],
                numOfPlayers: 0,
            },

        };

    }

    signIn() {

        let name = document.getElementById("input").value;
        console.log("game manager sign in name: " , name);
        
        fetch('http://10.0.0.3:3000//signIn', {
            body:name,
            method:"POST"} )
            .then(res =>{

                if(res.status !== 200)
                {
                    res.text().then(error => {
                        console.log("log in error from server");
                        this.setState({
                            error: error,
                        })
                    })
                }
                else {
                    this.setState({
                        screen: "Lobby",
                        status:"Lobby",
                        name: name,
                        error: null
                    });
                }
            }).catch(error => console.log("in catch error :" , error))
            //.then(finalRes => console.log(finalRes));

    }

    enterGame(e) {
    
        let index = e.currentTarget.getAttribute("index");
        console.log("enter game index: ", index);
        /* implement in Game component - need to pass index of room to game*/

        let game = {
            name: gamesDB[index].name,
            admin: gamesDB[index].admin,
            player: player,
            enemies: enemies,
            numPlayers: gamesDB[index].numReq,
        };

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
                            error = {this.state.error}
                            signIn = {this.signIn}
                            game = {this}
ד                        />;

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
                                    name = {game.name}
                                    andmin = {game.admin}
                                    numPlayers = {game.numPlayers}
                                    player = {game.player}
                                    enemies = {game.enemies}
                                />;
                }
        })(screen)}
            </div>
        );
   }
}

export default gameManager;
