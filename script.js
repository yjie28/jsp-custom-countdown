const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; // date object
let countdownActive; 

const second = 1000; // 1 sec = 1000 mili sec
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

/* Set Date Input Min with Today's Date - so only future date can be selected
  returns 2020-10-28T03:14:53.329Z; split at T, and we only want the first part of the array, which is the date.
  toISOString method returns a string in simplified extended ISO format YYYY-MM-DDTHH:mm:ss.sssZ
  offset to get the *local* ISO time. 
*/
const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
const today = localISOTime.split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown / complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date(Date.now() - tzoffset).getTime();
    const distance = countdownValue - now;
    console.log(distance);
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds); 

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input 
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
  }, second);
};

// Take values from Form Input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value; // title input value
  countdownDate = e.srcElement[1].value; // date input value
  countdownValue = new Date(countdownDate).getTime();
  console.log(countdownDate, countdownTitle);
  updateDOM();
};

// Reset Countdown
const reset = () => {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false; 
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = '';
  countdownDate = '';
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);