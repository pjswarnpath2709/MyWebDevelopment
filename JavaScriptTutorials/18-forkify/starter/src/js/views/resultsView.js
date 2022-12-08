import View from './View';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No results Found for your query! Please try again';

  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join('');
  }

  _generateMarkUpPreview(el) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link ${
          el.id === id ? 'preview__link--active' : ''
        }" href="#${el.id}">
            <figure class="preview__fig">
                <img src="${el.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${el.title}</h4>
                <p class="preview__publisher">${el.publisher}</p>
            </div>
        </a>
    </li>
    `;
  }
}

export default new ResultView();
