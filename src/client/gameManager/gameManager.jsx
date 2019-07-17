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

let url = 'http://192.168.1.104:3000';

class gameManager extends React.Component {
    constructor(props) {
        //  let res = getFirstScreen();

        //console.log("constractior res:", res);

        super(props);
        this.state = {
            //screen: res.location,
            //name: res.name,
            screen: "signIn",
            name: "",
            status: "", //where is the player - lobby/playing
            error: null,
            game: {}
        };

        window.addEventListener("unload", function (e) {
            fetch(`${url}/logOut`, {
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


        }) //set logout from server if user closed the tab
    }



    signIn() {

        let name = document.getElementById("input").value;
        console.log("game manager sign in name: " , name);


        fetch(`${url}/signIn`, {
            method:"POST",
            mode: "no-cors",
            body: name,
        } )
            .then(res =>{
                console.log("getFirstScreen res: ", res)
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

        let roomId = e.target.getAttribute("belongto");
        console.log("e.target", e.target);

        console.log("roomId", roomId);
        fetch(`${url}/game/${roomId}`, {
            method:"Get"} )
            .then(res => {

                if (res.status !== 200) {
                    res.text().then(error => {
                        console.log("can't enter game");
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
            .catch(error => console.log("in catch error :" , error))

    }

    logOut() {
        fetch(`${url}/logOut`, {
            method:"DELETE"} )
            .then(res =>{

                if(res.status !== 204)
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
                        screen: "signIn",
                        error: null

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
                                ד                        />;

                        case("Lobby"):
                            return <Lobby
                                name = {this.state.name}
                                enterGame = {this.enterGame}
                                logOut = {this.logOut}
                                game = {this}
                                url = {url}
                            />;

                        case("Game"):
                            let game = this.state.game;
                            return <Game
                                name = {game.name}
                                numReq = {game.numReq}
                                numSigned = {game.numSigned}
                                player = {game.player}
                                enemies = {game.enemies}
                                general = {game.general}
                                board = {game.board}
                                status = {game.status}
                                roomId = {game.id}
                                url = {url}

                            />;
                    }
                })(screen)}
            </div>
        );
    }
}

function getFirstScreen() {
    fetch(`${url}/a`, {
        method:"GET",
        mode: "no-cors",
    })
        .then(res =>{
            console.log("in first then");
            if(res.status !== 200)
            {
                res.text().then(error => {
                    console.log("log in error from server - trying again", error);
                    return this.getFirstScreen();
                })
            }
            else {
                return res.json();

            }
        })
        .then(screen => {
            console.log("screen", screen);
            return screen;
        })
        .catch(error => console.log("in catch error :" , error));

}

export default gameManager;
