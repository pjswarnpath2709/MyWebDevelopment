import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet , find a nice recipe and bookmark it';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkUp() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
