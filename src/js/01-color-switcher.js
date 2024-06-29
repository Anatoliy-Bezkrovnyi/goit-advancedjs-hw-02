const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let colorChangeSession = null;

startButton.addEventListener('click', startButtonHandler);
stopButton.addEventListener('click', stopButtonHandler);

function startButtonHandler() { 
    colorChangeSession =  setInterval(setRandomBackgroundColor, 1000);;
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopButtonHandler() { 
    clearInterval(colorChangeSession);
    stopButton.disabled = true;
    startButton.disabled = false;
}

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function setRandomBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
 }

    
