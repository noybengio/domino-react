import React from "react";
import './gameRoom.css'
import Info from "../../../basicComponents/info/info.jsx";

class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div
                className="gameroom-container"
                onClick={function () {this.props.enterGame.bind(this.props.game)();}.bind(this)}

            >

                <Info text = {this.props.name}
                      data = {null}/>

                <Info text = {this.props.admin}
                      data = {null}/>

                <Info text = {`${this.props.numSigned} / ${this.props.numReq}`}
                      data = {null}/>

                <Info text = {this.props.status}
                      data = {null}/>

            </div>

        );
    }

}

export default GameRoom;

