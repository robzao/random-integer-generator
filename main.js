const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let intervalId = null;

const parseValue = (input) => {
  const value = parseInt(input.value);
  return isNaN(value) ? 0 : value;
};

const sanitizeAndOrder = () => {
  let min = parseValue(fromInput);
  let max = parseValue(toInput);
  if (min > max) {
    [min, max] = [max, min];
    fromInput.value = min;
    toInput.value = max;
  }
  if (min === max) {
    min = 0;
    fromInput.value = min;
  }
  return { min, max };
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const stopGenerator = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const handleStart = () => {
  const { min, max } = sanitizeAndOrder();
  if (intervalId) return;
  intervalId = setInterval(() => { display.textContent = randomInt(min, max) }, 125);
};

const handleStop = () => stopGenerator();

const handleInput = () => sanitizeAndOrder();

const setupEventListeners = () => {
  startButton.addEventListener('click', handleStart);
  stopButton.addEventListener('click', handleStop);
  fromInput.addEventListener('input', handleInput);
  toInput.addEventListener('input', handleInput);
};

const init = () => {
  setupEventListeners();
  display.textContent = '0';
  sanitizeAndOrder();
};

document.addEventListener('DOMContentLoaded', init);
