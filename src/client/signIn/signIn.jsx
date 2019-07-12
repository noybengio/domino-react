import React from "react";
import './signIn.css';
import Input from "../basicComponents/input/input.jsx";
import Button from "../basicComponents/button/button.jsx";
import Info from "../basicComponents/info/info.jsx";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    };

    render() {
        return (
            <div className="sign-in-container" >
<<<<<<< HEAD
                {/*<form className="sign-in-form">*/}
                    {/*<input*/}
                        {/*onChange={this.inputChanged}*/}
                        {/*text="User Name"*/}
                    {/*/>*/}
                    {/*<button onClick={this.signIn} type="button">Sign in</button>*/}
                {/*</form>*/}
=======
>>>>>>> 016f27402a6fb4ed0430bffbc9bf6b8fa8bdcb87
                <form className="sign-in-form">
                    {this.props.error !== null &&
                        <Info
                            className = "red-info"
                            text = {this.props.error}
                            data = {null}/>
                    }
                    <Input text = "User Name" />
<<<<<<< HEAD
=======

>>>>>>> 016f27402a6fb4ed0430bffbc9bf6b8fa8bdcb87
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