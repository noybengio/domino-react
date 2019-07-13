import React from 'react';
import './lobbyPlayer.css';
import Info from '../../../../basicComponents/info/info.jsx.js';

class LobbyPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

   render() {
        return (
            <div className= {"lobbyPlayer-container"}>
                <Info
                    text = {this.props.name}
                    data = {null}
                />


                <Info
                    text = "location: "
                    data = {this.props.location}
                />

            </div>
        );
   }
}

export default LobbyPlayer;
