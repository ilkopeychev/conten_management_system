import { combineReducers } from '@reduxjs/toolkit';
import {categories} from './categories';
import {products} from './products';

export default combineReducers({
    categories,
    products,
});
