let colorToGuessElement = document.querySelector('.color-to-guess');
let colorToGuessText = document.querySelector('.color-to-guess-code');
let colorToGuessName = document.querySelector('.color-to-guess-name');

let colorToCheckElement = document.querySelector('.color-to-check');
let colorToCheckText = document.querySelector('.color-to-check-code');
let colorToCheckName = document.querySelector('.color-to-check-name');

let anotherColorButton = document.querySelector('.try-another-color');
let retryButton = document.querySelector('.retry');
let seeCodeButton = document.querySelector('.see-code');

let guessInput = document.querySelector('.guess-input');
let guessButton = document.querySelector('.guess-button');

let percentageText = document.querySelector('.percentage-text');
let rColor = document.querySelector('.r-color');
let gColor = document.querySelector('.g-color');
let bColor = document.querySelector('.b-color');

let rSymbol = document.querySelector('.r-symbol');
let gSymbol = document.querySelector('.g-symbol');
let bSymbol = document.querySelector('.b-symbol');

let message = document.querySelector('.message');

let colorToGuess;

guessInput.addEventListener('keyup', function() {
  this.value = this.value.toUpperCase();
});

function generateHexCode() {
  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
      hexCode += hexDigits[Math.floor(Math.random() * hexDigits.length)];
  }
  return hexCode;
}

function checkCodes(hex, guess) {
  let chevronSymbols = ["", "", ""];
  let rgbPercentages = [0, 0, 0];
  hex = hex.substring(1);
  let percentage = 0;
  for (let i = 0; i < 6; i += 2) {
    const hexDigit = parseInt(hex.substr(i, 2), 16);
    const guessDigit = parseInt(guess.substr(i, 2), 16);

    const difference = Math.abs(hexDigit - guessDigit);
    rgbPercentages[i / 2] = (100 - (difference / 2.55)).toFixed(0).toString();
    percentage += 100 - (difference / 2.55);
  }
  return [(percentage / 3).toFixed(1).replace(/\.?0+$/, '').toString(), rgbPercentages, chevronSymbols];
}

function updateColor() {
  let colorToGuess = generateHexCode();
  colorToGuessElement.style.backgroundColor = colorToGuess;
  colorToGuessText.style.color = getContrast(colorToGuess);
  return colorToGuess;
}

function getContrast(color) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#222' : '#eee';
}

guessInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    guessButton.click();
  }
});

guessInput.addEventListener('input', function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;

  this.value = this.value.replace(/[^0-9A-Fa-f]/g, '');
  this.setSelectionRange(start, end);
});

guessButton.addEventListener('click', function() {
  let guess = guessInput.value;
  if (guess.length == 3) {
    guess = guess[0] + guess[0] + guess[1] + guess[1] + guess[2] + guess[2];
  }

  if (guess.length == 6) {
    colorToCheckElement.style.backgroundColor = '#' + guess;
    let [percentage, rgbPercentages, symbols] = checkCodes(colorToGuess, guess);

    rColor.innerHTML = rgbPercentages[0] + "%";
    gColor.innerHTML = rgbPercentages[1] + "%";
    bColor.innerHTML = rgbPercentages[2] + "%";

    colorToCheckText.innerHTML = '#' + guess;
    colorToCheckText.style.color = getContrast('#' + guess);
    getColorName(guess, 2);
    message.innerHTML = getMessage(percentage);
  }
  guessInput.value = '';
});

seeCodeButton.addEventListener('click', function() {
  colorToGuessText.innerHTML = colorToGuess;
  getColorName(colorToGuess.substring(1), 1);
});

retryButton.addEventListener('click', function() {
  clearValues();
});

anotherColorButton.addEventListener('click', function() {
  colorToGuess = updateColor();
  clearValues();
});

function getMessage(percentage) {
  if (percentage == "100") {
    return "Well done! You guessed the color!";
  } else if (percentage >= "95") {
    return "C'mon! Just fix some details!";
  } else if (percentage >= "90") {
    return "Almost there!";
  } else if (percentage >= "80") {
    return "You're close!";
  } else if (percentage >= "70") {
    return "Keep trying!";
  } else if (percentage >= "60") {
    return "You can do better!";
  } else if (percentage >= "40") {
    return "You're far!";
  } else if (percentage >= "20") {
    return "You're very far!";
  } else return "I guessed colors are not your thing...";
}

function clearValues() {
  guessInput.value = '';
  rColor.innerHTML = '?';
  gColor.innerHTML = '?';
  bColor.innerHTML = '?';
  colorToGuessText.innerHTML = '';
  colorToGuessName.innerHTML = '';
  colorToCheckText.innerHTML = '';
  colorToCheckName.innerHTML = '';
  colorToCheckElement.style.backgroundColor = '';
  message.innerHTML = 'Guess the hexadecimal code!';
}

// Color name
function getColorName(hex, option) {
  const apiUrl = `https://www.thecolorapi.com/id?hex=${hex}`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Check if the data contains the necessary properties
      if (data && data.name && data.name.value) {
        let colorName = data.name.value;
        switch (option) {
          case 1:
            colorToGuessName.innerHTML = colorName;
            colorToGuessName.style.color = getContrast('#' + hex);
            break;
          case 2:
            colorToCheckName.innerHTML = colorName;
            colorToCheckName.style.color = getContrast('#' + hex);
            break;
          default:
            break;
        }
      } else {
        console.error('Error: Unable to retrieve color name from API response.');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  colorToGuess = updateColor();
  clearValues();
});
