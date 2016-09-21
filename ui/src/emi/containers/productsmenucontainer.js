import React from 'react';
import { connect } from 'react-redux';
import ProductsMenu from '../components/productsmenu/productsmenu';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

const ProductsMenuContainer = connect(
    mapStateToProps
)(ProductsMenu);

export default ProductsMenuContainer;