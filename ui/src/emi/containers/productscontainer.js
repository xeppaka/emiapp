import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/productstable';
import { productQuantityChanged } from '../actions/productsactions';
import { menuNodeToggled } from '../actions/menuactions';

const mapStateToProps = (state) => {
    return {
        products: state.products.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productQuantityChanged: (idx, quantity) => {
            dispatch(setProductQuantity(idx, quantity));
        },
        productCategoryChanged: (id) => {
            dispatch(menuNodeToggled(id));
        }
    }
}

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTable);

export default ProductsContainer;