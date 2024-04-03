function generateHexCode() {
  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
      hexCode += hexDigits[Math.floor(Math.random() * hexDigits.length)];
  }
  return hexCode;
}

function checkCodes(hex, guess) {
  let rgbPercentages = [0, 0, 0];
  hex = hex.substring(1);
  let percentage = 0;
  for (let i = 0; i < 6; i += 2) {
      const hexDigit = parseInt(hex.substr(i, 2), 16);
      const guessDigit = parseInt(guess.substr(i, 2), 16);
      const difference = Math.abs(hexDigit - guessDigit);
      rgbPercentages[i / 2] = (100 - (difference / 2.55)).toFixed(1).replace(/\.?0+$/, '').toString();
      percentage += 100 - (difference / 2.55);
  }
  return [(percentage / 3).toFixed(2).replace(/\.?0+$/, '').toString(), rgbPercentages];
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

function clearValues() {
  guessInput.value = '';
  percentageText.innerHTML = '--';
  rColor.innerHTML = '--';
  gColor.innerHTML = '--';
  bColor.innerHTML = '--';
  colorToGuessText.innerHTML = '';
  colorToGuessName.innerHTML = '';
  colorToCheckText.innerHTML = '';
  colorToCheckName.innerHTML = '';
  colorToCheckElement.style.backgroundColor = '#000';
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
        console.log(`The color name for hex code #${hex} is: ${colorName}`);
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

export { generateHexCode, checkCodes, updateColor, getContrast, clearValues, getColorName };