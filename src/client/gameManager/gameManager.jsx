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
        numOfBricks: 6,
        bricks: new Array(6).fill(0)
    },
    {
        name: "Shir",
        numOfBricks: 6,
        bricks: new Array(6).fill(0)
    }

];



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

        const param = {
            headers:{
                "content-type":"application/json; charset=UTF-8"
            },

            body:{name:name},
            method:"POST"
        };

        fetch('http://localhost:3000/signIn', {body:name,
            method:"POST"} )
            .then(res =>{
                res.text().then(text => console.log(text))
                //console.log("fetch before json res:" , res.text().then(text => console.log(text)));
                console.log("fetch before json res body:" , res.body);
                console.log("JSON.parse res :" , JSON.parse(res));

                if(res.status !== 200)
                {
                    res.text().then(error => {
                        this.setState({
                            error: error,
                        })
                    })
                }
            }).catch(error => console.log("in catch error :" , error))
            //.then(finalRes => console.log(finalRes));

        this.setState({
            screen: "Lobby",
            status:"Lobby",
            name: name,
        });
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
