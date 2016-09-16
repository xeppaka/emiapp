import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED } from './actions';

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
            return Object.assign({}, state, {
                productsList: action.productsList,
                loadingInProgress: false
            });
        default:
            return state;
    }
}

const emiApp = combineReducers({
    products
});

export default emiApp;