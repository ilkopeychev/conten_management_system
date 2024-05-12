import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice'; // Update to the new slice reducer

export default combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
});
