import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, SET_PRODUCT_QUANTITY } from './actions';

const initialState = {
    products: {
        productsList: [],
        loadingInProgress: false
    }
};

function products(state = initialState.products, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return state;
        case LOAD_PRODUCTS_STARTED:
            return Object.assign({}, state, {
                loadingInProgress: true
            });
        case LOAD_PRODUCTS_FINISHED:
            var newProductsList = action.productsList.map((product, idx) => Object.assign({}, product, { idx: idx, quantity: 0 }));
            return Object.assign({}, state, {
                productsList: newProductsList,
                loadingInProgress: false
            });
        case SET_PRODUCT_QUANTITY:
            var newState = Object.assign({}, state);
            newState.productsList = state.productsList.slice();
            var newProduct = Object.assign({}, newState.productsList[action.idx]);
            newState.productsList[action.idx] = newProduct;
            newProduct.quantity = action.quantity;

            return newState;
        default:
            return state;
    }
}

const emiApp = combineReducers({
    products
});

export default emiApp;