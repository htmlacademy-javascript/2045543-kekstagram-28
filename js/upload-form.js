import { sendData } from './api.js';
import { noUiSlider } from './nouislider-wrapper.js';

export function initUploadForm() {
  const form = document.querySelector('#upload-select-image');
  const submitButton = form.querySelector('#upload-submit');
  const pristine = new Pristine(form);

  // Открытие и закрытие формы редактирования изображения
  const uploadFileInput = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const imgUploadCancelButton = document.querySelector('.img-upload__cancel');

  uploadFileInput.addEventListener('change', openUploadForm);
  imgUploadCancelButton.addEventListener('click', closeUploadForm);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Валидация формы
    const isValid = pristine.validate();

    if (isValid) {
      // Отправка формы, если она валидна
      const formData = new FormData(form);
      submitButton.disabled = true; // блокировка кнопки отправки
      sendData(formData)
        .then((response) => {
          submitButton.disabled = false; // разблокировка кнопки отправки
          if (response.ok) {
            showSuccessMessage();
            closeUploadForm();
          } else {
            showErrorMessage();
          }
        })
        .catch(() => {
          submitButton.disabled = false; // разблокировка кнопки отправки
          showErrorMessage();
        });
    } else {
      // Отображение ошибок, если форма не валидна
    }
  });

  // Создание слайдера с помощью noUiSlider
  const sliderElement = document.querySelector('.effect-level__slider');
  if (sliderElement) {
    noUiSlider.create(sliderElement, {
      start: [20],
      range: {
        'min': 0,
        'max': 100
      },
      step: 1,
      connect: 'lower'
    });
  }

  // Изменение масштаба изображения
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');

  scaleControlSmaller.addEventListener('click', () => {
    const currentValue = parseInt(scaleControlValue.value, 10);
    const newValue = Math.max(currentValue - 25, 25);
    scaleControlValue.value = `${newValue}%`;
    imgUploadPreview.style.transform = `scale(${newValue / 100})`;
  });

  scaleControlBigger.addEventListener('click', () => {
    const currentValue = parseInt(scaleControlValue.value, 10);
    const newValue = Math.min(currentValue + 25, 100);
    scaleControlValue.value = `${newValue}%`;
    imgUploadPreview.style.transform = `scale(${newValue / 100})`;
  });

  // Наложение эффекта на изображение
  const effectRadioButtons = document.querySelectorAll('.effects__radio');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const effectLevelSlider = document.querySelector('.img-upload__effect-level');
  effectRadioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      const effect = radio.value;
      imgUploadPreview.className = '';
      imgUploadPreview.classList.add(`effects__preview--${effect}`);

      if (effect === 'none') {
        effectLevelSlider.classList.add('hidden');
      } else {
        effectLevelSlider.classList.remove('hidden');
      }

      sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
        const value = unencoded[handle];
        effectLevelValue.value = value;

        switch (effect) {
          case 'chrome':
            imgUploadPreview.style.filter = `grayscale(${value / 100})`;
            break;
          case 'sepia':
            imgUploadPreview.style.filter = `sepia(${value / 100})`;
            break;
          case 'marvin':
            imgUploadPreview.style.filter = `invert(${value}%)`;
            break;
          case 'phobos':
            imgUploadPreview.style.filter = `blur(${value * 3 / 100}px)`;
            break;
          case 'heat':
            imgUploadPreview.style.filter = `brightness(${1 + (value * 2 / 100)})`;
            break;
          default:
            imgUploadPreview.style.filter = '';
        }
      });
    });
  });

  function openUploadForm() {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeUploadForm() {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFileInput.value = '';
  }
}

function createMessage(templateId) {
  const template = document.querySelector(templateId).content;
  return template.cloneNode(true);
}

function showSuccessMessage() {
  const successMessage = createMessage('#success');
  document.body.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    successMessage.remove();
  });
}

function showErrorMessage() {
  const errorMessage = createMessage('#error');
  document.body.appendChild(errorMessage);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
}

