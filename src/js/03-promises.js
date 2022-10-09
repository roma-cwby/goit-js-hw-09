import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector(`[name="delay"]`),
  step: document.querySelector(`[name="step"]`),
  amount: document.querySelector(`[name="amount"]`),
  submit: document.querySelector(`[type="submit"]`),
};

refs.submit.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let currentDelay = Number(refs.delay.value);

  for (let i = 0; i < Number(refs.amount.value); i++) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += Number(refs.step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
