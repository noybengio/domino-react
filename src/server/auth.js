
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

function checkIfUserExist(room,player) {

    for(let i = 0; i < room.players.length; i++) {
        if(room.players[i].name === player.name){
            console.log("player.name:", player.name);
            console.log("room.players[i].name:", room.players[i].name);

            return true;
        }
    }
    return false;
}


module.exports = {
    removeRoomFromAuthList,
    removeUserFromAuthList,
    checkIfUserExist
};
