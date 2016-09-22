import React from 'react';
import { connect } from 'react-redux';
import ProductsMenu from '../components/productsmenu/productsmenu';
import { menuNodeToggled } from '../actions/menuactions';

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        menuNodeToggled: (id) => {
            dispatch(menuNodeToggled(id));
        }
    }
}

const ProductsMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsMenu);

export default ProductsMenuContainer;