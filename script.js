let boxs = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-btn');
let msg = document.querySelector('.msg-block');
let newGameBtn = document.querySelector('.new-game-btn');


let turnO = true;
const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 4, 8], // left diagonal
    [2, 4, 6], // right diagonal
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8] // right column
];
showWinner = (winner) => {
    msg.innerText = `player ${winner} is the winner`;
    msg.classList.remove('hide'); 
    
}

const resetGame = () => {
    turnO = true;
    boxs.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "#28502E";
    });
    turnO = true;
    msg.classList.add('hide');
}

boxs.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (turnO) {//player O
            e.target.innerText = 'O';
            console.log("box was clicked");
            turnO = false;
        } else {// player X
            e.target.innerText = 'X';
            console.log("box was clicked");
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
    });
});

const checkWinner = () => {
    for(patterns of winningConditions){
         
        const firstBox = boxs[patterns[0]].innerText;
        const secondBox = boxs[patterns[1]].innerText;
        const thirdBox = boxs[patterns[2]].innerText;
        if(firstBox != "" && secondBox != "" && thirdBox != "")
            if(firstBox === secondBox && secondBox === thirdBox){
            console.log("we have a winner");
            showWinner(firstBox);
            boxs[patterns[0]].style.backgroundColor = "green";
            boxs[patterns[1]].style.backgroundColor = "green";
            boxs[patterns[2]].style.backgroundColor = "green";
            boxs.forEach((box) => {
                box.disabled = true;
            });
        }
    }
    }

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

const checkDraw = () => {
    let draw = false;
    let count = 0;
    boxs.forEach((box) => {
        if(box.innerText === ""){
            draw = false;
        }
    });
    boxs.forEach((box) => {
        if(box.innerText != ""){
            draw = true;
            count++;
        }
    })
    if(draw==true && count === 9){
        msg.innerText = "Draw";
        msg.classList.remove('hide');
    }
}