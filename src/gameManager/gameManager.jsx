import React from 'react';
import './gameManager.css';
import SignIn from '../signIn/signIn.jsx';
import Lobby from '../lobby/lobby.jsx';
import Game from '../game/game.jsx';




class gameManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "signIn",
            name:""

        };

    }

    signIn() {

        let name = document.getElementById("input").value;
        console.log("game manager sighn in name: " , name);
        this.setState({
            page: "Lobby",
            name: name
        });
    }
    enterGame() {

        this.setState({
            page: "Game",
        });

    }

   render() {
        let page = this.state.page;
        
        return (
            <div>
            {((page) => {
                console.log(page);
                switch(page) {

                    case("signIn"):
                        return <SignIn
                            signIn = {this.signIn}
                            game = {this}
                        />;

                    case("Lobby"):
                        return <Lobby
                            enterGame = {this.enterGame}
                            game = {this}
                        />;

                    case("Game"):
                        return <Game/>;
                }
        })(page )}
            </div>
        );
   }
}

export default gameManager;
