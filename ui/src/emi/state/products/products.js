import update from 'react-addons-update';
import { SET_PRODUCTS, SET_PRODUCT_QUANTITY, PRODUCTS_RESET } from './productsactions';
import { SET_WAREHOUSE } from '../warehouse/warehouseactions';

const initialProductsState = {
    productById: {}
};

function setInitialProductValues(productById) {
    for (let key in productById) {
        if (!productById.hasOwnProperty(key))
            continue;

        let product = productById[key];
        product.quantity = 0;

        if (product.productFeatures.indexOf('MAIN') !== -1) {
            product.type = 'MAIN';
        } else if (product.productFeatures.indexOf('POS') !== -1) {
            product.type = 'POS';
        } else {
            product.type = 'UNKNOWN';
        }
    }

    return productById;
}

function products(state = initialProductsState, action) {
    switch (action.type) {
        case SET_WAREHOUSE:
            return update(state, {
                productById: {$set: setInitialProductValues(action.warehouse.productById)}
            });
        case SET_PRODUCTS:
            return update(state, {
                productById: {$set: setInitialProductValues(action.productById)}
            });
        case SET_PRODUCT_QUANTITY: {
                return update(state, {
                    productById: {
                        [action.productId]: {
                            quantity: {$set: action.value}
                        }
                    }
                });
        }
        case PRODUCTS_RESET: {
            let productById = state.productById;
            let newProductById = {};

            for (let key in productById) {
                if (!productById.hasOwnProperty(key))
                    continue;

                let product = productById[key];

                if (product.quantity !== 0) {
                    newProductById[product.productId] = update(product, {
                        quantity: {$set: 0}
                    });
                } else {
                    newProductById[product.productId] = product;
                }
            }

            return update(state, {
                productById: {$set: newProductById}
            });
        }
        default:
            return state;
    }
}

export default products;