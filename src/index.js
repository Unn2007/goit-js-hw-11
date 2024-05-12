import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './photo-api-service.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createCardMarkup from './markup.js';
import smoothScroll from './smooth-scroll.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  divGallery: document.querySelector('.gallery'),
  sentinel: document.querySelector('.sentinel'),
};
const instance = new SimpleLightbox('.gallery a', {
  captionsData: 'title',
});

const optionsIntersection = { rootMargin: '250px' };
const observer = new IntersectionObserver(onIntersection, optionsIntersection);
observer.observe(refs.sentinel);
const photocollection = new PhotoApiService();
refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  refs.divGallery.innerHTML = '';
  photocollection.query = event.currentTarget.elements.searchQuery.value;
  photocollection.resetPage();
  photocollection
    .getPhotoCollection()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      refs.divGallery.innerHTML = createCardMarkup(data.hits);
      photocollection.pageIncrement();
      instance.refresh();
    })
    .catch(error => {
      console.log(error);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function onIntersection(entires) {
  entires.forEach(entry => {
    
    if (
      entry.isIntersecting &
      (photocollection.query !== '') &
      (photocollection.page > 1)
    ) {
      photocollection
        .getPhotoCollection()
        .then(data => {
          if (data.hits.length === 0) {
            
            Notify.failure(
              'We are sorry, but you have reached the end of search results.'
            );
            return;
          }
          
          Notify.success(`Hooray! We found ${data.totalHits} images.`);
          refs.divGallery.insertAdjacentHTML(
            'beforeend',
            createCardMarkup(data.hits)
          );

          photocollection.pageIncrement();
          instance.refresh();
          // console.log()
          smoothScroll();
        })
        .catch(error => {
          Notify.failure(
            'We are sorry, but you have reached the end of search results.'
          );
        });
    }
  });
}
