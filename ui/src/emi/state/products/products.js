import update from 'react-addons-update';
import { SET_PRODUCTS, SET_PRODUCT_QUANTITY, PRODUCTS_RESET } from './productsactions';
import { SET_WAREHOUSE } from '../warehouse/warehouseactions';
import { ACCEPT_MODIFIED_PRODUCTS } from '../admin/adminactions';

const initialProductsState = {
    productById: {}
};

function setInitialProductValues(productById) {
    for (let key in productById) {
        if (!productById.hasOwnProperty(key))
            continue;

        let product = productById[key];
        product.quantity = 0;
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
        case ACCEPT_MODIFIED_PRODUCTS: {
            let products = action.products;
            let newState = state;

            for (let i = 0; i < products.length; i++) {
                newState = update(newState, {
                    [products[i].productId]: { $set: products[i] }
                });
            }

            return newState;
        }
        default:
            return state;
    }
}

export default products;