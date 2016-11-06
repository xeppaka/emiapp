import { connect } from 'react-redux';
import { posAmountToOrderSelector, totalWithoutDiscountSelector, totalWithDiscountSelector } from '../state/selectors/productsselector';
import { productsReset } from '../state/products/productsactions';
import { showProductsOrderModal } from '../state/modals/modalsactions';
import ProductsTableTotal from '../components/productstable/productstabletotal';

const mapStateToProps = (state) => {
    let posAmountToOrder = posAmountToOrderSelector(state);
    let totalWithoutDiscount = totalWithoutDiscountSelector(state);
    let totalWithDiscount = totalWithDiscountSelector(state);

    return {
        posAmountToOrder: posAmountToOrder,
        totalWithoutDiscount: totalWithoutDiscount,
        totalWithDiscount: totalWithDiscount,
        canCreateOrder: posAmountToOrder >= 0 && totalWithDiscount > 0,
        posExceeded: posAmountToOrder < 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productsReset: () => dispatch(productsReset()),
        createProductsOrder: () => dispatch(showProductsOrderModal())
    }
}

const ProductsTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTableTotal);

export default ProductsTotalContainer;