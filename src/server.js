const express = require('express');
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const userManagement = require('./server/userManagement');


const app = express();
app.use(express.static(path.resolve(__dirname,"..",'public')));

app.use(bodyParser.text());

app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true
}));

app.post('/signIn', auth.addUserToAuthList, (req, res) => {
    console.log("new user name: ", req.body);
    res.sendStatus(200);
});
/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.

    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));