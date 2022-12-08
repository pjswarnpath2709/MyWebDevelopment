import { async } from 'regenerator-runtime';
import { getJSON } from './helpers.js';
import * as config from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: config.RES_PER_PAGE,
    page: 0,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const url = `${config.API_URL}${id}`;
    const data = await getJSON(url);
    // console.log(data);
    const { recipe } = data.data;
    // console.log(recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (
      state.bookmarks.some(bookmark => {
        return bookmark.id === id;
      })
    ) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(state.recipe);
  } catch (err) {
    // temporary error handling
    console.error(` 👎 : ${err} `);
    // alert(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${config.API_URL}?search=${query}`);
    // console.log(data);
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(` 👎 : ${err} `);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = element.quantity * (newServings / state.recipe.servings);
  });
  if (!newServings) {
    return;
  }
  state.recipe.servings = newServings;
};

export const addBookMark = function (recipe) {
  // Add BookMark
  state.bookmarks.push(recipe);

  // Mark if Current Recipe as BookMarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark  Current Recipe not as Bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
