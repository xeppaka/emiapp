import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/productstable';
import { productQuantityChanged } from '../actions/productsactions';
import { menuNodeToggled } from '../actions/menuactions';

const mapStateToProps = (state) => {
    return {
        mainProducts: state.products.mainProducts, //Ids.map((id) => state.products.productsMap[id]),
        posProducts: [] //state.products.posProductsIds.map((id) => state.products.productsMap[id])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productQuantityChanged: (id, quantity) => {
            dispatch(productQuantityChanged(id, quantity));
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