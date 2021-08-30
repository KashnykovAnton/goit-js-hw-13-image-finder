export default class ImgApiService {
  constructor() {
    this.searchQuerry = '';
    this.page = 1;
  }

  fetchImages() {
    const URL = 'https://pixabay.com/api/';
    const API_KEY = '23089683-10e6383e94187ff47334541d4';
    return fetch(
      `${URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
