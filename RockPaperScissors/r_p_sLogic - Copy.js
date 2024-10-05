let user_score = 0;
let comp_score = 0;

const choices = document.querySelectorAll(".choice");
const userScr = document.querySelector("#userScore");
const compScr = document.querySelector("#compScore");
const mesg = document.querySelector("#msg");
const resetScr = document.querySelector("#reset");


const generate = () => {
    let opts = ["rock", "paper", "scissors"];
    let comp = opts[Math.floor(Math.random() * 3)];
    return comp;
};


const drawGame = () => {
    mesg.innerText = "Its a draw, Play again!";
    mesg.style.backgroundColor = "black";
};

const Winner = (user, comp, userWin) => {
    if(userWin){
        user_score++;
        userScr.innerText = user_score;
        mesg.innerText = `You win! Your ${user} beats ${comp}!`
        mesg.style.backgroundColor = "green";
    }
    else{
        comp_score++;
        compScr.innerText = comp_score;
        mesg.innerText = `You lose! ${comp} beats your ${user}!`;
        mesg.style.backgroundColor = "red";
    }
}

const playGame = (user) => {
    const comp = generate();
    if(user == comp){
        drawGame();
    }
    else {
        let userWin = true;
        if(user == "rock"){
            userWin = comp == "scissors" ? true : false;
        }
        else if(user == "paper"){
            userWin = comp == "rock" ? true : false;
        }
        else {
            userWin = comp == "paper" ? true : false;
        }
        Winner(user, comp, userWin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const user = choice.getAttribute("id");
        playGame(user);
    })
})

resetScr.addEventListener("click", () => {
    userScr.innerText = "0";
    compScr.innerText = "0";
    user_score = 0;
    comp_score = 0;
    mesg.innerText = "Play your move!";
    mesg.style.backgroundColor = "black";
})