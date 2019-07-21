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
                    belongto = {this.props.belongto}
                    type={this.props.type ? this.props.type : "button"}
                    onClick={function (e) {this.props.buttonFunc.bind(this.props.game)(e);}.bind(this)}
                    className={this.props.className ? this.props.className : "button"}
                    disabled = {this.props.disabled}
                >
                    {this.props.text}
                </button>
        );
    }

}

    export default Button;
