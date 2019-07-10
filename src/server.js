const express = require('express');
var session = require('express-session');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(session({ secret: 'topSecret'}));

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



/*
    We don't need to set up a app.get('/', (req,res)={...}) method
    because we have in our static folder an html file named - 'index.html' - the defualt html file name.

    The result is when the server is getting the '/' request path it will return the index.html file
*/

app.listen(3000, console.log('server is app on port 3000'));