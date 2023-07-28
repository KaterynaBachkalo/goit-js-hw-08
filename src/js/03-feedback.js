import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onForm, 1000));
form.addEventListener('submit', onSubmit);

const TEXT_KEY = 'feedback-form-state';
let text = {};
saveData();

function onForm(e) {
  text[e.target.name] = e.target.value;
  localStorage.setItem(TEXT_KEY, JSON.stringify(text));
}

function onSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(TEXT_KEY);
  console.log(text);
}

function saveData() {
  const savedText = localStorage.getItem(TEXT_KEY);
  const parsedText = JSON.parse(savedText);
  if (savedText) {
    form.email.value = parsedText.email;
    form.message.value = parsedText.message;
    text['email'] = parsedText.email;
    text['message'] = parsedText.message;
  }
}
