import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) {
        return;
      }

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkUp() {
    const currentPage = this._data.page;
    let numPages = this._data.results.length / this._data.resultsPerPage;
    numPages = Math.ceil(numPages);
    console.log(numPages);
    // Page 1 and there are other pages

    if (currentPage === 1 && numPages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currentPage + 1
      }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
             </svg>
            <span>Page ${currentPage - 1}</span>
       </button>
      `;
    }
    // Some other Page
    if (currentPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currentPage - 1
        }">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
               </svg>
              <span>Page ${currentPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-goto="${
          currentPage + 1
        }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    // Page 1 and there are NO other pages

    return '';
  }
}

export default new PaginationView();
