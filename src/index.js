import React from 'react';
import ReactDOM from 'react-dom';

import Brick from './brick/brick.jsx';
import Game from "./game.jsx";

const App = () => (
    <div>
        <Game/>
        <Brick direction='vertical' />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
