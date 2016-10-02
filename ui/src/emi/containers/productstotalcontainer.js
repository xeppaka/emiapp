import React from 'react';
import { connect } from 'react-redux';
import { productsReset } from '../actions/productsactions';
import { createProductsOrder } from '../actions/orderactions';
import ProductsTableTotal from '../components/productstable/productstabletotal';

const mapStateToProps = (state) => {
    return {
        posAmountToOrder: state.products.posAmountToOrder,
        totalWithoutDiscount: state.products.totalWithoutDiscount,
        totalWithDiscount: state.products.totalWithDiscount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productsReset: () => dispatch(productsReset()),
        createProductsOrder: () => dispatch(createProductsOrder())
    }
}

const ProductsTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTableTotal);

export default ProductsTotalContainer;