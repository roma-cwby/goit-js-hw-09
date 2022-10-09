const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
  INTERVAL_DELAY: 1000,
  intervalId: null,
};

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  refs.intervalId = setInterval(() => {
    refs.body.style = `background-color: ${getRandomHexColor()}`;
  }, refs.INTERVAL_DELAY);
}

function onStop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(refs.intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
