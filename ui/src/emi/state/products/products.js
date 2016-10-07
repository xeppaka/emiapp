import update from 'react-addons-update';
import { LOAD_PRODUCTS_STARTED, LOAD_PRODUCTS_FINISHED_SUCCESS, SET_PRODUCT_QUANTITY, PRODUCTS_RESET } from './productsactions';

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
                return update(state, {
                    productsById: {
                        [action.id]: {
                            quantity: {$set: action.value}
                        }
                    }
                });
        }
        case PRODUCTS_RESET: {
            let productsById = state.productsById;
            let newProductsById = {};
            let mainProductsIds = state.mainProductsIds;
            let mainProductsIdsLength = state.mainProductsIds.length;

            for (let i = 0; i < mainProductsIdsLength; i++) {
                let id = mainProductsIds[i];
                let product = productsById[id];

                newProductsById[product.id] = update(product, {
                    quantity: {$set: 0}
                });
            }

            let posProductsIds = state.posProductsIds;
            let posProductsIdsLength = posProductsIds.length;

            for (let i = 0; i < posProductsIdsLength; i++) {
                let id = posProductsIds[i];
                let product = productsById[id];

                newProductsById[product.id] = update(product, {
                    quantity: {$set: 0}
                });
            }

            return update(state, {
                productsById: {$set: newProductsById}
            });
        }
        default:
            return state;
    }
}

export default products;