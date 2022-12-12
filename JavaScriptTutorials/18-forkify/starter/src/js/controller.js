import * as model from './model.js';

import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './views/recipeView.js';

import bookmarkView from './views/bookmarkView.js';

import searchView from './views/searchView.js';

import resultsView from './views/resultsView.js';

import addRecipeView from './views/addRecipeView.js';

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

    // 3) Updating Bookmarks View

    bookmarkView.update(model.state.bookmarks);

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

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
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

const controlAddRecipe = async function (newRecipeData) {
  try {
    // render a spinner
    addRecipeView.renderSpinner();

    // Upload the new Recipe data
    await model.uploadRecipe(newRecipeData);

    // Render the recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // render the bookmarkView
    bookmarkView.render(model.state.bookmarks);

    // change Id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close Form Window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`😖😖 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

//////-------------------------------------------------------------------------------------------------------------------------------//////

function init() {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
