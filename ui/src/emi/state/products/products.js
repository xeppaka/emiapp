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
            let productIds = action.products.productIds;
            let productIdsLength = productIds.length;
            let productsById = action.products.productsById;

            let mainProductsIds = [];
            let posProductsIds = [];

            for (let i = 0; i < productIdsLength; i++) {
                let product = productsById[productIds[i]];
                // product.id = i;

                if (product.isMain()) {
                    mainProductsIds.push(productIds[i]);
                }

                if (product.isPos()) {
                    posProductsIds.push(productIds[i]);
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