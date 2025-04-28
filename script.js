const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const breakButton = document.querySelector('#break');
const pomodoroButton = document.querySelector('#pomodoro');
const timer = document.querySelector('#pomodoro-time');
let minutes = 25;
let seconds = 0;
let isPaused = true;
let startTimer;

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

      if (minutes == 0 && seconds == 0) {
        toggle(25, 0);
        startButton.textContent = "start";
      }

      return startTimer;
    }, 10);

    startButton.textContent = "stop";
  }

  isPaused = !isPaused;
}

startButton.addEventListener('click', function () {
  switchingTimer();
});

breakButton.addEventListener('click', function () {
  toggle(5, 0);
});

pomodoroButton.addEventListener('click', function () {
  toggle(25, 0);
});

resetButton.addEventListener('click', function () {
  toggle(25, 0);
});