class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerRender(handler) {
    ['submit', 'click'].map(el => {
      this._parentEl
        .querySelector('.search__btn')
        .addEventListener(el, function (e) {
          e.preventDefault();
          handler();
        });
    });
  }
}

export default new SearchView();
