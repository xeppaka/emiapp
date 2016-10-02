import React from 'react';
import { connect } from 'react-redux';
import ProductsTable from '../components/productstable/productstable';
import { productQuantityChanged } from '../actions/productsactions';
import { menuNodeToggled } from '../actions/menuactions';

const mapStateToProps = (state) => {
    return {
        mainProducts: state.products.mainProductsList,
        posProducts: state.products.posProductsList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productQuantityChanged: (productType, id, quantity) => {
            dispatch(productQuantityChanged(productType, id, quantity));
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