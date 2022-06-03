import { fetchImgsData } from './fetchRequest';
import Notiflix from 'notiflix';
import createGalleryCard from '../templates/galleryCard.hbs';

const searchFormEl = document.querySelector('.search-form');
const galleryWrapperEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more');

let page = 1;

searchFormEl.addEventListener('submit', async event => {
  page = 1;
  event.preventDefault();
  const requestValue = event.currentTarget.searchQuery.value;

  try {
    const response = await fetchImgsData(requestValue, page);
    const imgArr = response.hits;

    imgArr.forEach(img => {
      galleryWrapperEl.insertAdjacentHTML('beforeend', createGalleryCard(img));
    });

    if (imgArr.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error.message);
  }
});

btnEl.addEventListener('click', async event => {
  const requestValue = searchFormEl.searchQuery.value;
  page += 1;
  try {
    const response = await fetchImgsData(requestValue, page);
    const imgArr = response.hits;

    imgArr.forEach(img => {
      galleryWrapperEl.insertAdjacentHTML('beforeend', createGalleryCard(img));
    });
  } catch (error) {
    console.log(error.message);
  }
});
