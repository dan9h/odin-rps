const CHOICES = ["rock", "paper", "scissors"];
const RACETO = 5;

const buttons = document.getElementsByClassName("rps__button");
const roundCounterEl = document.getElementById("js-round-counter");
const playerScoreEl = document.getElementById("js-player-score");
const compScoreEl = document.getElementById("js-computer-score");
const resultEl = document.getElementById("js-result");

let playerScore = 0;
let computerScore = 0;
let roundCount = 1;
let gameOver = false;
let winner = null;

initGame();

function initGame() {
  for (const button of buttons) {
    button.choice = button.dataset.choice;
    button.addEventListener("click", handleButtonClick);
  }

  updateScoreBoard();
  displayResult("Pick a hand to start the game.");
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundCount = 1;

  gameOver = false;
  winner = null;

  updateScoreBoard();
  displayResult("Pick a hand to start the game.");
}

function handleButtonClick() {
  if (gameOver) return;

  const playerChoice = this.choice;
  const computerChoice = getComputerChoice();

  const roundResult = playRound(playerChoice, computerChoice);

  updateScoreBoard();
  checkWinner();

  if (gameOver) {
    displayResult(
      `${winner === "player" ? "You Won!" : "You Lost!"} Play again?`
    );
    showRestartPrompt();
  } else {
    displayResult(roundResult);
  }
}

function showRestartPrompt() {
  const btnYes = document.createElement("button");
  const btnNo = document.createElement("button");

  btnYes.textContent = "Yes";
  btnNo.textContent = "No";

  btnYes.addEventListener("click", function () {
    resetGame();
    showGameButtons();
  });

  btnNo.addEventListener("click", function () {
    displayResult("Thanks for playing! Just reload the page to play again.");
    removePromptButtons();
  });

  hideGameButtons();

  function hideGameButtons() {
    const buttonsParentEl = buttons[0].parentElement;

    for (const button of buttons) {
      button.style.display = "none";
    }

    buttonsParentEl.appendChild(btnYes);
    buttonsParentEl.appendChild(btnNo);
  }

  function showGameButtons() {
    for (const button of buttons) {
      button.style.display = "inline-block";
    }

    removePromptButtons();
  }

  function removePromptButtons() {
    btnYes.remove();
    btnNo.remove();
  }
}

function checkWinner() {
  if (playerScore === RACETO) {
    gameOver = true;
    winner = "player";
    return;
  }

  if (computerScore === RACETO) {
    gameOver = true;
    winner = "computer";
    return;
  }
}

function updateScoreBoard() {
  roundCounterEl.textContent = roundCount;
  playerScoreEl.textContent = playerScore;
  compScoreEl.textContent = computerScore;
}

function displayResult(message) {
  resultEl.textContent = message;
}

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playRound(playerChoice, computerChoice) {
  roundCount++;

  if (playerChoice === computerChoice) {
    return `It's a tie! Computer also chose ${capitalize(computerChoice)}.`;
  } else {
    const [rock, paper, scissors] = CHOICES;

    if (
      // rock beats scissors
      (playerChoice === rock && computerChoice === scissors) ||
      // paper beats rock
      (playerChoice === paper && computerChoice === rock) ||
      // scissors beats paper
      (playerChoice === scissors && computerChoice === paper)
    ) {
      // player won
      playerScore++;

      return `${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
    } else {
      // computer won
      computerScore++;

      return `${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
    }
  }
}

function capitalize(word) {
  if (!word || typeof word !== "string") {
    return "";
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
