
function createBricksArray() {
    let bricksArr = [];
    for (let i = 0; i < 8; i++)
        for (let j = i; j < 8; j++) {
            bricksArr.push({num1: i, num2: j, used: false});

        }

    return shuffleBricks(bricksArr);
}

function shuffleBricks(bricksArr) {
    let j, x, i;
    for (i = bricksArr.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = bricksArr[i];
        bricksArr[i] = bricksArr[j];
        bricksArr[j] = x;
    }

    return bricksArr;
}


function splitBricks(bricksArr) {
    let playerBricks = [];
    for (let i = 0; i <= 6; i++) {
        playerBricks.push(bricksArr.pop());
    }

    return ({
        playerBricks: playerBricks,
        bricksArr: bricksArr
    })
}


module.exports = {createBricksArray,shuffleBricks,splitBricks };