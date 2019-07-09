import React from "react";
import './button.css'


class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
                <button
                    type={this.props.type ? this.props.type : "button"}
                    onClick={function () {this.props.buttonFunc.bind(this.props.game)();}.bind(this)}
                    className={this.props.className ? this.props.className : "button"}
                    disabled = {this.props.disabled}
                >
                    {this.props.text}
                </button>
        );
    }

}

    export default Button;
