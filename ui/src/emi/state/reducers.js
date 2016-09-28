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
                return Object.assign({}, state, { menu: newMenu, expandedId: action.id });
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
    mainProductsList: [],
    posProductsList: [],
    mainProductsTotal: 0,
    mainProductsDiscountTotal: 0,
    posProductsTotal: 0,
    posAmountToOrder: 0,
    totalWithoutDiscount: 0,
    totalWithDiscount: 0,
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

                let mainProductsList = [];
                let posProductsList = [];

                for (let i = 0; i < productsListLength; i++) {
                    let product = productsList[i];
                    product.idx = i;

                    if (product.type === 'MAIN') {
                        product.id = mainProductsList.length;
                        mainProductsList.push(product);
                    }

                    if (product.type === 'POS') {
                        product.id = posProductsList.length;
                        posProductsList.push(product);
                        product.maxAllowedQuantity = 0;
                    }
                }

                return Object.assign({}, state, {
                    mainProductsList: mainProductsList,
                    posProductsList: posProductsList,
                    loadingInProgress: false
                });
            }
        case PRODUCT_QUANTITY_CHANGED: {
                let product = null;
                if (action.productType === 'MAIN') {
                    product = state.mainProductsList[action.id];
                } else if (action.productType === 'POS') {
                    product = state.posProductsList[action.id];
                }

                if (product === null) {
                    return state;
                }

                let mainProductsList = state.mainProductsList;
                let posProductsList = state.posProductsList;

                let newProduct = Object.assign({}, product, { quantity: action.quantity });

                let mainProductsTotal = state.mainProductsTotal;
                let mainProductsDiscountTotal = state.mainProductsDiscountTotal;
                let posProductsTotal = state.posProductsTotal;

                if (product.type === 'MAIN') {
                    mainProductsList = [...mainProductsList.slice(0, action.id),
                                        newProduct,
                                        ...mainProductsList.slice(action.id + 1)];

                    mainProductsTotal += newProduct.price * newProduct.quantity - product.price * product.quantity;
                    mainProductsDiscountTotal += newProduct.price / 2 * newProduct.quantity - product.price / 2 * product.quantity;
                }

                if (product.type === 'POS') {
                    posProductsTotal += newProduct.price * newProduct.quantity - product.price * product.quantity;
                }

                let totalWithoutDiscount = mainProductsTotal + posProductsTotal;
                let posAmountToOrder = mainProductsDiscountTotal * 0.06 - posProductsTotal;

                posProductsList = posProductsList.map((pp, idx) => {
                    return Object.assign({}, pp, { maxAllowedQuantity: posAmountToOrder > 0 ? Math.floor(posAmountToOrder / pp.price) : 0 });
                });

                if (product.type === 'POS') {
                    newProduct.maxAllowedQuantity = posAmountToOrder > 0 ? Math.floor(posAmountToOrder / newProduct.price) : 0;
                    posProductsList[action.id] = newProduct;
                }

                return update(state, {
                                         mainProductsList: {$set: mainProductsList},
                                         posProductsList: {$set: posProductsList},
                                         mainProductsTotal: {$set: mainProductsTotal},
                                         mainProductsDiscountTotal: {$set: mainProductsDiscountTotal},
                                         posProductsTotal: {$set: posProductsTotal},
                                         posAmountToOrder: {$set: posAmountToOrder},
                                         totalWithoutDiscount: {$set: totalWithoutDiscount},
                                         totalWithDiscount: {$set: mainProductsDiscountTotal}
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