import React from 'react';
import './brick.css';
import DotsContainer from '../cube/dotsContainer.jsx';

class Brick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: this.props.direction
        };
    }

   render() {
        return (
            <div direction={this.state.direction} className={'brick'}>
                <DotsContainer/>
                <hr/>
                <DotsContainer/>
            </div>

        );
   }
}

export default Brick;
