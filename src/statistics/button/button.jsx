import React from "react";
import './button.css'


class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <div>
                <button
                    type="button"
                    onClick={function () {this.props.buttonFunc.bind(this.props.game)();}.bind(this)}
                    className={"button"}
                >
                    {this.props.text}
                </button>

            </div>
        );
    }

}

    export default Button;
