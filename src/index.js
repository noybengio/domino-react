import React from 'react';
import ReactDOM from 'react-dom';

import GameManager from "./gameManager/gameManager.jsx";
import './index.css'

const App = () => (
    <div id = "app">
        <GameManager/>
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
