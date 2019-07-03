import React from "react";
import './signIn.css';
import Input from "../basicComponents/input/input.jsx";
import Button from "../basicComponents/button/button.jsx";


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
                    <Input 
                        text = "User Name"
                    />
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