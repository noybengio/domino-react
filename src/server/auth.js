

function userAuthentication(req, res, next) {
    if (userList[req.session.index] === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function removeUserFromAuthList(req, res, next) {
    if (userList[req.session.index] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        console.log("user logged out:", userList[req.session.index]);
        userList.splice(req.session.index, 1);
        res.status(204).send('user deleted successfully');
        next();
    }
}

function removeUserFromRoom(req, res, next) {
    let roomID = parseInt(req.body, 10);
    let room = roomsList[roomID];
    let deletePlayer = userList[req.session.index];

    room.players.forEach(player => {
        if(player.name === deletePlayer.name){
            delete player;
            room.numSigned--;
            next();
        }
    });

    res.sendStatus(403);
}

function getUserInfo(id) {
    return {name: userList[id]};
}

function addRoomToRoomsList(req, res, next) {
    let roomObject = JSON.parse(req.body);

    console.log("roomObject:", roomObject);
    roomsList.map(room => {
        if (room.name === roomObject.name) {
            console.log("inside for - user already exist");
            res.status(403).send('room name already exists');
            return;
        }
    });

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
        res.status(204).send('room deleted successfully');
        next();
    }
}


module.exports = {
    removeRoomFromAuthList,
    removeUserFromAuthList,
    addRoomToRoomsList,
    removeUserFromRoom
};
