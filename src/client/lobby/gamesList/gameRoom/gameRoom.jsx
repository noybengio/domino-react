import React from "react";
import './gameRoom.css'
import Button from "../../../../basicComponents/button/button.jsx";


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
                        onClick={function (e) {this.props.enterGame.bind(this.props.game)(e);}.bind(this)}
                        index = {this.props.index}
                    >
                        <th>{this.props.name}</th>
                        <th>{this.props.admin}</th>
                        <th>{`${this.props.numSigned} / ${this.props.numReq}`}</th>
                        <th>{this.props.status}</th>                    
                    </tr>
                </tbody>
                {(this.props.admin === this.props.playerName && this.props.numSigned === 0 ) &&

                            <tr className={"table-close-button"}>
                                <Button
                                id = {this.props.name}
                                className={"close_btn"}
                                text="✖"
                                buttonFunc = {this.props.deleteRoom}
                                game = {this.props.lobby}
                            /></tr>

                        }



            </>
        );
    }

}

export default GameRoom;

