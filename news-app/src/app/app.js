import Sources from '../sources/sources.js';
import News from '../news/news.js';

export default class App {
  init() {
    const sources = new Sources();
    const news = new News();
    sources.init(news.showNews);
  }
}