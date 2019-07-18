import React from 'react';
import ReactDOM from 'react-dom';

import GameManager from "./client/gameManager/gameManager.jsx";
import './index.css'

let url = 'http://192.168.1.107:3000';

let sessionData = null;


function getFirstScreen() {
    fetch(`${url}/connect`, {
        method:"GET",
        mode: "no-cors",
    })
        .then(res =>{
            console.log("in first then");
            if(res.status !== 200)
            {
                res.text().then(error => {
                    console.log("log in error from server - trying again", error);
                    return this.getFirstScreen();
                })
            }
            else {
               
                return res.json();

            }
        })
        .then(data => {
            console.log("screen", screen);
            sessionData = data;
        })
        .catch(error => console.log("in catch error :" , error));

}


getFirstScreen();

setTimeout(start, 500);


function start(){
    ReactDOM.render(<GameManager screen = {sessionData.location} name = {sessionData.name} url = {url}/>, document.getElementById("root"))
}