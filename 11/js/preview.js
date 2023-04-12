import { getElement, createElementWithClass } from './util.js';
import { onEscKeyDown, onClose, closeBigPicture } from './big-picture-controls.js';

function createCommentElement(comment) {
  const commentElement = createElementWithClass('li', 'social__comment');

  const commentAvatar = createElementWithClass('img', 'social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentText = createElementWithClass('p', 'social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);

  return commentElement;
}

function renderComments(comments, start, end) {
  const fragment = document.createDocumentFragment();
  for (let i = start; i < end; i++) {
    const commentElement = createCommentElement(comments[i]);
    fragment.appendChild(commentElement);
  }
  return fragment;
}

function updateDisplayedCommentsCount(currentCount, comments) {
  const socialCommentsCount = getElement('.social__comment-count');
  socialCommentsCount.firstChild.textContent = `${currentCount} из `;
  socialCommentsCount.lastChild.textContent = `${comments.length} комментариев`;
}

function loadMoreCommentsHandler(picture, socialComments, commentsLoader) {
  const currentCount = socialComments.children.length;
  const newCount = currentCount + 2;

  const additionalComments = renderComments(picture.comments, currentCount, Math.min(newCount, picture.comments.length));
  socialComments.appendChild(additionalComments);

  updateDisplayedCommentsCount(Math.min(newCount, picture.comments.length), picture.comments);

  if (newCount >= picture.comments.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', loadMoreCommentsHandler);
  }
}

export function openBigPicture(picture, commentsStep = 2) {
  const bigPicture = getElement('.big-picture');
  const bigPictureImg = getElement('.big-picture__img img', bigPicture);
  const socialCaption = getElement('.social__caption', bigPicture);
  const socialCommentsCount = getElement('.social__comment-count', bigPicture);
  const commentsLoader = getElement('.comments-loader', bigPicture);
  const socialComments = getElement('.social__comments', bigPicture);

  // Очистка списка комментариев перед добавлением новых
  socialComments.innerHTML = '';

  bigPictureImg.src = picture.url;
  socialCaption.textContent = picture.description;
  socialCommentsCount.firstChild.textContent = `${Math.min(commentsStep, socialComments.children.length)} из `;
  socialCommentsCount.lastChild.textContent = 'фотографии';

  if (picture.comments.length <= commentsStep) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const initialComments = renderComments(picture.comments, 0, Math.min(commentsStep, picture.comments.length));
  socialComments.appendChild(initialComments);
  updateDisplayedCommentsCount(Math.min(commentsStep, picture.comments.length), picture.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const loadMoreCommentsHandlerBound = () => loadMoreCommentsHandler(picture, socialComments, commentsLoader);

  const bigPictureCloseButton = getElement('.big-picture__cancel', bigPicture);

  const escKeyDownHandler = (evt) => {
    onEscKeyDown(evt, () => {
      closeBigPicture(bigPicture, onClose, escKeyDownHandler, loadMoreCommentsHandlerBound);
    });
  };

  bigPictureCloseButton.addEventListener('click', () => {
    closeBigPicture(bigPicture, onClose, escKeyDownHandler, loadMoreCommentsHandlerBound);
  });

  document.addEventListener('keydown', escKeyDownHandler);

  commentsLoader.addEventListener('click', loadMoreCommentsHandlerBound);
}

