import { getElement } from './util.js';
import { onEscKeyDown, onClose, closeBigPicture } from './big-picture-controls.js';

export const openBigPicture = (picture) => {
  const bigPicture = getElement('.big-picture');
  const bigPictureImage = getElement('.big-picture__img img', bigPicture);
  const likesCount = getElement('.likes-count', bigPicture);
  const commentsCount = getElement('.comments-count', bigPicture);
  const socialComments = getElement('.social__comments', bigPicture);
  const socialCaption = getElement('.social__caption', bigPicture);
  const socialCommentCount = getElement('.social__comment-count', bigPicture);
  const commentsLoader = getElement('.comments-loader', bigPicture);
  const bigPictureCloseButton = getElement('.big-picture__cancel', bigPicture);

  bigPicture.classList.remove('hidden');
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  socialComments.innerHTML = '';

  picture.comments.forEach((comment) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    imgElement.width = 35;
    imgElement.height = 35;

    const pElement = document.createElement('p');
    pElement.classList.add('social__text');
    pElement.textContent = comment.message;

    listItem.appendChild(imgElement);
    listItem.appendChild(pElement);
    socialComments.appendChild(listItem);
  });

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');

  bigPictureCloseButton.addEventListener('click', () => closeBigPicture(bigPicture, onClose, onEscKeyDown));
  document.addEventListener('keydown', (evt) => onEscKeyDown(evt, () => closeBigPicture(bigPicture, onClose, onEscKeyDown)));
};
