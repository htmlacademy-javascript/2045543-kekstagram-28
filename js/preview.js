import { getElement, getAllElements } from './util.js';

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

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeBigPicture();
    }
  };

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKeyDown);
};

export function renderPictures(photos) {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });

  container.appendChild(fragment);
}
