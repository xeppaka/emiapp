import { connect } from 'react-redux';
import ProductsTables from '../components/customer/productstable/productstables';
import { setProductQuantity, showImageForProduct } from '../state/products/productsactions';
import { selectMenuNode } from '../state/menu/menuactions';
import { mainProductsSelector, posProductsWithLeftAmountSelector } from '../state/selectors/productsselector';

const mapStateToProps = (state) => {
    return {
        mainProducts: mainProductsSelector(state),
        posProducts: posProductsWithLeftAmountSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductQuantity: (productId, value) => {
            dispatch(setProductQuantity(productId, value));
        },
        onShowProductImage: (productId) => {
            dispatch(showImageForProduct(productId));
        },
        scrolledToProduct: (productId) => {
            dispatch(selectMenuNode(productId));
        }
    }
};

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTables);

export default ProductsContainer;