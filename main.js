const dice = document.getElementById('dice');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let intervalId = null;

const sanitizeValue = (input) => {
  let value = input.value.replace(/\D/g, '');
  if (value === '') {
    input.value = '';
    return;
  }
  if (value.length > 1 && value.startsWith('0')) {
    value = value.replace(/^0+/, '');
    if (value === '') value = '0';
  }
  const numValue = parseInt(value, 10);
  const MAX_LIMIT = 999999;
  if (numValue > MAX_LIMIT) {
    value = MAX_LIMIT.toString();
  }
  input.value = value;
};

const parseValue = (input) => {
  const value = parseInt(input.value);
  return isNaN(value) ? 0 : value;
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const stopGenerator = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const getRangeAndCheckFixed = () => {
  const valFrom = parseValue(fromInput);
  const valTo = parseValue(toInput);
  if (fromInput.value === '' || toInput.value === '') {
    return { status: 'empty', min: 0 };
  }
  let min = valFrom;
  let max = valTo;
  if (valFrom > valTo) {
    min = valTo;
    max = valFrom;
  }
  if (min === max) {
    return { status: 'fixed', value: min };
  }
  return { status: 'running', min, max };
};

const triggerPulse = (element) => {
  element.classList.add('transition-pulse');
  setTimeout(() => { element.classList.remove('transition-pulse') }, 360);
};

const handleStart = () => {
  const range = getRangeAndCheckFixed();
  stopGenerator();
  if (range.status === 'empty') {
    display.textContent = '0';
    return;
  }
  if (range.status === 'fixed') {
    display.textContent = range.value.toString();
    return;
  }
  if (range.status === 'running') {
    intervalId = setInterval(() => {
      display.textContent = randomInt(range.min, range.max);
    }, 125);
  }
};

const handleStop = () => {
  stopGenerator();
  triggerPulse(display);
}

const handleInput = (e) => {
  sanitizeValue(e.target);
  stopGenerator();
  const valFromText = fromInput.value;
  const valToText = toInput.value;
  const valFrom = parseValue(fromInput);
  const valTo = parseValue(toInput);
  let newDisplayValue = '0';
  if (valFromText === '' && valToText === '') {
    newDisplayValue = '0';
  } else if (valFromText !== '' && valToText === '') {
    newDisplayValue = valFrom.toString();
  } else if (valFromText === '' && valToText !== '') {
    newDisplayValue = valTo.toString();
  } else {
    const maxVal = Math.max(valFrom, valTo);
    newDisplayValue = maxVal.toString();
  }
  display.textContent = newDisplayValue;
};

const setupEventListeners = () => {
  startButton.addEventListener('click', handleStart);
  stopButton.addEventListener('click', handleStop);
  fromInput.addEventListener('input', handleInput);
  toInput.addEventListener('input', handleInput);
};

function setupDiceInteraction() {
  dice.addEventListener('mouseover', () => { triggerPulse(display) });
  dice.addEventListener('click', () => { triggerPulse(display) });
}

const init = () => {
  setupEventListeners();
  setupDiceInteraction();
  triggerPulse(display);
};

document.addEventListener('DOMContentLoaded', init);
