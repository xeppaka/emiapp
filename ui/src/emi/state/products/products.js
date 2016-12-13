import update from 'react-addons-update';
import { UPDATE_PRODUCTS, SET_PRODUCT_QUANTITY, PRODUCTS_RESET, REMOVE_PRODUCT } from './productsactions';
import { SET_WAREHOUSE } from '../warehouse/warehouseactions';

const initialProductsState = {
    productById: {}
};

function setZeroQuantity(productById) {
    for (let key in productById) {
        if (!productById.hasOwnProperty(key))
            continue;

        let product = productById[key];
        product.quantity = 0;
    }

    return productById;
}

function setZeroQuantityToList(products) {
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        product.quantity = 0;
    }

    return products;
}

function products(state = initialProductsState, action) {
    switch (action.type) {
        case SET_WAREHOUSE:
            return update(state, {
                productById: {$set: setZeroQuantity(action.warehouse.productById)}
            });
        case UPDATE_PRODUCTS:
            let updatedProducts = setZeroQuantityToList(action.products);
            let updatedState = state;

            for (let i = 0; i < updatedProducts.length; i++) {
                updatedState = update(updatedState, {
                    productById: {
                        [updatedProducts[i].productId]: {$set: updatedProducts[i]}
                    }
                });
            }

            return updatedState;
        case REMOVE_PRODUCT: {
            let productId = action.productId;
            let updatedState = update(state, {
                productById: {
                    [productId]: {$set: null}
                }
            });

            delete updatedState.productById[productId];
            return updatedState;
        }
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
        // case ACCEPT_MODIFIED_PRODUCTS: {
        //     let products = action.products;
        //     let newState = state;
        //
        //     for (let i = 0; i < products.length; i++) {
        //         newState = update(newState, {
        //             [products[i].productId]: { $set: products[i] }
        //         });
        //     }
        //
        //     return newState;
        // }
        default:
            return state;
    }
}

export default products;