let timeLeft;
let timerId = null;
let isWorkTime = true;
let isRunning = false;
let currentMinutes = 25;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const workButton = document.getElementById('work-mode');
const restButton = document.getElementById('rest-mode');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    document.title = `${timeString} - Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function setWorkMode() {
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay();
    workButton.classList.add('active');
    restButton.classList.remove('active');
}

function setRestMode() {
    isWorkTime = false;
    timeLeft = BREAK_TIME;
    modeText.textContent = 'Break Time';
    updateDisplay();
    restButton.classList.add('active');
    workButton.classList.remove('active');
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    setWorkMode();
    currentMinutes = 25;
    minutesDisplay.textContent = String(currentMinutes).padStart(2, '0');
    timeLeft = currentMinutes * 60;
    updateDisplay();
}

function reset() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = currentMinutes * 60;
    updateDisplay();
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', setWorkMode);
restButton.addEventListener('click', setRestMode);
increaseBtn.addEventListener('click', () => {
    if (!isRunning) {  // Only allow changes when timer is not running
        currentMinutes++;
        minutesDisplay.textContent = String(currentMinutes).padStart(2, '0');
        timeLeft = currentMinutes * 60;
    }
});
decreaseBtn.addEventListener('click', () => {
    if (!isRunning && currentMinutes > 1) {  // Prevent going below 1 minute
        currentMinutes--;
        minutesDisplay.textContent = String(currentMinutes).padStart(2, '0');
        timeLeft = currentMinutes * 60;
    }
});

// Initialize the display
resetTimer(); 