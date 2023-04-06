import { generatePhotos } from './data.js';
import { openBigPicture, renderPictures } from './preview.js';
import { getAllElements } from './util.js';

const photos = generatePhotos();


renderPictures(photos);

const picturesContainer = document.querySelector('.pictures');
const pictureElements = getAllElements('.picture', picturesContainer);

pictureElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    openBigPicture(photos[index]);
  });
});
