import React from "react";

import './gamesContainer.css'

import GameRoom from '../gameRoom/gameRoom.jsx'

class gamesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className="gamesContainer" >

                    this.props.gamesList.map((game , i) => {
                    return
                        <GameRoom
                            key={i}
                            gameName = {game.gameName}
                            gameAdmin = {game.admin}
                            numRequired = {game.numRequired}
                            numSighned = {game.numSighned}
                            gameStatus = {game.gameStatus}

                        />

                })

            </div>

        );
    }

}

export default gamesContainer;
