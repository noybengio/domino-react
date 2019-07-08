import React from 'react';
import './addRoom.css';
import Button from "../../basicComponents/button/button.jsx";
import Input from "../../basicComponents/input/input.jsx";


class AddRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div className={"addRoom-background"} >
                <div className ={"addRoom-container"}>
                <Button
                    className={"close_btn"}
                    text="✖"
                    buttonFunc = {this.props.goLobby}
                    game = {this.props.game}
                />

                <form className={"addRoom-form"}>

                    <div className={"addRoom-inputs"}>
                        <Input 
                            id = "roomName"
                            text = "Room Name:"
                        />
                        <div className={"addRoom-select-container"}>
                            <p>Number Of Players: </p>
                            <select id = "playerNum">
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                       
                    </div>

                    <div className={"addRoom-buttons"}>
                        <Button
                            className={"square_btn"}
                            text="ADD"
                            buttonFunc = {this.props.addRoom}
                            game = {this.props.game}
                        />

                    </div>
                    
                </form>
                </div>
                
               
             
            </div>
        );
    }
}

export default AddRoom;
