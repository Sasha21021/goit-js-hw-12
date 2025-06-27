export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-visible');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('is-visible');
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery || !images || images.length === 0) return;

  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
