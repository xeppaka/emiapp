import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { productsReset } from '../state/products/productsactions';
// import { createProductsOrder } from '../actions/orderactions';
import ProductsTableTotal from '../components/productstable/productstabletotal';

const totalWithoutDiscountSelector = createSelector(
        [
            (state) => state.products.mainProductsIds,
            (state) => state.products.productsById
        ],
        (mainProductsIds, productsById) => {
            return mainProductsIds.reduce((prev, id) => { return prev + (productsById[id].price * productsById[id].quantity); }, 0);
        }
);

const mapStateToProps = (state) => {
    return {
        posAmountToOrder: 0,
        totalWithoutDiscount: totalWithoutDiscountSelector(state),
        totalWithDiscount: 0,
        canCreateOrder: false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productsReset: () => dispatch(productsReset())
        // createProductsOrder: () => dispatch(createProductsOrder())
    }
}

const ProductsTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTableTotal);

export default ProductsTotalContainer;