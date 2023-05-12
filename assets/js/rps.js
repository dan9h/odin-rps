const playerScoreEl = document.getElementById("js-player-score");
const computerScoreEl = document.getElementById("js-computer-score");
const raceToEl = document.getElementById("js-raceto");
const roundCounterEl = document.getElementById("js-round");
const playerHandEl = document.getElementById("js-player-hand");
const computerHandEl = document.getElementById("js-computer-hand");
const resultEl = document.getElementById("js-result");
const buttons = document.getElementsByClassName("rps__button");

const CHOICES = ["rock", "paper", "scissors"];
const RACETO = 5;

let playerScore = 0;
let computerScore = 0;
let roundCount = 1;
let gameOver = false;
let winner = null;

(function initGame() {
  for (const button of buttons) {
    button.choice = button.dataset.choice;
    button.addEventListener("click", handleButtonClick);
  }

  updateScoreBoard();
  displayResult("Pick a hand to start the game.");
})();

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundCount = 1;

  gameOver = false;
  winner = null;

  updateHands("rock", "rock");
  updateScoreBoard();
  displayResult("Pick a hand to start the game.");
}

function handleButtonClick() {
  if (gameOver) return;

  const playerChoice = this.choice;
  const computerChoice = getComputerChoice();

  updateHands(playerChoice, computerChoice);

  const roundResult = playRound(playerChoice, computerChoice);

  updateScoreBoard();
  checkWinner();

  if (gameOver) {
    displayResult(
      `${winner === "player" ? "YOU WON!" : "You lost!"} Play again?`
    );
    showRestartPrompt();
  } else {
    displayResult(roundResult);
  }
}

function updateHands(playerHand, computerHand) {
  playerHandEl.src = `./assets/images/icon-${playerHand}.svg`;
  playerHandEl.setAttribute("class", `rps__hand--${playerHand}`);

  computerHandEl.src = `./assets/images/icon-${computerHand}.svg`;
  computerHandEl.setAttribute("class", `rps__hand--${computerHand}`);
}

function showRestartPrompt() {
  const restartButton = document.createElement("button");

  restartButton.textContent = "Yes";
  restartButton.setAttribute("class", "rps__button rps__button--restart");

  restartButton.addEventListener("click", function () {
    resetGame();
    showGameButtons();
  });

  hideGameButtons();

  function hideGameButtons() {
    const buttonsParentEl = buttons[0].parentElement;

    for (const button of buttons) {
      button.style.display = "none";
    }

    buttonsParentEl.appendChild(restartButton);
  }

  function showGameButtons() {
    for (const button of buttons) {
      button.style.display = "inline-block";
    }

    restartButton.remove();
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
  raceToEl.textContent = RACETO;
  roundCounterEl.textContent = roundCount;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
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

      let PREFIXES = ["Good", "Nice", "Awesome"];
      let PREFIX = PREFIXES[~~(Math.random() * PREFIXES.length)];

      return `${PREFIX}! ${capitalize(playerChoice)} beats ${capitalize(
        computerChoice
      )}.`;
    } else {
      // computer won
      computerScore++;

      return `Uh-oh! ${capitalize(computerChoice)} beats ${capitalize(
        playerChoice
      )}.`;
    }
  }
}

function capitalize(word) {
  if (!word || typeof word !== "string") {
    return "";
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
