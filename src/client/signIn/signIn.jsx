import React from "react";
import './signIn.css';
import Input from "../../basicComponents/input/input.jsx.js";
import Button from "../../basicComponents/button/button.jsx.js";
import Info from "../../basicComponents/info/info.jsx.js";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    };

    render() {
        return (
            <div className="sign-in-container" >
                <form className="sign-in-form">
                    {this.props.error !== null &&
                        <Info
                            className = "red-info"
                            text = {this.props.error}
                            data = {null}/>
                    }
                    <Input text = "User Name" />
                    <Button
                        className={"square_btn"}
                        text="Sign In"
                        buttonFunc = {this.props.signIn}
                        game = {this.props.game}
                    />
                </form>


            </div>
        );
    }

}

export default SignIn;