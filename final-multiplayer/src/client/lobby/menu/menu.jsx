import React from 'react';
import './menu.css';
import Button from "../../../basicComponents/button/button.jsx";


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className ={"menu-container"}>
            
                <p>{`Hello ${this.props.name}!`}</p> 

                <div className={"menu-buttons"}>
                    <Button
                        text="Add Room"
                        className={"square_btn"}
                        game = {this.props.lobby}
                        buttonFunc = {this.props.addRoomPopUp}
                    />
                    <Button
                        text="Log Out"
                        className={"square_btn"}
                        buttonFunc = {this.props.logOut}
                        game = {this.props.lobby}
                    />
                </div>
            
            </div>
        );
    }
}

export default Menu;
