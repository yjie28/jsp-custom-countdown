const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// Set Date Input Min with Today's Date - so only future date can be selected
// returns 2020-10-28T03:14:53.329Z; split at T, and we only want the first part of the array, which is the date.
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown / complete UI
const updateDOM = () => {
  const now = new Date().getTime();
  const distance = countdownValue - now;
  console.log(distance);
};

// Take values from Form Input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value; // title input value
  countdownDate = e.srcElement[1].value; // date input value
  console.log(countdownDate, countdownTitle);
  updateDOM();
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
