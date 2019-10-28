import './news.scss';

export default class News {
  constructor () {
    this.showNews = this.showNews.bind(this);
  }

  async getNewsAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  showNews (event) {
    const urlNews = `https://newsapi.org/v2/everything?sources=${event.target.getAttribute('id')}&pageSize=10&apiKey=83c8aebd6ec444179f992b3fc49b9b3f`;
    this.getNewsAsync(urlNews)
      .then(data => {
          this.drawNews(data.articles);
      });
  }

  drawNews (newsArr) {
    this.clearNews();

    const tmpl = document.querySelector('#newsItemTemplate');
    const newsContainer = document.querySelector('.news');

    newsArr.forEach(element => {
      const newsElement = tmpl.content.cloneNode(true);
      const newsDescription = this.createNewsDescription(element.description);
      const date = new Date(element.publishedAt);

      newsElement.querySelector('.news__item-img').setAttribute('src', element.urlToImage ? element.urlToImage : 'https://picsum.photos/1200/630');
      newsElement.querySelector('.news__item-title').innerHTML = element.title;
      newsElement.querySelector('.news__item-description').innerHTML = newsDescription;
      newsElement.querySelector('.news__item-link').setAttribute('href', element.url);
      newsElement.querySelector('.news__item-day-month').innerHTML = date.getDate() + '/' + date.getMonth();
      newsElement.querySelector('.news__item-year').innerHTML = date.getFullYear();

      newsContainer.appendChild(newsElement);
    });
  }

  clearNews () {
    document.querySelector('.news').innerHTML = '';
  }

  createNewsDescription (description) {
    return description.length && description.description < 120 ? description : description.slice(0, 119) + '...';
  }
}