import update from 'react-addons-update';
import { LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED_SUCCESS } from './productsactions';

const initialProductsState = {
    products: {
        mainProductsIds: [],
        posProductsIds: [],
        productsById: {},
        productsSelectedById: {}
    },
    total: {
        mainProductsTotal: 0,
        mainProductsDiscountTotal: 0,
        posProductsTotal: 0,
        posAmountToOrder: 0,
        totalWithoutDiscount: 0,
        totalWithDiscount: 0,
    },
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

                    if (product.type === 'MAIN') {
                        mainProductsIds.push(i);
                    }

                    if (product.type === 'POS') {
                        posProductsIds.push(i);
                    }
                }

                return update(state, {
                    products: {
                        mainProductsIds: {$set: mainProductsIds},
                        posProductsIds: {$set: posProductsIds},
                        productsById: {$set: productsById},
                        productsSelectedById: {$set: {}}
                    },
                    loadingInProgress: {$set: false}
                });
            }
        default:
            return state;
    }
}

export default products;