import { getElement } from './util.js';
import { openBigPicture } from './preview.js';

export function createPhotoThumbnail(photo, commentsStep = 2) {
  const template = getElement('#picture').content;
  const photoElement = template.cloneNode(true);

  const imgElement = getElement('.picture__img', photoElement);
  imgElement.src = photo.url;

  const likesElement = getElement('.picture__likes', photoElement);
  likesElement.textContent = photo.likes;

  const commentsElement = getElement('.picture__comments', photoElement);
  commentsElement.textContent = photo.comments.length;

  photoElement.querySelector('.picture').addEventListener('click', () => {
    openBigPicture(photo, commentsStep);
  });

  return photoElement;
}
