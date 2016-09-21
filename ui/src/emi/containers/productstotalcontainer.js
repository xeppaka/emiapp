import React from 'react';
import { connect } from 'react-redux';
import ProductsTableTotal from '../components/productstabletotal';

const mapStateToProps = (state) => {
    return {
        total: state.products.list.reduce( (prev, current) => { return prev + current.price * current.quantity }, 0 )
    }
}

const ProductsTotalContainer = connect(
    mapStateToProps
)(ProductsTableTotal);

export default ProductsTotalContainer;