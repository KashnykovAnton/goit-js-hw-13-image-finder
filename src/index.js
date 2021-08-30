import { showAlert, showError } from './js/pnotify';
import * as basicLightbox from 'basiclightbox';
import './sass/main.scss';
import ImgApiService from './js/apiService';
import templateList from './templates/templateList';

const refs = {
  formSearch: document.querySelector('#search-form'),
  galleryImg: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn'),
};

const imgApiService = new ImgApiService();

refs.formSearch.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onBtnClick);
refs.galleryImg.addEventListener('click', onImgClick);
refs.loadMoreBtn.style.visibility = 'hidden';

function onFormSearch(e) {
  e.preventDefault();
  imgApiService.query = e.currentTarget.elements.query.value;
  clearGalleryImg();
  if (imgApiService.query.trim() === '') {
    showError();
    return;
  }
  fetchAndMarkup();
}

function onBtnClick() {
  imgApiService.fetchImages().then(hits => {
    checkLengthArr(hits);
    markupGalleryImg(hits);
    refs.galleryImg.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
}

function markupGalleryImg(hits) {
  refs.galleryImg.insertAdjacentHTML('beforeend', templateList(hits));
}

function clearGalleryImg() {
  refs.galleryImg.innerHTML = '';
  imgApiService.resetPage();
  refs.loadMoreBtn.style.visibility = 'hidden';
}

function checkLengthArr(hits) {
  if (hits.length > 11) {
    refs.loadMoreBtn.style.visibility = 'visible';
  } else {
    refs.loadMoreBtn.style.visibility = 'hidden';
    showAlert();
  }
}

function fetchAndMarkup() {
  imgApiService.fetchImages().then(hits => {
    checkLengthArr(hits);
    markupGalleryImg(hits);
  });
}

function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const currentImg = e.target.dataset.src;
  const instance = basicLightbox.create(`
    <img src="${currentImg}" width="800" height="600">
`);
  instance.show();
}
