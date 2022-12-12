import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No results Found for your query! Please try again';

  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
