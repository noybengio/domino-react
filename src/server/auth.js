global.userList = {};
global.roomsList = {};

function userAuthentication(req, res, next) {
    if (userList[req.session.id] === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function addUserToAuthList(req, res, next) {
        for (sessionid in userList) {
            const name = userList[sessionid];
            if (name === req.body) {
                console.log("inside for - user already exist");
                res.status(403).send('user name already exist');
                return;
            }
        }

        userList[req.session.id] = {
            name: req.body,
            location: "lobby"};
        res.sendStatus(200);
        console.log(" name added :" ,userList[req.session.id]);
         console.log("userList: ", userList);
        next();

}

function removeUserFromAuthList(req, res, next) {
    if (userList[req.session.id] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        console.log("user logged out:", userList[req.session.id]);
        delete userList[req.session.id];
        res.status(204).send('user deleted successfully');
        next();
    }
}

function getUserInfo(id) {
    return {name: userList[id]};
}

function addRoomToRoomsList (req, res, next) {
    let roomObject = JSON.parse(req.body);
    let name = roomObject.name;

        if (roomsList[name] !== undefined) {
            console.log("inside for - user already exist");
            res.status(403).send('room name already exists');
            return;
        }

    roomsList[name] = roomObject;
    res.sendStatus(200);
    console.log(" rooms added :" ,roomsList[name]);
    console.log("roomsList: ", roomsList);
    next();

}

function removeRoomFromAuthList(req, res, next) {
    if (roomsList[req.body] === undefined) {
        res.status(403).send('room name does not exist');
    } else {
        delete roomsList[req.body];
        res.status(204).send('room deleted successfully');
        next();
    }
}


module.exports = {removeRoomFromAuthList,userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo,addRoomToRoomsList}
