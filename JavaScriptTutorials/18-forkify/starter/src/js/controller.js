import * as model from './model.js';

import recipeView from './views/recipeView.js';

import bookmarkView from './views/bookmarkView.js';

import searchView from './views/searchView.js';

import resultsView from './views/resultsView.js';

import 'core-js/stable';

import 'regenerator-runtime/runtime.js';
import paginationView from './views/paginationView.js';

///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////
///////-------------------------------------------------------------------------------------------------------------------------------//////

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// only parcel understanding code
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    // render a spinner
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // result is stored in the state variable
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }

  controlServings();
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get QUERY results
    const query = searchView.getQuery();

    if (!query) {
      return;
    }
    // result is stored in the state object
    await model.loadSearchResult(query);

    // rendering the data
    resultsView.render(model.getSearchResultsPage(1));

    // render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  // rendering the data
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // render the initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings = model.state.recipe.servings) {
  // update the recipe servings ( in state )
  // console.log(newServings);
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

//////-------------------------------------------------------------------------------------------------------------------------------//////

function init() {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
