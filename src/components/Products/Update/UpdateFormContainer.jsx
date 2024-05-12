import React from "react";
import { ProductForm } from "./ProductForm";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getProductById } from "../../../reducers/productsSlice";
import { useSelector } from 'react-redux'; 

const UpdateFormContainer = () => {
  let { productId } = useParams();
  productId = parseInt(productId);
  const product = useSelector((state) => getProductById(state, productId));
  console.log(product,"product");
  return (
    <>
      <Link to="/">Home</Link>
      <ProductForm
        onSave={(data) => {
          return;
        }}
      />
    </>
  );
};

export default UpdateFormContainer;
