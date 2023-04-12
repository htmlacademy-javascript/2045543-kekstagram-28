import { renderPhotos } from './render-photos.js';
import { handlePhotoClick } from './photo-click-handler.js';
import { initUploadForm } from './upload-form.js';
import { fetchData } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const picturesContainer = document.querySelector('.pictures');

  fetchData()
    .then((photos) => {
      renderPhotos(picturesContainer, photos);
      handlePhotoClick(picturesContainer, photos);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Ошибка:', error);
      // Обработка ошибок, например, можно показать сообщение об ошибке
    });

  initUploadForm();
});
document.addEventListener('DOMContentLoaded', () => {
  console.log('noUiSlider:', typeof noUiSlider);
  console.log('Pristine:', typeof Pristine);
});
