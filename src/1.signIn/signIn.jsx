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
            <div className="sign-in" >

                <Input text = "User Name"/>
                <Button
                    text="Sign In"
                    buttonFunc = {}
                    game = {}
                />
            </div>
        );
    }

}

export default SignIn;