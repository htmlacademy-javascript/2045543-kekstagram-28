import { createPhotoThumbnail } from './photo-thumbnail.js';

export function renderPhotos(container, photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoThumbnail = createPhotoThumbnail(photo);
    fragment.appendChild(photoThumbnail);
  });

  container.appendChild(fragment);
}

