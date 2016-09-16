import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/productstable';

const mapStateToProps = (state) => {
    return {
        products: state.products.productsList
    };
};

const ProductsContainer = connect(
    mapStateToProps
)(ProductsTable);

export default ProductsContainer;