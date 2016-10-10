import { createSelector } from 'reselect';
import update from 'react-addons-update';

export const mainTotalWithoutDiscountSelector = createSelector(
    [
        (state) => state.products.mainProductsIds,
        (state) => state.products.productsById
    ],
    (mainProductsIds, productsById) => {
        return mainProductsIds.reduce((prev, id) => { return prev + (productsById[id].price * productsById[id].quantity); }, 0);
    }
);

export const posTotalWithoutDiscountSelector = createSelector(
    [
        (state) => state.products.posProductsIds,
        (state) => state.products.productsById
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
            (state) => state.products.productsById
        ],
        (mainProductIds, productsById) => {
            return mainProductIds.map((id) => productsById[id]);
        }
);

export const posProductsSelector = createSelector(
        [
            (state) => state.products.posProductsIds,
            (state) => state.products.productsById,
        ],
        (posProductIds, productsById) => {
            return posProductIds.map((id) => productsById[id]);
        }
);

export const posProductsWithLeftAmountSelector = createSelector(
        [
            (state) => state.products.posProductsIds,
            (state) => state.products.productsById,
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

export const orderSelector = createSelector(
    [
        (state) => state.order.email,
        (state) => state.order.country,
        orderProductsSelector,
        totalWithoutDiscountSelector,
        totalWithDiscountSelector
    ],
    (email, country, orderProducts, totalWithoutDiscount, totalWithDiscount) => {
        return {
            email: email,
            country: country,
            products: orderProducts,
            totalWithoutDiscount: totalWithoutDiscount,
            totalWithDiscount: totalWithDiscount
        };
    }
);