import React from "react";

import './gameRoom.css'

class GameRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className="input" >
                <p> {this.props.text}</p>
                <input type = "input"/>

            </div>
        );
    }

}

export default Input;

