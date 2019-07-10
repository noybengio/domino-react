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
                {/*<form className="sign-in-form">*/}
                    {/*<input*/}
                        {/*onChange={this.inputChanged}*/}
                        {/*text="User Name"*/}
                    {/*/>*/}
                    {/*<button onClick={this.signIn} type="button">Sign in</button>*/}
                {/*</form>*/}
<<<<<<< HEAD
                <form className="sign-in-form">
                    {this.props.error !== null && <Input className = "red-input" text = {this.props.error}/>}
                    <Input text = "User Name" />
=======
                <form className="sign-in-form" >
                    <Input
                        text = "User Name"
                    />
>>>>>>> a0a7ef34d48f35246f7d49aa7f88cfe614cea07e
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