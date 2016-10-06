import update from 'react-addons-update';
import { LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED_SUCCESS, SET_PRODUCT_QUANTITY } from './productsactions';

const initialProductsState = {
    mainProductsIds: [],
    posProductsIds: [],
    productsById: {},
    loadingInProgress: false
};

function products(state = initialProductsState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS_STARTED:
            return update(state, {
                loadingInProgress: {$set: true}
            });
        case LOAD_PRODUCTS_FINISHED_SUCCESS: {
            let productsList = action.productsList;
            let productsListLength = productsList.length;

            let mainProductsIds = [];
            let posProductsIds = [];
            let productsById = {};

            for (let i = 0; i < productsListLength; i++) {
                let product = productsList[i];
                product.id = i;
                productsById[i] = product;
                product.quantity = 0;

                if (product.type === 'MAIN') {
                    mainProductsIds.push(i);
                }

                if (product.type === 'POS') {
                    posProductsIds.push(i);
                    product.maxAllowedQuantity = 0;
                }
            }

            return update(state, {
                mainProductsIds: {$set: mainProductsIds},
                posProductsIds: {$set: posProductsIds},
                productsById: {$set: productsById},
                loadingInProgress: {$set: false}
            });
        }
        case SET_PRODUCT_QUANTITY: {
//                let product = state.products.productsById[action.id];

//                let mainProductsList = state.mainProductsList;
//                let posProductsList = state.posProductsList;
//
//                let newProduct = Object.assign({}, product, { quantity: action.quantity });
//
//                if (newProduct.type === 'MAIN') {
//                    mainProductsList = [...mainProductsList.slice(0, action.id),
//                                        newProduct,
//                                        ...mainProductsList.slice(action.id + 1)];
//                }
//
//                let mainProductsTotal = 0;
//                let mainProductsDiscountTotal = 0;
//                let mainProducsListLength = mainProductsList.length;
//                for (let i = 0; i < mainProducsListLength; i++) {
//                    let curMainProduct = mainProductsList[i];
//                    mainProductsTotal += curMainProduct.price * curMainProduct.quantity;
//                    mainProductsDiscountTotal += curMainProduct.price / 2 * curMainProduct.quantity;
//                }
//
//                let posProductsTotal = 0;
//                let posProductsListLength = posProductsList.length;
//                for (let i = 0; i < posProductsListLength; i++) {
//                    let curPosProduct = posProductsList[i];
//                    posProductsTotal += curPosProduct.price * curPosProduct.quantity;
//                }
//
//                if (newProduct.type === 'POS') {
//                    posProductsTotal += (newProduct.quantity - product.quantity) * newProduct.price;
//                }
//
//                let posAmountToOrder = mainProductsDiscountTotal * 0.06 - posProductsTotal;
//
//                if (posAmountToOrder < 0) {
//                    posAmountToOrder = mainProductsDiscountTotal * 0.06;
//                    posProductsTotal = 0;
//
//                    posProductsList = posProductsList.map((pp, idx) => {
//                        return Object.assign({}, pp, {
//                                                        maxAllowedQuantity: 0,
//                                                        quantity: 0
//                                                     });
//                    });
//                } else {
//                    posProductsList = posProductsList.map((pp, idx) => {
//                        return Object.assign({}, pp, {
//                                                        maxAllowedQuantity: Math.floor(posAmountToOrder / pp.price)
//                                                     });
//                    });
//                }
//
//                if (product.type === 'POS') {
//                    newProduct.maxAllowedQuantity = posAmountToOrder > 0 ? Math.floor(posAmountToOrder / newProduct.price) : 0;
//                    posProductsList[action.id] = newProduct;
//                }
//
//                let totalWithoutDiscount = mainProductsTotal + posProductsTotal;

                return update(state, {
                    productsById: {
                        [action.id]: {
                            quantity: {$set: action.value}
                        }
                    }
                });
        }
        default:
            return state;
    }
}

export default products;