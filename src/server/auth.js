const userList = {};
const roomsList = {};
const playersList = {};

function userAuthentication(req, res, next) {
    if (userList[req.session.id] === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function addUserToAuthList(req, res, next) {
    console.log("in auth add user" );
        for (sessionid in userList) {
            const name = userList[sessionid];
            console.log("add user for name :", name);
            if (name === req.body) {
                console.log("inside for - user already exist");
                res.status(403).send('user name already exist');
                return;
            }
        }

        userList[req.session.id] = req.body;
        res.sendStatus(200);
        console.log(" name added :" ,userList[req.session.id]);
    console.log("userList: ", userList);
        next();

}

function removeUserFromAuthList(req, res, next) {
    if (userList[req.session.id] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        delete userList[req.session.id];
        next();
    }
}

function getUserInfo(id) {
    return {name: userList[id]};
}

function addRoomToRoomsList (req, res, next) {
    console.log("in auth addROom func");
    console.log("in auth addROom func req body after stringify: ", req.body);
    let i;
    let roomObject = JSON.parse(req.body);

    console.log("in auth addROom func req body object: ",roomObject);
    let lenOfRoomsList = roomsList.length;
    for (sessionid in roomsList) {
        const name = roomsList[sessionid].name;
        console.log("add room for loop name :", name);
        if (name === roomObject.name) {
            console.log("inside for - user already exist");
            res.status(403).send('user name already exist');
            return;
        }
    }

    roomsList[roomObject.name] = roomObject;
    res.sendStatus(200);
    console.log(" room added :" ,roomsList[sessionid]);
    console.log("roomsList: ", roomsList);
    next();

}

module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo,addRoomToRoomsList}
