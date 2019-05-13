import React from 'react';
import './brick.css';
import DotsContainer from '../dotsContainer/dotsContainer.jsx';

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
                <DotsContainer num={prop.num1}/>
                <hr/>
                <DotsContainer num={prop.num2}/>
            </div>

        );
   }
}

export default Brick;
