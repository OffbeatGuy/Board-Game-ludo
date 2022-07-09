let redsTurn = false;
let moveMade = true;
let steps = 0;
// ---------------------------LOGIC FOR DICE AND ROLLING-------------------------

let roll_value = document.getElementById("roll-value");
let roll = document.getElementById("roll");
let isRolling = false;

function rollTheDice() {
    if (isRolling === false) {
        isRolling = true;
        roll_value.innerText = "Rolling ...";
        setTimeout(() => {
            roll_value.innerText = Math.floor((Math.random() * 100) % 6 + 1);
            steps = parseInt(roll_value.innerText);
            isRolling = false;
            moveMade = false;
            redsTurn = !redsTurn;
        }, 600);
    }
    else { console.log("Rolling in progress. DON'T CLICK!"); }
}

roll.addEventListener('mousedown', function () { roll.style.transform = 'scale(0.92)' })
roll.addEventListener('mouseup', function () { roll.style.transform = 'scale(1)' })


// ----------------LOGIC for tokens----------------

let tokenStyle = {
    display: "inline-block",
    margin: "2px",
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'red'
}

let locker1 = document.getElementById("locker1");
let locker2 = document.getElementById("locker2");

let PlayerA = [
    {
        token: document.createElement("div"),
        location: 0,
        canMove: false,
    },
    {
        token: document.createElement("div"),
        location: 0,
        canMove: false,
    }
]

let PlayerB = [
    {
        token: document.createElement("div"),
        location: 0,
        canMove: false,
    },
    {
        token: document.createElement("div"),
        location: 0,
        canMove: false,
    }
]

let Players = [PlayerA, PlayerB];

Players.forEach(i => {
    i.forEach(element => {

        element.token.addEventListener('click', function () {
            if ((i === PlayerA && redsTurn) || (i === PlayerB && !redsTurn) && !moveMade) 
            {
                if (steps === 6 && !element.canMove) {
                    element.canMove = true; 
                    if(i === PlayerA) element.location = 1; 
                    else element.location = 15;
                    element.token.remove(); 
                    document.getElementById(element.location).appendChild(element.token) 
                }
                else if (element.canMove) {
                    element.location += steps;
                    element.token.remove();
                    document.getElementById(`${element.location % 28}`).appendChild(element.token);
                }
                if (i === PlayerA) {
                    if(element.location % 28 == PlayerB[0].location % 28) 
                    {
                        PlayerB[0].token.remove();
                        PlayerB[0].location = 15;
                        PlayerB[0].canMove = false;
                        locker2.appendChild(PlayerB[0].token);
                    }
                    if(element.location % 28 == PlayerB[1].location % 28) 
                    {
                        PlayerB[1].token.remove();
                        PlayerB[1].location = 15;
                        PlayerB[1].canMove = false;
                        locker2.appendChild(PlayerB[1].token);
                    }
                }
                if (i === PlayerB) {
                    if(element.location % 28 == PlayerA[0].location % 28) 
                    {
                        PlayerA[0].token.remove();
                        PlayerA[0].location = 0;
                        PlayerA[0].canMove = false;
                        locker1.appendChild(PlayerA[0].token);
                    }
                    if(element.location % 28 == PlayerA[1].location % 28) 
                    {
                        PlayerA[1].token.remove();
                        PlayerA[1].location = 0;
                        PlayerA[1].canMove = false;
                        locker1.appendChild(PlayerA[1].token);
                    }
                }
                moveMade = true;
                
            }
        })


        Object.assign(element.token.style, tokenStyle);
        locker1.appendChild(element.token);
        if (i === PlayerB) {
            element.token.style.backgroundColor = "deepskyblue";
            locker2.appendChild(element.token);
        }

        element.token.addEventListener('mouseover', function () { element.token.style.border = "3px solid black" })
        element.token.addEventListener('mouseout', function () { element.token.style.border = "none" })
    });
});




// PlayerA.forEach(element => {
//     element.token.addEventListener('click', function () {
//         if (steps === 6 && !element.canMove) element.canMove = true;
//         else if (typeof (steps) === 'number' && element.canMove) {
//             element.location += steps;
//             element.token.remove();
//             document.getElementById(`${element.location % 28}`).appendChild(element.token);
//         }
//     })
//     Object.assign(element.token.style, tokenStyle);
//     locker1.appendChild(element.token);
//     element.token.addEventListener('mouseover', function () { element.token.style.border = "3px solid black" })
//     element.token.addEventListener('mouseout', function () { element.token.style.border = "none" })
// });

// PlayerB.forEach(element => {
//     element.token.addEventListener('click', function () {
//         if (steps === 6 && !element.canMove) element.canMove = true;
//         else if (typeof (steps) === 'number') {
//             element.location += steps;
//             element.token.remove();
//             document.getElementById(`${element.location % 28}`).appendChild(element.token);
//         }
//     })
//     Object.assign(element.token.style, tokenStyle);
//     element.token.style.backgroundColor = "deepskyblue";
//     locker2.appendChild(element.token);
//     element.token.addEventListener('mouseover', function () { element.token.style.border = "3px solid black" })
//     element.token.addEventListener('mouseout', function () { element.token.style.border = "none" })
// });

// let B1 = document.createElement("div");
// Object.assign(B1.style, tokenStyle);
// B1.style.backgroundColor = "deepskyblue";
// locker2.appendChild(B1);

// let B2 = document.createElement("div");
// Object.assign(B2.style, tokenStyle);
// B2.style.backgroundColor = "deepskyblue";
// locker2.appendChild(B2);

// A1.addEventListener('click', function () {
//     if (typeof (steps) === 'number') {
//         location_A1 += steps;
//         A1.remove();
//         document.getElementById(`${location_A1 % 28}`).appendChild(A1);
//     }
//     else console.log("invalid click");
// })
// A2.token.addEventListener('click', function () {
//     if (steps === 6 && !A2.canMove) A2.canMove = true;
//     else if (typeof (steps) === 'number' && A2.canMove) {
//         A2.location += steps;
//         A2.token.remove();
//         document.getElementById(`${A2.location % 28}`).appendChild(A2.token);
//     }
//     else console.log("invalid click");
// })