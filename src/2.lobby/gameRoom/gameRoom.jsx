import React from "react";

import './gameRoom.css'

import Info from "../../basicComponents/info/info.jsx";

class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className="game-Room" >

                <Info text = {this.props.name}
                      data = {null}/>

                <Info text = {this.props.admin}
                      data = {null}/>

                <Info text = {`${this.props.numSighned} / ${this.props.numRequired}`}
                      data = {null}/>

                <Info text = {this.props.gameStatus}
                      data = {null}/>

            </div>

        );
    }

}

export default GameRoom;

