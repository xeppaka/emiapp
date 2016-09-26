import fetch from 'isomorphic-fetch';
import update from 'react-addons-update';
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
            return { menu: action.productsTree.getMenu('Product Categories'), expandedId: '.0.0.0' }
        default:
            return state;
    }
}

const initialProductsState = {
    mainProductsIds: [],
    posProductsIds: [],
    productsMap: {},
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
        case LOAD_PRODUCTS_FINISHED: {
                let productsList = action.productsTree.getProducts();
                let productsListLength = productsList.length;

                let mainProductsIds = [];
                let posProductsIds = [];
                let productsMap = {};

                for (let i = 0; i < productsListLength; i++) {
                    productsMap[i] = productsList[i];

                    if (productsList[i].type === 'MAIN') {
                        mainProductsIds.push(i);
                    }

                    if (productsList[i].type === 'POS') {
                        posProductsIds.push(i);
                    }
                }

                return Object.assign({}, state, {
                    mainProductsIds: mainProductsIds,
                    posProductsIds: posProductsIds,
                    productsMap: productsMap,
                    loadingInProgress: false
                });
            }
        case PRODUCT_QUANTITY_CHANGED: {
                let product = state.productsMap[action.id];
                let newProduct = Object.assign({}, product, { quantity: action.quantity });

                return update(state, {
                                         productsMap: {
                                            [action.id]: {$set: newProduct}
                                         }
                                     });
            }
        default:
            return state;
    }
}

const emiApp = combineReducers({
    products,
    menu
});

export default emiApp;