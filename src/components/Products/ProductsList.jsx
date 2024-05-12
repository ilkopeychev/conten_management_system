import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import { Container, Row, Col } from "reactstrap";
import { chunk } from "lodash";
import { deleteProduct } from "../../reducers/productsSlice";
import { getCategoriesById } from "../../reducers/categoriesSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
  
    const categoriesById = getCategoriesById(state);
    return state.products.products.map((product) => ({
      ...product,
      categories: product.categories.map(
        (id) => categoriesById[id] || { id, name: "Unknown" }
      ),
    }));
  });
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const productsGroups = chunk(products, 3);

  return (
    <Container>
      {productsGroups.map((productsGroup, index) => (
        <Row key={index} className="mb-5">
          {productsGroup.map((product) => (
            <Col sm="4" key={product.id}>
              <Product
                product={product}
                onDelete={() => handleDelete(product.id)}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default ProductList;
