import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = form.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMore();

  await fetchAndRender();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRender(true);
});

async function fetchAndRender(isLoadMore = false) {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: total } = data;

    if (!isLoadMore) {
      totalHits = total;
      if (totalHits === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        hideLoader();
        return;
      }
      iziToast.success({
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
    }

    createGallery(hits);

    const loadedItems = currentPage * PER_PAGE;
    if (loadedItems < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    // Автоскрол після додавання
    if (isLoadMore) {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}
