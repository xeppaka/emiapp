import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, SET_PRODUCT_QUANTITY } from '../actions/productsactions';
import { MENU_NODE_TOGGLED } from '../actions/menuactions';
import ProductsTree from './products/tree';

function expandMenuRecursive(node, ids, idx) {
    if (idx >= ids.length) {
        return Object.assign({}, node, { expanded: true });
    } else {
        let currIdx = Number(ids[idx]);
        let newNode = Object.assign({}, node, {
                                                    expanded: true,
                                                    items: [
                                                        ...node.items.slice(0, currIdx),
                                                        expandMenuRecursive(node.items[currIdx], ids, idx + 1),
                                                        ...node.items.slice(currIdx + 1)
                                                    ]
                                              });
        return newNode;
    }
}

function expandMenu(menu, id) {
    let ids = id.split('.');
    return expandMenuRecursive(menu, ids, 1);
}

const initialMenuState = ProductsTree.emptyMenu('Categories Menu');

function menu(state = initialMenuState, action) {
    switch (action.type) {
        case MENU_NODE_TOGGLED:
            return expandMenu(state, action.id);
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