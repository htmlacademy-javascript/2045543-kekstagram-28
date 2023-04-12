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
      fetch('https://28.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
      })
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
