import React from 'react';
import { connect } from 'react-redux';
import ProductsMenu from '../components/productsmenu/productsmenu';

const mapStateToProps = (state) => {
    return {
        menu: state.products.productsTree.getProductsMenu()
    }
}

const ProductsMenuContainer = connect(
    mapStateToProps
)(ProductsMenu);

export default ProductsMenuContainer;