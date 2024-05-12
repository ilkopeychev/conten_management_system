import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { repeat, isValidExpirationDate } from "../../../utils";
import { fetchCategories } from "../../../reducers/categoriesSlice";
import { createProduct } from "../../../reducers/productsSlice";
import { isCategoriesValid, isNameValid } from "./validators";

export const ProductForm = ({ product = {} }) => {
  const dispatch = useDispatch();
  const categoriesStore = useSelector((state) => state.categories.categories);

  // Initialize the form state with product data or default values
  const [formState, setFormState] = useState({
    name: product.name || "",
    brand: product.brand || "",
    rating: product.rating || 0,
    categories: [],
    itemsInStock: product.itemsInStock || 0,
    receiptDate: product.receiptDate || "",
    expirationDate: product.expirationDate || "",
    featured: product.featured || false,
  });

  const selectedCategoryNames = categoriesStore
    .filter((cat) => formState.categories.includes(cat.id.toString())) // Ensure the IDs are compared correctly
    .map((cat) => cat.name)
    .join(", ");

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categoriesStore.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStore.length]);

  // Handle input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value, type, checked, options } = event.target;
    if (type === "checkbox") {
      setFormState((prevState) => ({ ...prevState, [name]: checked }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options) // Convert HTMLOptionsCollection to Array
        .filter((option) => option.selected) // Filter for selected options
        .map((option) => option.value); // Map to their values
        if (selectedValues.length > 5) {
          alert("You can select up to 5 categories only.");  // Inform the user
          return; // Stop the function and do not update state
        }
      setFormState((prevState) => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isNameValid) {
      alert("invalid name");
    }
    if (!isCategoriesValid) {
      alert("please select 1 or more categories");
    }
    if (!isValidExpirationDate(formState.expirationDate)) {
      alert("The expiration date must be at least 30 days in the future.");
      return;
    }
    dispatch(createProduct(formState));
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          invalid={!isNameValid(formState.name)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleInputChange}
        />
        <FormFeedback>
          Name is required, the length must not be greater than 200
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="brand">Brand</Label>
        <Input
          type="text"
          name="brand"
          id="brand"
          placeholder="Brand"
          value={formState.brand}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="rating">Rating</Label>
        <Input
          type="select"
          name="rating"
          id="rating"
          value={formState.rating}
          onChange={handleInputChange}
        >
          {repeat(11).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="categories">Categories</Label>
        <Input
          invalid={!isCategoriesValid(formState.categories)}
          type="select"
          name="categories"
          id="categories"
          multiple
          value={formState.categories}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        >
          {categoriesStore.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Input>
        <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
        <p>Selected Categories: {selectedCategoryNames || "None"}</p>
      </FormGroup>

      <FormGroup>
        <Label for="itemsInStock">Items In Stock</Label>
        <Input
          type="number"
          name="itemsInStock"
          id="itemsInStock"
          value={formState.itemsInStock}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="receiptDate">Receipt date</Label>
        <Input
          type="date"
          name="receiptDate"
          id="receiptDate"
          value={formState.receiptDate}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="expirationDate">Expiration date</Label>
        <Input
          type="date"
          name="expirationDate"
          id="expirationDate"
          value={formState.expirationDate}
          onChange={handleInputChange}
          invalid={
            !isValidExpirationDate(formState.expirationDate) &&
            formState.expirationDate !== ""
          }
        />
        <FormFeedback>
          The expiration date must be at least 30 days in the future.
        </FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="featured"
            checked={formState.featured || formState.rating > 8}
            onChange={handleInputChange}
          />{" "}
          Featured
        </Label>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
};
