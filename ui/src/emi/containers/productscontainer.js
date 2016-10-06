import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ProductsTables from '../components/productstable/productstables';
import { setProductQuantity } from '../state/products/productsactions';
import { selectMenuNode } from '../state/menu/menuactions';

const mainProductsSelector = createSelector(
        [
            (state) => state.products.mainProductsIds,
            (state) => state.products.productsById
        ],
        (mainProductIds, productsById) => {
            return mainProductIds.map((id) => productsById[id]);
        }
);

const posProductsSelector = createSelector(
        [
            (state) => state.products.posProductsIds,
            (state) => state.products.productsById
        ],
        (posProductIds, productsById) => {
            return posProductIds.map((id) => productsById[id]);
        }
);

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