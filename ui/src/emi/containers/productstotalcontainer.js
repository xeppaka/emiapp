import React from 'react';
import { connect } from 'react-redux';
import ProductsTableTotal from '../components/productstabletotal';

const mapStateToProps = (state) => {
    return {
        posAmountToOrder: state.products.posAmountToOrder,
        totalWithoutDiscount: state.products.totalWithoutDiscount,
        totalWithDiscount: state.products.totalWithDiscount
    }
}

const ProductsTotalContainer = connect(
    mapStateToProps
)(ProductsTableTotal);

export default ProductsTotalContainer;