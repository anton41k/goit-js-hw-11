// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


class CountdownTimer{
    constructor({selector}) {
        this.intervalID = null;
        this.selector = selector;
        this.ref = {
            dayValue: document.querySelector(`${this.selector} span[data-days]`),
            hoursValue: document.querySelector(`${this.selector} span[data-hours]`),
            minsValue: document.querySelector(`${this.selector} span[data-minutes]`),
            secsValue: document.querySelector(`${this.selector} span[data-seconds]`),
            input: document.querySelector('#date-selector'),
            startBtn:document.querySelector('button[data-start]')
        };
        this.targetDate = null;
        this.onEvent();
    }

    onEvent(ev) {
        this.ref.startBtn.disabled = 1;
        this.ref.input.addEventListener('input', this.onDataEntryProcessing.bind(this));
        this.ref.startBtn.addEventListener('click', this.start.bind(this))
    }

    onDataEntryProcessing(ev) {
        this.stop();
        const dateNow = this.onDateNow();
        const inputValue = ev.currentTarget;
        this.targetDate = inputValue.valueAsNumber;console.log(this.targetDate - dateNow)
        if (this.targetDate - dateNow < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '"Please choose a date in the future"'
            })
        }
        else {
            this.ref.startBtn.disabled = 0;
        }
    }

    onDateNow() {
        return new Date().getTime();
    }

    start() {
        this.ref.startBtn.disabled = 1;
        this.intervalID = setInterval( () => {
            const nowTimer = this.onDateNow();
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
        const days = this.onPad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.onPad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.onPad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.onPad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    onSetTimer(deltaTimer) {
        const timer = this.onGetTimeComponents(deltaTimer);
        this.onUpdateTimerValue(timer);
    }
}

const timer = new CountdownTimer({
    selector: '.timer'
});
