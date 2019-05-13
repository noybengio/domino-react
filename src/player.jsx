import React from 'react';

class Player extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            playerBricks: []

        };

        this.setPlayerBricks();
    }

    setPlayerBricks() {

        for(let i = 0; i < 6; i++)
        {
            playerBricks.push({i: , j: j});
        }

    }


    render() {
        return (
            <div>


            </div>
        );

    }

}

export default Player;
