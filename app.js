// Game Values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * (max - min + 1) + min),
  guessesLeft = 3;
console.log(winningNum);

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//PLay Again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number from ${min} and ${max}`, "red");
  }

  // Check IF WON
  if (guess === winningNum) {
    //Game over - WON
    gameOver(true, `${winningNum} is Correct,  YOU WIN!`);
  } 
  // If the input value is empty
  else if (guessInput.value === "") {
    alert("please enter a number");
  } else {
    // Wrong NUmber
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `GAME OVER,  YOU LOSS! , The correct number was ${winningNum}`
      );
    } else {
      // Game Cotinues - Wrong answer
      guessInput.value = "";
      //Change border color
      guessInput.style.borderColor = "red";
      // Tells user that this is wrong answer
      setMessage(
        `${guess} is Wrong, You have ${guessesLeft} Guesses Left`,
        "red"
      );
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  //Disable Input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play Again
  guessBtn.value = "PLAY AGAIN";
  guessBtn.className += "play-again";
}

// Get winning Number
// function getRandomNum(){
//    return Math.floor(Math.random()*(max-min+1)+min);
// }

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
