import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  TIMER_DELAY: 1000,
  timerId: 0,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    isValidDate(selectedDates[0].getTime());
  },
};

refs.startBtn.disabled = true;

flatpickr('#datetime-picker', options);

function isValidDate(time) {
  if (time < new Date().getTime())
    return Notify.failure('Please choose a date in the future');

  if (!refs.timerId) refs.startBtn.disabled = false;

  refs.startBtn.addEventListener('click', { handleEvent: timer, time: time });
}

function timer() {
  refs.startBtn.disabled = true;

  refs.timerId = setInterval(() => {
    const ms = this.time - new Date().getTime();
    const convertTime = convertMs(ms);
    const { days, hours, minutes, seconds } = addLeadingZero(convertTime);

    if (ms < refs.TIMER_DELAY) {
      clearInterval(refs.timerId);
      Notify.success('Сompleted');
    }

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, refs.TIMER_DELAY);
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

function addLeadingZero(value) {
  let result = {};

  for (key in value) {
    result[key] = value[key].toString().padStart(2, '0');
  }
  return result;
}
