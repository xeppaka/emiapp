import fetch from 'isomorphic-fetch';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, PRODUCT_QUANTITY_CHANGED } from '../actions/productsactions';
import { MENU_NODE_TOGGLED } from '../actions/menuactions';
import ProductsTree from './products/tree';

function toggleUntilHasProducts(node, expand) {
    if (!node.hasProducts && node.items.length > 0) {
        return Object.assign({}, node, {
                                           expanded: expand,
                                           items: [
                                                      toggleUntilHasProducts(node.items[0], expand),
                                                      ...node.items.slice(1)
                                                  ]
                                       });
    } else {
        return Object.assign({}, node, { expanded: expand, active: expand });
    }
}

function toggleMenuRecursive(node, ids, depth, expand) {
    if (depth >= ids.length) {
        let newNode = Object.assign({}, node, { expanded: expand });
        newNode = toggleUntilHasProducts(newNode, expand);
        return newNode;
    } else {
        let currIdx = Number(ids[depth]);
        let newNode = Object.assign({}, node, {
                                                    expanded: expand,
                                                    items: [
                                                        ...node.items.slice(0, currIdx),
                                                        toggleMenuRecursive(node.items[currIdx], ids, depth + 1, expand),
                                                        ...node.items.slice(currIdx + 1)
                                                    ]
                                              });
        return newNode;
    }
}

function expandMenu(menu, id) {
    let ids = id.split('.');
    return toggleMenuRecursive(menu, ids, 1, true);
}

function closeMenu(menu, id) {
    let ids = id.split('.');
    return toggleMenuRecursive(menu, ids, 1, false);
}

const initialMenuState = {
    menu: ProductsTree.emptyMenu('Product Categories'),
    expandedId: null
}

function menu(state = initialMenuState, action) {
    switch (action.type) {
        case MENU_NODE_TOGGLED:
            if (state.expandedId !== action.id) {
                let newMenu = closeMenu(state.menu, state.expandedId);
                newMenu = expandMenu(newMenu, action.id);
                return { menu: newMenu, expandedId: action.id }
            } else {
                return state;
            }
        case LOAD_PRODUCTS_FINISHED:
            return { menu: action.productsTree.getMenu('Product Categories'), expandedId: '.0' }
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
                list: action.productsTree.getAllProducts(),
                loadingInProgress: false
            });
        case PRODUCT_QUANTITY_CHANGED:
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