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
    return { status: 'empty' };
  }
  if (valFrom === valTo) {
    return { status: 'fixed', value: valFrom };
  }
  let min = valFrom;
  let max = valTo;
  if (valFrom > valTo) {
    min = valTo;
    max = valFrom;
  }
  return { status: 'running', min, max };
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

const handleStop = () => stopGenerator();

const handleInput = (e) => {
  sanitizeValue(e.target);
  stopGenerator();
  const range = getRangeAndCheckFixed();
  if (range.status === 'empty') {
    display.textContent = '0';
  } else if (range.status === 'fixed') {
    display.textContent = range.value.toString();
  }
};

const setupEventListeners = () => {
  startButton.addEventListener('click', handleStart);
  stopButton.addEventListener('click', handleStop);
  fromInput.addEventListener('input', handleInput);
  toInput.addEventListener('input', handleInput);
};

const init = () => {
  setupEventListeners();
  display.textContent = '0';
};

document.addEventListener('DOMContentLoaded', init);
