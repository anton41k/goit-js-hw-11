const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];
const ref = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
};
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let intervalId = null;

function start() {
    ref.startBtn.disabled = 1;
    intervalId = setInterval(() => {
        const randomIndex = randomIntegerFromInterval(0, colors.length - 1);
        setColorBody(randomIndex);
    }, 1000);
}

function stop() {
    clearInterval(intervalId);
    ref.startBtn.disabled = 0;
}

ref.startBtn.addEventListener('click', start);
ref.stopBtn.addEventListener('click', stop);

function setColorBody(index) {
    ref.body.style.backgroundColor = colors[index];
    console.log(colors[index])
};