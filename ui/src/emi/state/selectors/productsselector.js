import { createSelector } from 'reselect';
import update from 'react-addons-update';

const productIdsSelector = createSelector(
    [
        (state) => state.warehouse.products.productById
    ],
    (productById) => {
        let mainProductIds = [];
        let posProductIds = [];

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let product = productById[key];
            if (product.type === 'MAIN') {
                mainProductIds.push(key);
            } else if (product.type === 'POS') {
                posProductIds.push(key);
            }
        }

        return {
            mainProductIds: mainProductIds,
            posProductIds: posProductIds
        }
    }
);

export const mainTotalWithoutDiscountSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.warehouse.products.productById
    ],
    (productIds, productById) => {
        return productIds.mainProductIds.reduce((prev, id) => { return prev + (productById[id].price * productById[id].quantity); }, 0);
    }
);

export const posTotalWithoutDiscountSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.warehouse.products.productById
    ],
    (productIds, productById) => {
        return productIds.posProductIds.reduce((prev, id) => { return prev + (productById[id].price * productById[id].quantity); }, 0);
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
        productIdsSelector,
        (state) => state.warehouse.products.productById
    ],
    (productIds, productById) => {
        return productIds.mainProductIds.map((id) => productById[id]);
    }
);

export const posProductsSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.warehouse.products.productById,
    ],
    (productIds, productById) => {
        return productIds.posProductIds.map((id) => productById[id]);
    }
);

export const posProductsWithLeftAmountSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.warehouse.products.productById,
        posAmountToOrderSelector
    ],
    (productIds, productById, posAmount) => {
        return productIds.posProductIds.map((id) => {
            let product = productById[id];
            let piecesLeftToOrder = posAmount >= 0 ? Math.floor((posAmount / product.price)) : 0;

            return update(product, {
                piecesLeftToOrder: {$set: piecesLeftToOrder}
            });
        });
    }
);