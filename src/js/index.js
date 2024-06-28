// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');
const errorElements = document.querySelectorAll('.error');
const inputsElements = document.querySelectorAll('input[type=text]');

const defaultValues = {
  name: 'JANE APPLESSED',
  number: '0000 0000 0000 0000',
  month: '00',
  year: '00',
  cvc: '000'
};

const printError = index => {
  errorElements[index].textContent = 'VACÍO';
};

const hideError = index => {
  errorElements[index].textContent = '';
};

const checkForm = () => {
  inputsElements.forEach((input, index) => {
    if (input.value === '') {
      index > 2 ? printError(index - 1) : printError(index);
    } else hideError(index);
  });
};

const validateName = event => {
  const onlyNumbers = '0123456789';
  const value = event.target.value;
  let isCorrect = true;

  for (const letter of value) {
    if (onlyNumbers.includes(letter)) {
      isCorrect = false;
    }
  }
  return isCorrect;
};

const validateNumber = event => {
  const onlyNumbers = '0123456789';
  const value = event.target.value;
  let isCorrect = true;

  for (const letter of value) {
    if (!onlyNumbers.includes(letter)) {
      isCorrect = false;
    }
  }
  return isCorrect;
};

const validateMonth = event => {
  const isValidContent = validateName(event);
  if (isValidContent) {
    return event.target.value.length > 2;
  }

  return false;
};

const writeInCard = event => {
  const textCard = document.getElementById(`card-${event.target.id}`);
  let isCorrectName;
  let isCorrectNumber;
  let isCorrectMonth;
  if (event.target.id === 'name') {
    isCorrectName = validateName(event);
  } else if (event.target.id === 'number') {
    isCorrectNumber = validateNumber(event);
  } else if (event.target.id === 'month') {
    isCorrectMonth = validateMonth(event);
  }

  if (!isCorrectName && !isCorrectNumber && !isCorrectMonth) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }

  if (event.target.value === '') {
    textCard.children[0].textContent = defaultValues[event.target.id];
  } else {
    textCard.children[0].textContent = event.target.value;
  }
};

formElement.addEventListener('input', writeInCard);

formElement.addEventListener('submit', event => {
  event.preventDefault();
  checkForm();
});
