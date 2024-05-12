import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Main } from "./components/Main/Main";
import ProductsContainer from "./components/Products/ProductsContainer";
import NotFound from "./components/NotFound/NotFound";
import UpdateFormContainer from "./components/Products/Update/UpdateFormContainer";
import AddFormContainer from "./components/Products/Add/AddFormContainer";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./reducers/productsSlice";
import { fetchCategories } from "./reducers/categoriesSlice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <Main>
      <Switch>
        <Route exact path="/" component={ProductsContainer} />
        <Route
          path="/edit/:productId"
          render={({ match }) => {
            return (
              <UpdateFormContainer
                productId={parseInt(match.params.productId, 10)}
              />
            );
          }}
        />

        <Route path="/add" component={AddFormContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Main>
  );
};
