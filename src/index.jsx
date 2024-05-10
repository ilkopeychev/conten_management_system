import React from 'react';
import { createRoot } from 'react-dom/client';
import {applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {App} from './App';
import {fetchCategories} from './actions/categories';
import {fetchProducts} from './actions/products';
import {createHashHistory} from 'history';
import {Router} from 'react-router-dom';
import {categoryApi} from './gateways/CategoryApi';
import rootReducer from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const history = createHashHistory();

const deps = {history, categoryApi};
  console.log(categoryApi,"categoryApi");
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk.withExtraArgument(deps)),
  devTools: process.env.NODE_ENV !== 'production', // Automatically uses composeWithDevTools if true
});

console.log(deps,"deps")
store.dispatch(fetchCategories());
store.dispatch(fetchProducts());
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <div className="content">
        <div className="container">
            <Provider store={store}>
                <Router history={history}>
                    <App/>
                </Router>
            </Provider>
        </div>
    </div>
);
