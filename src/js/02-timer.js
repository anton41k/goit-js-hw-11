// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


class CountdownTimer{
    constructor({selector, targetDate}) {
        this.intervalID = null;
        this.selector = selector
        this.targetDate = targetDate;
        this.ref = {
            dayValue: document.querySelector(`${this.selector} span[data-days]`),
            hoursValue: document.querySelector(`${this.selector} span[data-hours]`),
            minsValue: document.querySelector(`${this.selector} span[data-minutes]`),
            secsValue: document.querySelector(`${this.selector} span[data-seconds]`),
            input: document.querySelector('#date-selector'),
            startBtn:document.querySelector('button[data-start]')
        };
        this.textInput()
    }

    textInput(ev) {
        this.ref.input.addEventListener('input', this.dataEntryProcessing.bind(this))        
    }

    dataEntryProcessing(ev) {
        const inputValue = ev.currentTarget;
        console.log(this.targetDate)
        console.log(inputValue.valueAsNumber - this.targetDate)
        if (inputValue.valueAsNumber - this.targetDate <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '"Please choose a date in the future"'
            })
        }
    }

    start() {
        this.intervalID = setInterval( () => {
            const nowTimer = new Date().getTime();
            const deltaTimer = this.targetDate - nowTimer;
            this.onSetTimer(deltaTimer);
            if (deltaTimer < 0) {
                this.stop()
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalID);
        this.onSetTimer(0);
    }

    onUpdateTimerValue({ days, hours, minutes, seconds }) {
        this.ref.dayValue.textContent = days;
        this.ref.hoursValue.textContent = hours;
        this.ref.minsValue.textContent = minutes;
        this.ref.secsValue.textContent = seconds;
    }
    
    onPad(value) {
        return String(value).padStart(2, "0")
    }

    onGetTimeComponents(ms){
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

    onSetTimer(deltaTimer) {
        const timer = this.onGetTimeComponents(deltaTimer);
        this.onUpdateTimerValue(timer);
    }
}

const timer = new CountdownTimer({
    selector: '.timer',
    targetDate: new Date("Jul 30, 2021 21:56:25").getTime()
});
