import { getElement } from './util.js';
import { onEscKeyDown, onClose, closeBigPicture } from './big-picture-controls.js';

const COMMENTS_STEP = 5;

function renderComments(comments, fromIndex, count) {
  const fragment = document.createDocumentFragment();

  for (let i = fromIndex; i < fromIndex + count && i < comments.length; i++) {
    const comment = comments[i];
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
    fragment.appendChild(listItem);
  }

  return fragment;
}

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

  let displayedCommentsCount = 0;

  function updateDisplayedCommentsCount() {
    const newCount = Math.min(displayedCommentsCount + COMMENTS_STEP, picture.comments.length);
    socialCommentCount.textContent = `${newCount} из ${picture.comments.length} комментариев`;
    return newCount;
  }

  function loadMoreCommentsHandler() {
    const newCount = updateDisplayedCommentsCount();
    const newComments = renderComments(picture.comments, displayedCommentsCount, newCount - displayedCommentsCount);
    socialComments.appendChild(newComments);
    displayedCommentsCount = newCount;

    if (displayedCommentsCount >= picture.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  displayedCommentsCount = updateDisplayedCommentsCount();
  socialComments.appendChild(renderComments(picture.comments, 0, displayedCommentsCount));
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.body.classList.add('modal-open');

  bigPictureCloseButton.addEventListener('click', () => {
    closeBigPicture(bigPicture, onClose, onEscKeyDown);
    commentsLoader.removeEventListener('click', loadMoreCommentsHandler);
  });

  document.addEventListener('keydown', (evt) => {
    onEscKeyDown(evt, () => {
      closeBigPicture(bigPicture, onClose, onEscKeyDown);
      commentsLoader.removeEventListener('click', loadMoreCommentsHandler);
    });
  });

  // Обновление обработчика для кнопки "Загрузить ещё"
  commentsLoader.addEventListener('click', loadMoreCommentsHandler);
};

