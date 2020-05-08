let state = {
  session: 1500,
  break: 300,
  sessionLeft: 1500,
  breakLeft: 300,
  currentPeriod: 'Session',
  timer: false,
}

const decrementEl = document.querySelectorAll('.decrement i');
const incrementEl = document.querySelectorAll('.increment i');
const sessionDisplayEl = document.querySelector('.session-display');
const breakDisplayEl = document.querySelector('.break-display');
const currentPeriodEl = document.querySelector('.main-display .current-period');
const timeRemainingEl = document.querySelector('.main-display .time-remaining');
const playEl = document.querySelector('.play-button i');
const pauseEl = document.querySelector('.pause-button i');
const stopEl = document.querySelector('.stop-button i');
const resetEl = document.querySelector('.reset-button i');
let startClock;

sessionDisplayEl.textContent = secondsToMinutes(state.session);
breakDisplayEl.textContent = secondsToMinutes(state.break);
currentPeriodEl.textContent = state.currentPeriod;
timeRemainingEl.textContent = secondsToMinutesSeconds(state.sessionLeft);


[...decrementEl].forEach((el) => {
  el.addEventListener('click', decrement);
});
[...incrementEl].forEach((el) => {
  el.addEventListener('click', increment);
});
playEl.addEventListener('click', play);
pauseEl.addEventListener('click', pause);
stopEl.addEventListener('click', stop);
resetEl.addEventListener('click', reset);



function secondsToMinutes(time) {
  let minutes = Math.floor(time / 60);
  return minutes;
}

function secondsToMinutesSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return `${minutes} : ${seconds}`;
}

function play() {
  if (state.timer === false) {
    startClock = setInterval(tick , 100);
    state.timer = true;
  }

  function tick() {
    if (state.currentPeriod === 'Session') {
      timeRemainingEl.textContent = secondsToMinutesSeconds(state.sessionLeft);
      currentPeriodEl.textContent = 'Session';
      if (state.sessionLeft === 0) {
        state.currentPeriod = 'Break';
        state.sessionLeft = state.session;
      }
      state.sessionLeft = state.sessionLeft - 1;
    } else {
      timeRemainingEl.textContent = secondsToMinutesSeconds(state.breakLeft);
      currentPeriodEl.textContent = 'Break';
      if (state.breakLeft === 0) {
        state.currentPeriod = 'Session';
        state.breakLeft = state.break;
      }
      state.breakLeft = state.breakLeft - 1;
    } 
  }
}

function pause() {
  clearInterval(startClock);
  state.timer = false;
}

function stop() {
  clearInterval(startClock);
  state.timer = false;
  state.sessionLeft = state.session;
  state.breakLeft = state.break;
  timeRemainingEl.textContent = secondsToMinutesSeconds(state[state.currentPeriod.toLowerCase()]);
}

function reset() {
  clearInterval(startClock);
  state = {
    session: 1500,
    break: 300,
    sessionLeft: 1500,
    breakLeft: 300,
    currentPeriod: 'Session',
    timer: false,
  }
  timeRemainingEl.textContent = secondsToMinutesSeconds(state.session);
  currentPeriodEl.textContent = state.currentPeriod;
}

function increment(event) {
  const period = event.target.parentNode.parentNode.id;
  state[period] = state[period] + 60;
  state[`${period}Left`] = state[period];
  document.querySelector(`.${period}-display`).textContent = secondsToMinutes(state[period]);
  if (period === state.currentPeriod.toLowerCase) {
    timeRemainingEl.textContent = state[period];
  }
}

function decrement(event) {
  const period = event.target.parentNode.parentNode.id;
  if (state[period] > 0) {
    state[period] = state[period] - 60;
    state[`${period}Left`] = state[period];
  }
  document.querySelector(`.${period}-display`).textContent = secondsToMinutes(state[period]);
  if (period === state.currentPeriod.toLowerCase) {
    timeRemainingEl.textContent = state[period];
  }
}