import { openBigPicture } from './preview.js';

export function handlePhotoClick(picturesContainer, photos) {
  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');

    if (target) {
      evt.preventDefault();
      const photoIndex = Array.from(picturesContainer.querySelectorAll('.picture')).indexOf(target);
      openBigPicture(photos[photoIndex]);
    }
  });
}
