import { createSelector } from 'reselect';
import update from 'react-addons-update';
import { mainProductsSelector, posProductsSelector, totalWithoutDiscountSelector, totalWithDiscountSelector } from './productsselector';

export const orderProductsSelector = createSelector(
    [
        mainProductsSelector,
        posProductsSelector
    ],
    (mainProducts, posProducts) => mainProducts.filter(p => p.product.quantity > 0)
        .map(p => update(p.product, {
            isMain: {$set: true}
        }))
        .concat(posProducts
            .filter(p => p.product.quantity > 0)
            .map(p => update(p.product, {
                isMain: {$set: false}
            })))
);

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
function isEmailValid(email) {
    return re.test(email);
}

export const modalOrderSelector = createSelector(
    [
        (state) => state.emiapp.order,
        orderProductsSelector,
        totalWithoutDiscountSelector,
        totalWithDiscountSelector
    ],
    (order, orderProducts, totalWithoutDiscount, totalWithDiscount) => {
        let email = order.email;
        let emailValid = isEmailValid(email);
        let submitting = order.submitting;

        return {
            email: email,
            emailValid: emailValid,
            country: order.country,
            products: orderProducts,
            totalWithoutDiscount: totalWithoutDiscount,
            totalWithDiscount: totalWithDiscount,
            submitting: submitting,
            canSubmit: emailValid && !submitting
        };
    }
);

export const sendOrderSelector = createSelector(
    [
        (state) => state.emiapp.order,
        orderProductsSelector,
        totalWithoutDiscountSelector,
        totalWithDiscountSelector
    ],
    (order, orderProducts, totalWithoutDiscount, totalWithDiscount) => {
        let email = order.email;
        let products = orderProducts.map(p => {
            return {
                productId: p.productId,
                quantity: p.quantity
            }
        });

        return {
            email: email,
            country: order.country,
            products: products
        };
    }
);