const CHOICES = ["rock", "paper", "scissors"];

function getPlayerChoice() {
  try {
    let playerChoice = prompt(
      `Enter rock, paper or scissors. Or exit to quit.`
    );

    while (![...CHOICES, "exit"].includes(playerChoice.toLowerCase())) {
      playerChoice = prompt(
        `Invalid choice. Enter rock, paper or scissors. Or exit to quit.`
      );
    }

    return playerChoice.toLowerCase();
  } catch (_) {
    // hitting cancel yields a TypeError,
    // so instead of showing it,
    // return "exit" to quit the game
    return "exit";
  }
}

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function capitalize(word) {
  if (!word || typeof word !== "string") {
    return "";
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function playRound(playerChoice, computerChoice) {
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
      return `You Won! ${capitalize(playerChoice)} beats ${capitalize(
        computerChoice
      )}.`;
    } else {
      // computer won
      return `You Lose! ${capitalize(computerChoice)} beats ${capitalize(
        playerChoice
      )}.`;
    }
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();

    // if the user entered "exit" or hit the cancel button, exit the loop
    if (playerChoice === "exit") {
      console.log(`Thanks for playing!`);
      break;
    }

    const result = playRound(playerChoice, computerChoice);
    console.log(result);
  }
}

game();
