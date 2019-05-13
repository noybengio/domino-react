import React from 'react';
import ReactDOM from 'react-dom';

import Brick from './stone/brick.jsx';


const App = () => (
    <div>
        <Brick direction='vertical' />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
