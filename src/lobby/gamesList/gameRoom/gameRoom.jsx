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
            <>
                <tbody>
                    <tr
                        className="gameroom-container"
                        onClick={function () {this.props.enterGame.bind(this.props.game)();}.bind(this)}
                    >
                        <th>{this.props.name}</th>
                        <th>{this.props.admin}</th>
                        <th>{`${this.props.numSigned} / ${this.props.numReq}`}</th>
                        <th>{this.props.status}</th>
                    </tr>
                </tbody>
            </>
        );
    }

}

export default GameRoom;

