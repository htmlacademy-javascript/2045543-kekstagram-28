import { generatePhotos } from './data.js';
import { renderPhotos } from './render-photos.js';
import { handlePhotoClick } from './photo-click-handler.js';
import { initUploadForm } from './upload-form.js';

const photos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');

renderPhotos(picturesContainer, photos);
handlePhotoClick(picturesContainer, photos);
initUploadForm();
