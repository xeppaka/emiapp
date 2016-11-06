import { createSelector } from 'reselect';
import update from 'react-addons-update';

export const mainTotalWithoutDiscountSelector = createSelector(
    [
        (state) => state.products.mainProductsIds,
        (state) => state.products.productById
    ],
    (mainProductsIds, productsById) => {
        return mainProductsIds.reduce((prev, id) => { return prev + (productsById[id].price * productsById[id].quantity); }, 0);
    }
);

export const posTotalWithoutDiscountSelector = createSelector(
    [
        (state) => state.products.posProductsIds,
        (state) => state.products.productById
    ],
    (posProductsIds, productsById) => {
        return posProductsIds.reduce((prev, id) => { return prev + (productsById[id].price * productsById[id].quantity); }, 0);
    }
);

export const totalWithoutDiscountSelector = createSelector(
    [
        mainTotalWithoutDiscountSelector,
        posTotalWithoutDiscountSelector
    ],
    (mainTotalWithoutDiscount, posTotalWithoutDiscount) => mainTotalWithoutDiscount + posTotalWithoutDiscount
);

export const totalWithDiscountSelector = createSelector(
    [
        mainTotalWithoutDiscountSelector
    ],
    (mainTotalWithoutDiscount) => mainTotalWithoutDiscount / 2
);

export const posAmountToOrderSelector = createSelector(
    [
        mainTotalWithoutDiscountSelector,
        posTotalWithoutDiscountSelector
    ],
    (mainTotalWithoutDiscount, posTotalWithoutDiscount) => mainTotalWithoutDiscount * 0.06 - posTotalWithoutDiscount
);

export const mainProductsSelector = createSelector(
        [
            (state) => state.products.mainProductsIds,
            (state) => state.products.productById
        ],
        (mainProductIds, productsById) => {
            return mainProductIds.map((id) => productsById[id]);
        }
);

export const posProductsSelector = createSelector(
        [
            (state) => state.products.posProductsIds,
            (state) => state.products.productById,
        ],
        (posProductIds, productsById) => {
            return posProductIds.map((id) => productsById[id]);
        }
);

export const posProductsWithLeftAmountSelector = createSelector(
        [
            (state) => state.products.posProductsIds,
            (state) => state.products.productById,
            posAmountToOrderSelector
        ],
        (posProductIds, productsById, posAmount) => {
            return posProductIds.map((id) => {
                let product = productsById[id];
                let piecesLeftToOrder = posAmount >= 0 ? Math.floor((posAmount / product.price)) : 0;

                return update(product, {
                    piecesLeftToOrder: {$set: piecesLeftToOrder}
                });
            });
        }
);

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