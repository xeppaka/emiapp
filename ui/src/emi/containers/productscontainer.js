import { connect } from 'react-redux';
import ProductsTables from '../components/productstable/productstables';
import { setProductQuantity } from '../state/products/productsactions';
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