let colorToGuessElement = document.querySelector('.color-to-guess');
let colorToGuessText = document.querySelector('.color-to-guess-code');

let colorToCheckElement = document.querySelector('.color-to-check');

let anotherColorButton = document.querySelector('.try-another-color');
let retryButton = document.querySelector('.retry');
let seeCodeButton = document.querySelector('.see-code');

let guessInput = document.querySelector('.guess-input');
let guessButton = document.querySelector('.guess-button');

let percentageText = document.querySelector('.percentage-text');

let colorToGuess;

function generateHexCode() {
  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
      hexCode += hexDigits[Math.floor(Math.random() * hexDigits.length)];
  }
  return hexCode;
}

function checkCodes(hex, guess) {
  hex = hex.substring(1);
  let percentage = 0;
  for (let i = 0; i < 6; i += 2) {
      const hexDigit = parseInt(hex.substr(i, 2), 16);
      const guessDigit = parseInt(guess.substr(i, 2), 16);
      const difference = Math.abs(hexDigit - guessDigit);
      percentage += 100 - (difference / 2.55);
  }
  return Math.floor(percentage / 3).toString();
}

function updateColor() {
  let colorToGuess = generateHexCode();
  colorToGuessElement.style.backgroundColor = colorToGuess;
  return colorToGuess;
}

guessInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    guessButton.click();
  }
});

guessButton.addEventListener('click', function() {
  let guess = guessInput.value;
  if (guess.length == 6) {
    colorToCheckElement.style.backgroundColor = '#' + guess;
    let percentage = checkCodes(colorToGuess, guess);
    percentageText.innerHTML = percentage;
  }
});

// Este no funciona aun
seeCodeButton.addEventListener('click', function() {
  colorToGuessText.innerHTML = colorToGuess;
});

retryButton.addEventListener('click', function() {
  clearValues();
});

anotherColorButton.addEventListener('click', function() {
  updateColor();
  clearValues();
});

function clearValues() {
  guessInput.value = '';
  percentageText.innerHTML = '??';
  colorToGuessText.innerHTML = '#??????';
  colorToCheckElement.style.backgroundColor = '#FFFFFF';
}

document.addEventListener('DOMContentLoaded', function() {
  colorToGuess = updateColor();
  clearValues();
});
