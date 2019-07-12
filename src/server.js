const express = require('express');
<<<<<<< HEAD
=======

>>>>>>> 016f27402a6fb4ed0430bffbc9bf6b8fa8bdcb87
let session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./server/auth');
const userManagement = require('./server/userManagement');


const app = express();
app.use(express.static(path.resolve(__dirname,"..",'public')));

app.use(bodyParser.text());

<<<<<<< HEAD
=======
app.use(express.static('public'));
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true
}));

global.userList = [];


app.get('/a',(req,res) => {
    console.log("path '/' req.sessionID:", req.sessionID);
    console.log("path '/' req:" , req);


/*
  if (req.session.views) {
    req.session.views++    
    res.write('views: ' + req.session.views);    
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
    console.log("path '/' req:" , req);
    userList[req.session.id] = 5;
    */
})


>>>>>>> 016f27402a6fb4ed0430bffbc9bf6b8fa8bdcb87
app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true
}));

app.post('/signIn', auth.addUserToAuthList, (req, res) => {
    console.log("new user name: ", req.body);

    //console.log("server sign in post result: ", res);
});

app.post('/lobby/addRoom', auth.addRoomToRoomsList, (req, res) => {

});

/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.

    The result is when the server is getting the '/' request path it will return the index.html file
*/


app.listen(3000, console.log('server is app on port 3000'));