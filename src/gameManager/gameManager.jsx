import React from './node_modules/react';
import './gameManager.css';
import SighIn from '../sighIn/sighIn.jsx';
import Lobby from '../lobby/lobby.jsx.js';
import Game from '../game/game.jsx.js';




class gameManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "sighIn",
            name:""

        };

    }

   render() {
        let page = this.state.page;
        
        return ( (page) => {

            switch(page) {

                case("sighIn"):
                    return <SighIn/>
                    
                case("Lobby"):
                    return <Lobby/>

                case("Game"):
                    return <Game/>
            }
        }
   
        );
   }
}

export default gameManager;
