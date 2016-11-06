import update from 'react-addons-update';
import { SET_PRODUCTS, SET_PRODUCT_QUANTITY, PRODUCTS_RESET } from './productsactions';

const initialProductsState = {
    productById: {}
};

function products(state = initialProductsState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return update(state, {
                productById: {$set: action.productById}
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