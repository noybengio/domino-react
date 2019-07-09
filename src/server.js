const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

global.userList = {};

/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.

    The result is when the server is getting the '/' request path it will return the index.html file
*/

app.listen(3000, console.log('server is app on port 3000'));