export const onEscKeyDown = (evt, closeCallback) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeCallback();
  }
};

export const onClose = (escKeyDownCallback) => {
  document.removeEventListener('keydown', escKeyDownCallback);
};

export const closeBigPicture = (bigPicture, closeCallback, escKeyDownCallback) => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeCallback(escKeyDownCallback);
};
