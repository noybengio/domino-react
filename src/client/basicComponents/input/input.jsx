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
            <div className={this.props.className ? this.props.className : "input"} >
                <p> {this.props.text}</p>
                <input id = {this.props.id ? this.props.id : "input"} 
                type = "input"/>


            </div>
        );
    }

}

export default Input;
