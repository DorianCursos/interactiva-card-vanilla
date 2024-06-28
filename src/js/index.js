// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');
const errorElements = document.querySelectorAll('.form__error');
const inputsElements = document.querySelectorAll('.form__input');

const numbers = '0123456789';

const defaultValues = {
  name: 'JANE APPLESSED',
  number: '0000 0000 0000 0000',
  month: '00',
  year: '00',
  cvc: '000'
};

const showErrorText = (index, error) => {
  errorElements[index].textContent = error;
};

const hideErrorText = index => {
  errorElements[index].textContent = '';
};

const setInputError = input => {
  input.classList.add('form__input--error');
};

const hideInputError = input => {
  input.classList.remove('form__input--error');
};

const checkFillForm = () => {
  inputsElements.forEach((input, index) => {
    if (input.value === '') {
      setInputError(input);
      if (index > 2) {
        showErrorText(index - 1, "Can't be blank");
      } else {
        showErrorText(index, "Can't be blank");
      }
    } else {
      hideErrorText(index);
      hideInputError(input);
    }
  });
};

const deleteLastCharacter = input => {
  input.value = input.value.substring(0, input.value.length - 1);
};
const writeInCard = (name, value) => {
  const spanText = document.getElementById(`card-${name}`);
  if (value) spanText.textContent = value;
  else spanText.textContent = defaultValues[name];
};

const validateName = value => {
  for (const letter of value) {
    if (numbers.includes(letter)) {
      return false;
    }
  }
  return true;
};

const validateNumber = value => {
  for (const number of value) {
    if (!numbers.includes(number) || value.length > 16) {
      return false;
    }
  }
  return true;
};

const validateMonth = value => {
  for (const number of value) {
    if (!numbers.includes(number) || value.length > 2 || value > 12) {
      return false;
    }
  }
  return true;
};

const validateYear = value => {
  for (const number of value) {
    if (!numbers.includes(number)) {
      return false;
    }
  }
  return true;
};

const validateCVC = value => {
  for (const number of value) {
    if (!numbers.includes(number) || value.length > 3) {
      return false;
    }
  }
  return true;
};

const validateData = event => {
  const name = event.target.name;
  const value = event.target.value;

  let isValidName;
  let isValidNumber;
  let isValidMonth;
  let isValidYear;
  let isValidCVC;

  if (name === 'name') {
    isValidName = validateName(value);
    if (isValidName) {
      writeInCard(name, value);
    } else {
      deleteLastCharacter(event.target);
    }
  } else if (name === 'number') {
    isValidNumber = validateNumber(value);
    const formatedValue = value.replace(/(.{4})/g, '$1 ');
    if (isValidNumber) {
      writeInCard(name, formatedValue);
    } else {
      deleteLastCharacter(event.target);
    }
  } else if (name === 'month') {
    isValidMonth = validateMonth(value);
    if (isValidMonth) {
      writeInCard(name, value);
    } else {
      deleteLastCharacter(event.target);
    }
  } else if (name === 'year') {
    isValidYear = validateYear(value);
    if (isValidYear) {
      writeInCard(name, value);
    } else {
      deleteLastCharacter(event.target);
    }
  } else if (name === 'cvc') {
    isValidCVC = validateCVC(value);
    if (isValidCVC) {
      writeInCard(name, value);
    } else {
      deleteLastCharacter(event.target);
    }
  }
};

formElement.addEventListener('input', validateData);

formElement.addEventListener('submit', event => {
  event.preventDefault();
  checkFillForm();
});
