import React from "react";
import './info.css'


class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {
        return (
            <div 
                className="info"
                belongto = {this.props.belongTo}
            >
                <p >{this.props.text}</p>
                { this.props.data &&
                <p>{this.props.data}</p>
                }

            </div>
        );
    }


}

    export default Info;
