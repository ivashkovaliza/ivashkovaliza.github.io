import './sources.scss';

export default class Sources {
  async getSourcesAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  init(handler) {
    const urlSources = 'https://newsapi.org/v2/sources?apiKey=83c8aebd6ec444179f992b3fc49b9b3f';

    this.getSourcesAsync(urlSources)
      .then(data => {
        this.drawNewsSources(data.sources);
        document.querySelectorAll('.dropdown-content__item').forEach((element) => {
          element.addEventListener('click', handler);
        });
      });
  }

  drawAlphabetNav (navItemsNamesArr, navItemElement, sourceFirstLetter) {
    const nav = document.querySelector('.nav-wrapper');

    if (!navItemsNamesArr.includes(sourceFirstLetter)) {
      navItemsNamesArr.push(sourceFirstLetter);
      navItemElement.querySelector('.dropbtn').innerHTML = sourceFirstLetter;
      navItemElement.querySelector('.dropdown-content').setAttribute('id', `${sourceFirstLetter}-sources`);
      nav.appendChild(navItemElement);
    }
  }

  drawNewsSources(sourcesArr) {
    const navItemTemplate = document.querySelector('#navItemTemplate');
    const sourceItemTemplate = document.querySelector('#sourceItemTemplate');
    const navItemsNamesArr = [];

    sourcesArr.forEach(element => {
      const navItemElement = navItemTemplate.content.cloneNode(true);
      const sourceItemElement = sourceItemTemplate.content.cloneNode(true);
      const sourceFirstLetter = element.name[0];

      this.drawAlphabetNav(navItemsNamesArr, navItemElement, sourceFirstLetter);

      sourceItemElement.querySelector('.dropdown-content__item').innerHTML = element.name;
      sourceItemElement.querySelector('.dropdown-content__item').setAttribute('id', element.id);
      document.querySelector(`#${sourceFirstLetter}-sources`).appendChild(sourceItemElement);
    });
  }
}