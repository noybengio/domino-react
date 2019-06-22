import React from "react";
import './input.css'


class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className="input" >
                <p> {this.props.text}</p>
                <input id = "input" type = "input"/>


            </div>
        );
    }

}

export default Input;
