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
        { console.log("in game room this.props.playerName is:", this.props.playerName)}
        { console.log("in game room this.props.admin  is:", this.props.admin )}
        return (
            <>
                <tbody>
                    <tr
                        key = {`room-${this.props.id}`}
                        className="gameroom-container"
                        onClick={this.props.status  !== "playing" ? function (e) {this.props.enterGame.bind(this.props.game)(e);}.bind(this): null}
                        belongto = {this.props.id}
                    >
                        <th belongto = {this.props.id}> {this.props.name} </th>

                        <th belongto = {this.props.id}> {this.props.admin} </th>

                        <th belongto = {this.props.id}>
                            {`${this.props.numSigned} / ${this.props.numReq}`}</th>

                        <th belongto = {this.props.id}>
                            {this.props.status}</th>
                    </tr>

                {(this.props.admin === this.props.playerName && this.props.numSigned === 0 ) &&

                            <tr className={"table-close-button"}>
                                <Button
                                    belongto = {this.props.id}
                                    className={"close_btn"}
                                    text="✖"
                                    buttonFunc = {this.props.deleteRoom}
                                    game = {this.props.lobby} />
                            </tr>
}


                </tbody>

            </>
        );
    }

}

export default GameRoom;

