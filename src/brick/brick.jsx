import React from 'react';
import './brick.css';
import DotsContainer from '../dotsContainer/dotsContainer.jsx';

class Brick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: this.props.direction,
            num1: this.props.num1,
            num2: this.props.num2,

        };

        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(ev){
        ev.dataTransfer.setData("num1", this.state.num1);
        ev.dataTransfer.setData("num2", this.state.num2);
        //this.props.onDrag(this.props.num1,this.props.num2);
    };

   render() {
        return (
            <div
                id = {`brick${this.state.num1},${this.state.num2}` }
                direction={this.state.direction}
                className={"brick"}
                onDragStart={(ev)  =>this.onDragStart(ev)}
                draggable        
                >
                <DotsContainer num={this.props.num1}/>
                <hr/>
                <DotsContainer num={this.props.num2}/>
            </div>

        );
   }
}

export default Brick;
