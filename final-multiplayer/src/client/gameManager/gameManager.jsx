import React from 'react';
import './gameManager.css';
import SignIn from '../signIn/signIn.jsx';
import Lobby from '../lobby/lobby.jsx';
import Game from '../game/game.jsx';



class gameManager extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            screen: this.props.screen,
            name: this.props.name,
            status: "", //where is the player - lobby/playing
            error: null,
            game: {},

        };

        window.addEventListener("unload", function (e) {
            fetch(`${this.props.url}/logOut`, {
                method: "DELETE"
            })
                .then(res => {

                    if (res.status !== 204) {
                        res.text().then(error => {
                            console.log("log in error from server");
                            this.setState({
                                error: error,
                            })
                        })
                    }
                });


        })
    }



    signIn(){

        let name = document.getElementById("input").value;
        console.log("game manager sign in name: " , name);


        fetch(`${this.props.url}/signIn`, {
            method:"POST",
            mode: "no-cors",
            body: name,
        } )
            .then(res =>{
                if(res.status !== 200)
                {
                        this.setState({
                            error:"Name Already Exists"
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

    }

    enterGame(e) {

        let roomId = e.target.getAttribute("belongto");

            fetch(`${this.props.url}/game/${roomId}`, {
                method: "Get"
            })
                .then(res => {

                    if (res.status !== 200) {
                        res.text().then(error => {
                            this.setState({
                                error: error,
                            })
                        })
                    }
                    return res.json();
                })
                .then(gamePackage => {

                    this.setState({
                        screen: "Game",
                        error: null,
                        game: gamePackage

                    });
                })
                .catch(error => console.log("in catch error :", error))


    }

    logOut() {
        fetch(`${this.props.url}/logOut`, {
            method:"DELETE"} )
            .then(res =>{

                if(res.status !== 204)
                {
                    res.text().then(error => {
                        this.setState({
                            error: error,
                        })
                    })
                }
                else {
                    this.setState({
                        screen: "signIn",
                        error: null

                    });
                }
            }).catch(error => console.log("in catch error :" , error))

    }

    exitRoom() {
        fetch(`${this.props.url}/exitRoom`, {
            body: this.state.game.id,
            method:"DELETE"} )
            .then(res =>{

                if(res.status !== 204)
                {
                    res.text().then(error => {
                        this.setState({
                            error: error,
                        })
                    })
                }
                else {
                    this.setState({
                        screen: "Lobby",
                        error: null,
                        game: null

                    });
                }
            }).catch(error => console.log("in catch error :" , error))

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
                                url = {this.props.url}
                            />;

                        case("Game"):
                            let game = this.state.game;
                            return <Game
                                name = {game.name}
                                numReq = {game.numReq}
                                numSigned = {game.numSigned}
                                player = {game.player}
                                enemies = {game.enemies}
                                general = {game.status === "playing" ? game.general : undefined}
                                board = {game.status === "playing" ? game.board : undefined}
                                game = {this}

                                status = {game.status}
                                roomId = {game.id}
                                url = {this.props.url}
                                exitRoom = {this.exitRoom}

                            />;
                    }
                })(screen)}
            </div>
        );
    }
}



export default gameManager;
