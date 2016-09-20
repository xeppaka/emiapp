import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/productstable';
import { setProductQuantity } from '../actions';

const mapStateToProps = (state) => {
    return {
        products: state.products.productsTree.getProducts()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productQuantityChanged: (idx, quantity) => {
            dispatch(setProductQuantity(idx, quantity));
        }
    }
}

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTable);

export default ProductsContainer;