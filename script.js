const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const breakButton = document.querySelector('#break');
const pomodoroButton = document.querySelector('#pomodoro');
const timer = document.querySelector('#pomodoro-time');
let minutes = 25;
let seconds = 0;
let isPaused = true;
let startTimer;
let mode = "pomodoro";

function format(value) {
  if (value < 10) {
    return '0' + value;
  } else {
    return value;
  }
}

function toggle(minutes, seconds) {
  clearInterval(startTimer);
  timer.textContent = `${format(minutes)}:${format(seconds)}`;
}

function switchingTimer() {
  if (!isPaused) {
    clearInterval(startTimer);
    startButton.textContent = "start";
  } else {
    startTimer = setInterval(() => {

      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      }

      if (seconds >= 0 && minutes >= 0) {
        timer.textContent = `${format(minutes)}:${format(seconds)}`;
      }

      if (minutes == 0 && seconds == 0 && mode == "pomodoro") {
        toggle(25, 0);
        startButton.textContent = "start";
      }

      if (minutes == 0 && seconds == 0 && mode == "break") {
        toggle(5, 0);
        startButton.textContent = "start";
      }
    }, 10);

    startButton.textContent = "stop";
  }

  isPaused = !isPaused;
}

startButton.addEventListener('click', switchingTimer);

breakButton.addEventListener('click', function () {
  mode = "break";
  isPaused = true;
  clearInterval(startTimer);
  minutes = 5;
  seconds = 0;
  timer.textContent = `${format(minutes)}:${format(seconds)}`;
  breakButton.classList.add('active');
  pomodoroButton.classList.remove('active');
});

pomodoroButton.addEventListener('click', function () {
  mode = "pomodoro";
  isPaused != true;
  toggle(25, 0);
  breakButton.classList.remove('active');
  pomodoroButton.classList.add('active');
});

resetButton.addEventListener('click', function () {
  startButton.textContent = "start";
  isPaused = false;

  if (mode == "pomodoro") {
    toggle(25, 0);
  } else {
    toggle(5, 0);
  }
});