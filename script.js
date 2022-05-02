console.log("Hello!");

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'
const options = [ROCK, PAPER, SCISSORS];

function computerPlay() {
    return options[random(0, options.length)];
}

function random(start, end) {
    const range = end - start;
    return 0 < range ? start + Math.floor(Math.random() * range) : undefined;
}

function normalizeGuess(guess) {
    return guess.toLowerCase() === 'r' ? ROCK :
            guess.toLowerCase() === 'p' ? PAPER :
            guess.toLowerCase() === 's' ? SCISSORS : guess;
}

function getWinner(player1, player2) {
    if (player1.toLowerCase() === player2.toLowerCase()) {
        return 0;
    } if (player1.toLowerCase() === ROCK && player2.toLowerCase() === SCISSORS
          || player1.toLowerCase() === SCISSORS && player2.toLowerCase() === PAPER
          || player1.toLowerCase() === PAPER && player2.toLowerCase() === ROCK) {
        return 1;
    } else if (player1.toLowerCase() === ROCK && player2.toLowerCase() === PAPER
                || player1.toLowerCase() === PAPER && player2.toLowerCase() === SCISSORS
                || player1.toLowerCase() === SCISSORS && player2.toLowerCase() === ROCK) {
        return 2;
    }
    return undefined;
}

function playRound(playerSelection) {
    let computerSelection = computerPlay();
    playerSelection = normalizeGuess(playerSelection);
    console.log(playerSelection);
    let winner = getWinner(computerSelection, playerSelection);
    switch (winner) {
        case 0:
            return 0;
        case 1:
            return -1;
        case 2:
            return 1;
    }
}

const roundSpan = document.querySelector("#round > span");
const playerScSpan = document.querySelector("#player-sc > span");
const computerScSpan = document.querySelector("#computer-sc > span");
const messageDiv = document.querySelector("#message");

const WINNER_ROUNDS = 5;
let round = 0;
let playerScore = 0;
let computerScore = 0;

function updateResultTexts(playerWin) {
    switch (playerWin) {
        case 0:
            messageDiv.textContent = "Draw";
            playerScSpan.textContent = ++playerScore;
            computerScSpan.textContent = ++computerScore;
            break;
        case -1:
            messageDiv.textContent = "Computer wins";
            computerScSpan.textContent = ++computerScore;
            break;
        case 1:
            messageDiv.textContent = "Player wins";
            playerScSpan.textContent = ++playerScore;
            break;
    }
    if (WINNER_ROUNDS <= playerScore || WINNER_ROUNDS <= computerScore) {
        messageDiv.textContent = `The winner is ${WINNER_ROUNDS <= playerScore ? "YOU" : "THE COMPUTER"}!`;
        messageDiv.classList.add("winner");
        round = 0;
        playerScore = 0;
        computerScore = 0;
    } else {
        messageDiv.classList.remove("winner");
    }
}

function buttonClick(button) {
    let playerWin = playRound(button.id);
    roundSpan.textContent = ++round;
    updateResultTexts(playerWin);
}

const buttons = document.querySelectorAll("#buttons > button");
buttons.forEach((b) => b.addEventListener('click', () => buttonClick(b)));
