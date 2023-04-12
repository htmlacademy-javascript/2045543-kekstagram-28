import { renderPhotos } from './render-photos.js';
import { handlePhotoClick } from './photo-click-handler.js';
import { initUploadForm } from './upload-form.js';
import { fetchData } from './api.js';

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
