import { connect } from 'react-redux';
import ProductsTables from '../components/productstable/productstables';
import { setProductQuantity } from '../state/products/productsactions';
import { selectMenuNode } from '../state/menu/menuactions';
import { mainProductsSelector, posProductsSelector } from '../state/selectors/selectors';

const mapStateToProps = (state) => {
    return {
        mainProducts: mainProductsSelector(state),
        posProducts: posProductsSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductQuantity: (id, value) => {
            dispatch(setProductQuantity(id, value));
        },
        setProductCategory: (id) => {
            dispatch(selectMenuNode(id));
        }
    }
}

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsTables);

export default ProductsContainer;