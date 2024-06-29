import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selectors = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  startButton: document.querySelector('[type="submit"]')
}

selectors.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) { 
  event.preventDefault();
  selectors.startButton.disabled = true;
  let delay = Number(selectors.delay.value);
  let step = Number(selectors.step.value);
  let amount = Number(selectors.amount.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        iziToast.success({
          position: 'topCenter',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          position: 'topCenter',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      })
      .finally(() => {
        if (i === amount) {
          selectors.startButton.disabled = false;
        }
      });
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
  return promise;
}
