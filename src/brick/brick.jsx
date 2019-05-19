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

            belongTo : this.props.belongTo

        };

        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(ev, id){
        console.log(" brick on drag start : ",this.props.num1,this.props.num2 );

        this.props.onDrag(this.props.num1,this.props.num2 , this.props.direction);
    };

   render() {
        return (
            this.state.belongTo === "player" ?
            <div
                id = {`brick${this.state.num1},${this.state.num2}` }
                direction={this.state.direction}
                className={"brick"}
                onDragStart={(ev)  =>this.onDragStart(ev, `${this.state.num1},${this.state.num2}`)}
                draggable
                >
                <DotsContainer num={this.props.num1}/>
                <hr/>
                <DotsContainer num={this.props.num2}/>
            </div>

                :
                <div
                    id = {`brick${this.state.num1},${this.state.num2}` }
                    direction={this.state.direction}
                    className={"brick"}

                >
                    <DotsContainer num={this.props.num1}/>
                    <hr/>
                    <DotsContainer num={this.props.num2}/>
                </div>

        );
   }
}

export default Brick;
