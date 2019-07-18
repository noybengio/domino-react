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

        this.onDragStart.bind(this);

    }

    onDragStart(ev, id){

        this.props.setDragBrick.bind(this.props.game)(this.props.num1,this.props.num2);
    };

   render() {

       return (
            this.state.belongTo === "player" ?
            <div
                id = {`brick${this.state.num1},${this.state.num2}` }
                direction={this.state.direction}
                className={"brick"}
                onDragStart={(ev)  =>this.onDragStart(ev, `${this.state.num1},${this.state.num2}`)}
                draggable = {this.props.isTurn } >
                <DotsContainer num={this.props.num1} />
                <hr/>
                <DotsContainer num={this.props.num2} />

            </div>

                :
                <div
                    /*id = {`${this.props.belongTo}-brick${this.state.num1},${this.state.num2}` }*/
                    direction={this.state.direction}
                    className={this.props.className} >
                        { 
                            this.props.belongTo === "board" &&
                                <>
                                    <DotsContainer num={this.props.num1} />
                                    <hr/>
                                    <DotsContainer num={this.props.num2} />
                                </>
                            }
                  
                </div>

        );
   }
}

export default Brick;
