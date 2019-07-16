global.userList = [];
global.roomsList = [];

function userAuthentication(req, res, next) {
    if (userList[req.session.index] === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function addUserToAuthList(req, res, next) {
    if(req.session.index !== undefined) {
        userList[req.session.index].name = req.body;
        userList[req.session.index].location = "lobby";
    }
    else {
        const newUserName = req.body;
        userList.map(user => {
            if(newUserName == user.name)
                console.log("inside for - user already exist");
                res.status(403).send('user name already exist');
                return;
            })

        req.session.index = Object.keys(userList).length;
        userList[req.session.index] = {
            name: req.body,
            location: "lobby"};
    }
    
    res.sendStatus(200);
    console.log(" User added :" ,userList[req.session.index]);
    console.log("userList: ", userList);
    next();

}

function removeUserFromAuthList(req, res, next) {
    if (userList[req.session.index] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        console.log("user logged out:", userList[req.session.index]);
        userList.splice(req.session.index, 1);
        //delete userList[req.session.index];
        res.status(204).send('user deleted successfully');
        next();
    }
}

function getUserInfo(id) {
    return {name: userList[id]};
}

function addRoomToRoomsList (req, res, next) {
    let roomObject = JSON.parse(req.body);
    //let roomObject = req.body;

    console.log("roomObject:", roomObject);
    roomsList.map(room => {
        if (room.name === roomObject.name) {
            console.log("inside for - user already exist");
            res.status(403).send('room name already exists');
            return;
        }
    })
    /*if (roomsList[roomObject.name] !== undefined) {
        console.log("inside for - user already exist");
        res.status(403).send('room name already exists');
        return;
    }*/
    roomObject.numReq = parseInt(roomObject.numReq);
    roomObject.admin = userList[req.session.index].name;
    roomObject.numSigned = 0;
    roomObject.status = "waiting";
    roomObject.data = null;
    roomObject.id = Object.keys(roomsList).length;
    roomObject.players = [];

    roomsList[roomObject.id] = roomObject;
    
    res.json(roomsList[roomObject.id]);
    console.log("roomsList: ", roomsList);
    next();

}

function removeRoomFromAuthList(req, res, next) {
    let roomIndex = req.body;
    if (roomsList[req.body] === undefined) {
        res.status(403).send('room name does not exist');
    } else {
        roomsList.splice(roomIndex, 1);
        //delete roomsList[req.body];
        res.status(204).send('room deleted successfully');
        next();
    }
}


module.exports = {removeRoomFromAuthList,userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo,addRoomToRoomsList}
