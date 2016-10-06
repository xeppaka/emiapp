import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ProductsTables from '../components/productstable/productstables';
// import { productQuantityChanged } from '../actions/productsactions';
import { selectMenuNode } from '../state/menu/menuactions';

const mainProductsSelector = createSelector(
        [
            (state) => state.products.products.mainProductsIds,
            (state) => state.products.products.productsById
        ],
        (mainProductIds, productsById) => {
            return mainProductIds.map((id) => productsById[id]);
        }
);

const posProductsSelector = createSelector(
        [
            (state) => state.products.products.posProductsIds,
            (state) => state.products.products.productsById
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
        productQuantityChanged: (productType, id, quantity) => {
            // dispatch(productQuantityChanged(productType, id, quantity));
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