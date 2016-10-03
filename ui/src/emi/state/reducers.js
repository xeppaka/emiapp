import fetch from 'isomorphic-fetch';
import update from 'react-addons-update';
import { combineReducers } from 'redux';
import { LOAD_PRODUCTS, LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED, PRODUCT_QUANTITY_CHANGED, PRODUCTS_RESET } from '../actions/productsactions';
import { PREPARE_PRODUCTS_ORDER, ORDER_EMAIL_CHANGED, ORDER_COUNTRY_CHANGED, SUBMIT_ORDER_STARTED, SUBMIT_ORDER_FINISHED } from '../actions/orderactions';
import { SHOW_PRODUCTS_ORDER_MODAL, SHOW_MESSAGE_BOX_MODAL, HIDE_MODAL } from '../actions/modalactions';
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
            let menu = expandMenu(action.productsTree.getMenu('Product Categories'), '.0');
            return { menu: menu, expandedId: '.0' }
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

                if (newProduct.type === 'MAIN') {
                    mainProductsList = [...mainProductsList.slice(0, action.id),
                                        newProduct,
                                        ...mainProductsList.slice(action.id + 1)];
                }

                let mainProductsTotal = 0;
                let mainProductsDiscountTotal = 0;
                let mainProducsListLength = mainProductsList.length;
                for (let i = 0; i < mainProducsListLength; i++) {
                    let curMainProduct = mainProductsList[i];
                    mainProductsTotal += curMainProduct.price * curMainProduct.quantity;
                    mainProductsDiscountTotal += curMainProduct.price / 2 * curMainProduct.quantity;
                }

                let posProductsTotal = 0;
                let posProductsListLength = posProductsList.length;
                for (let i = 0; i < posProductsListLength; i++) {
                    let curPosProduct = posProductsList[i];
                    posProductsTotal += curPosProduct.price * curPosProduct.quantity;
                }

                if (newProduct.type === 'POS') {
                    posProductsTotal += (newProduct.quantity - product.quantity) * newProduct.price;
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
        case PRODUCTS_RESET: {
                let mainProductsList = state.mainProductsList.map((p) => update(p, {quantity: {$set: 0}}));
                let posProductsList = state.posProductsList.map((p) => update(p, {quantity: {$set: 0}}));

                return update(state, {
                                         mainProductsList: {$set: mainProductsList},
                                         posProductsList: {$set: posProductsList},
                                         mainProductsTotal: {$set: 0},
                                         mainProductsDiscountTotal: {$set: 0},
                                         posProductsTotal: {$set: 0},
                                         posAmountToOrder: {$set: 0},
                                         totalWithoutDiscount: {$set: 0},
                                         totalWithDiscount: {$set: 0}
                                     });
            }
        default:
            return state;
    }
}

const initialModalsState = {
    nextId: 0,
    visibleModals: []
};

function modals(state = initialModalsState, action) {
    switch (action.type) {
        case SHOW_PRODUCTS_ORDER_MODAL: {
            let id = state.nextId;
            return update(state, {
                                      visibleModals: {$push: [{id: id, type: 'PRODUCTS_ORDER_MODAL'}]},
                                      nextId: {$apply: (prev) => prev + 1}
                                 });
        }
        case SHOW_MESSAGE_BOX_MODAL: {
            let id = state.nextId;
            return update(state, {
                                      visibleModals: {$push: [{id: id, type: 'MESSAGE_BOX_MODAL', title: action.title, text: action.text}]},
                                      nextId: {$apply: (prev) => prev + 1}
                                 });
        }
        case HIDE_MODAL: {
            let idx = state.visibleModals.findIndex((elem) => elem.id === action.id);

            if (idx === -1) {
                return state;
            } else {
                return update(state, {
                                          visibleModals: {$splice: [[idx, 1]]}
                                     });
            }
        }
        default:
            return state;
    }
}

const initialOrderState = {
    email: '',
    emailValid: false,
    country: 'CZ',
    selectedProductsList: [],
    totalWithoutDiscount: 0,
    totalWithDiscount: 0,
    submittable: false,
    submitting: false
};

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
function isEmailValid(email) {
    return re.test(email);
}

function order(state = initialOrderState, action) {
    switch (action.type) {
        case PREPARE_PRODUCTS_ORDER: {
            let idx = 0;
            let quantityPositive = (prevVal, curVal) => {
                                                          if (curVal.quantity > 0) {
                                                              prevVal.totalWithoutDiscount += curVal.price * curVal.quantity;
                                                              if (curVal.type === 'MAIN') {
                                                                prevVal.totalWithDiscount += curVal.price / 2 * curVal.quantity;
                                                              }
                                                              prevVal.selectedProductsList.push(Object.assign({}, curVal, { id: idx, idx: idx++ }));
                                                          }

                                                          return prevVal;
                                                        };
            let mainProductsList = action.mainProductsList;
            let posProductsList = action.posProductsList;

            let orderContainer = mainProductsList.reduce(quantityPositive, { totalWithoutDiscount: 0, totalWithDiscount: 0, selectedProductsList: [] });
            orderContainer = posProductsList.reduce(quantityPositive, orderContainer);

            return update(state, {
                                    selectedProductsList: {$set: orderContainer.selectedProductsList},
                                    totalWithoutDiscount: {$set: orderContainer.totalWithoutDiscount},
                                    totalWithDiscount: {$set: orderContainer.totalWithDiscount}
                                 });
        }
        case ORDER_EMAIL_CHANGED: {
            let email = action.email;
            let emailValid = isEmailValid(email);

            return update(state, {
                                    email: {$set: email},
                                    emailValid: {$set: emailValid},
                                    submittable: {$set: emailValid && !state.submitting}
                                 });
        }
        case ORDER_COUNTRY_CHANGED: {
            return update(state, {
                                    country: {$set: action.country}
                                 });
        }
        case SUBMIT_ORDER_STARTED: {
            return state;
        }
        case SUBMIT_ORDER_FINISHED: {
            return state;
        }
        default:
            return state;
    }
}

const emiApp = combineReducers({
    products,
    menu,
    modals,
    order
});

export default emiApp;