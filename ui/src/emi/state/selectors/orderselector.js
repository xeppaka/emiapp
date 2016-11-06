import { createSelector } from 'reselect';
import { mainProductsSelector, posProductsSelector, totalWithoutDiscountSelector, totalWithDiscountSelector } from './productsselector';

export const orderProductsSelector = createSelector(
    [
        mainProductsSelector,
        posProductsSelector
    ],
    (mainProducts, posProducts) => mainProducts.filter(p => p.quantity > 0).concat(posProducts.filter(p => p.quantity > 0))
);

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
function isEmailValid(email) {
    return re.test(email);
}

export const orderSelector = createSelector(
    [
        (state) => state.order,
        orderProductsSelector,
        totalWithoutDiscountSelector,
        totalWithDiscountSelector
    ],
    (order, orderProducts, totalWithoutDiscount, totalWithDiscount) => {
        let emailValid = isEmailValid(order.email);
        let submitting = order.submitting;

        return {
            email: order.email,
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