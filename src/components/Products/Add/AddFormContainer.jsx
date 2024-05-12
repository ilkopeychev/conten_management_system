import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {ProductForm} from '../Update/ProductForm';

const AddFormContainer = () => (
    <>
        <Link to='/'>Home</Link>
        <ProductForm
            onSave={(data) => {
                return;
            }}
        />
    </>
);



export default AddFormContainer;
