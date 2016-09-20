import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import ProductsTree from './productstree/productstree';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, SET_PRODUCT_QUANTITY } from './actions';

const initialState = {
    products: {
        productsTree: new ProductsTree(),
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
            var productsTree = new ProductsTree();
            var productsLength = action.productsList.length;

            for (var i = 0; i < productsLength; i++) {
                productsTree.addProduct(action.productsList[i].category, {
                    name: action.productsList[i].name,
                    price: action.productsList[i].price,
                    quantity: 0
                });
            }

            return Object.assign({}, state, {
                productsTree: productsTree,
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
    products
});

export default emiApp;