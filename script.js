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
            return `Draw! ${computerSelection} == ${playerSelection}`;
        case 1:
            return `You Lose! ${computerSelection} beats ${playerSelection}`
        case 2:
            return `You Win! ${playerSelection} beats ${computerSelection}`
        default:
            return 'Something went wrong! By the way, YOU LOSE!';
    }
}

function buttonClick(button) {
    console.log(playRound(button.id));
}

const buttons = document.querySelectorAll("#buttons > button");
buttons.forEach((b) => b.addEventListener('click', () => buttonClick(b)));
