import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selectors = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

let timeLeft = 0;
const addLeadingZero = value => value.toString().padStart(2, '0');

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
    onClose(selectedDates) {
        const todayDate = new Date();
    if(todayDate.getTime() - selectedDates[0].getTime() >= 0) {
        alert('Please choose a date in the future');        
        return;
    } else {
        selectors.startButton.disabled = false;
        timeLeft = selectedDates[0].getTime() - todayDate.getTime();
        selectors.days.textContent = addLeadingZero(convertMs(timeLeft).days);
        selectors.hours.textContent = addLeadingZero(convertMs(timeLeft).hours);
        selectors.minutes.textContent = addLeadingZero(convertMs(timeLeft).minutes);
        selectors.seconds.textContent = addLeadingZero(convertMs(timeLeft).seconds);        
        }        
},
};

selectors.startButton.disabled = true;
flatpickr("#datetime-picker", options);
selectors.startButton.addEventListener('click', startButtonHandler);

function startButtonHandler() { 
    selectors.startButton.disabled = true;
    const timerId = setInterval(() => {
        if (timeLeft < 1000) {
            clearInterval(timerId);
        } else {
            timeLeft -= 1000;
            selectors.days.textContent = addLeadingZero(convertMs(timeLeft).days);
            selectors.hours.textContent = addLeadingZero(convertMs(timeLeft).hours);
            selectors.minutes.textContent = addLeadingZero(convertMs(timeLeft).minutes);
            selectors.seconds.textContent = addLeadingZero(convertMs(timeLeft).seconds); 
         }
        
        
    }, 1000);        
}

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}
