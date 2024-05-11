import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { categoryApi } from "./gateways/CategoryApi";
import { productApi } from "./gateways/ProductApi";
import { Provider } from "react-redux";
import { App } from "./App";
import rootReducer from "./reducers";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
const history = createHashHistory();

const deps = { history, categoryApi, productApi };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: deps,
      },
      serializableCheck: false,
    }),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div className="content">
    <div className="container">
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </div>
  </div>
);
