import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, SET_PRODUCT_QUANTITY } from '../actions/actions';
import ProductsTree from './products/tree';

const initialMenuState = ProductsTree.emptyMenu('Categories Menu');

function menu(state = initialMenuState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS_FINISHED:
            return action.products.getMenu('Categories Menu');
        default:
            return state;
    }
}

const initialProductsState = {
    list: ProductsTree.emptyProducts(),
    loadingInProgress: false
};

function products(state = initialProductsState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return state;
        case LOAD_PRODUCTS_STARTED:
            return Object.assign({}, state, {
                loadingInProgress: true
            });
        case LOAD_PRODUCTS_FINISHED:
            return Object.assign({}, state, {
                list: action.products.getProducts(),
                loadingInProgress: false
            });
        case SET_PRODUCT_QUANTITY:
//            var newState = Object.assign({}, state);
//            newState.productsList = state.productsList.slice();
//            var newProduct = Object.assign({}, newState.productsList[action.idx]);
//            newState.productsList[action.idx] = newProduct;
//            newProduct.quantity = action.quantity;

            return state;
        default:
            return state;
    }
}

const emiApp = combineReducers({
    products,
    menu
});

export default emiApp;