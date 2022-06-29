/*
GAME FUNCTIONS:
- Player must guess a number between a min and max
- Player gets a certains amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// GAME VALUES
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI ELEMENTS
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

// ASSIGN UI MIN AND MAX
minNum.textContent = min;
maxNum.textContent = max;

// PLAY AGAIN EVENT LISTENER
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// LISTEN FOR GUESS
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // VALIDATE
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // CHECK IF WON
  if (guess === winningNum) {
    // GAME OVER - WON
    gameOver(true, `${winningNum} is correct, YOU WIN!`, "green");
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // GAME OVER - LOST
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // GAME CONTINIUES - ANSWER WRONG
      guessInput.style.borderColor = "red";
      // Clear input
      guessInput.value = "";
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, "red");
    }
  }
});

// GAME OVER
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : "red";

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // PLAY AGAIN
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// SET MESSAGE
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// RANDOMIZE WINNING NUMBER
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
