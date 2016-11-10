import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import update from 'react-addons-update';

import { categoriesTreeSelector } from './categoriestree';

function isProductByIdEqual(val1, val2) {
    let val1Keys = 0;
    let val2Keys = 0;
    for (let key in val1) {
        if (!val1.hasOwnProperty(key))
            continue;

        val1Keys++;
        if (!val2.hasOwnProperty(key) || val1[key].type !== val2[key].type) {
            return false;
        }
    }

    for (let key in val2) {
        if (!val2.hasOwnProperty(key))
            continue;

        val2Keys++;
    }

    return val1Keys === val2Keys;
}

function isEqualForProductIdsSelector(val1, val2) {
    switch (val1.type) {
        case 'categoriesTree':
            return val1.value === val2.value;
        case 'productById':
            return isProductByIdEqual(val1.value, val2.value);
        default:
            return val1 === val2;
    }
}

const createProductIdsSelector = createSelectorCreator(
    defaultMemoize,
    isEqualForProductIdsSelector
);

function getProductIds(categoriesTree, id, res) {
    let currentCategory = categoriesTree[id];
    Array.prototype.push.apply(res, currentCategory.productIds);

    let childCategoryIds = currentCategory.childCategoryIds;
    let l = childCategoryIds.length;

    for (let i = 0; i < l; i++) {
        getProductIds(categoriesTree, childCategoryIds[i], res);
    }
}

const productIdsSelector = createProductIdsSelector(
    [
        (state) => { return { type: 'categoriesTree', value: categoriesTreeSelector(state) } },
        (state) => { return { type: 'productById', value: state.warehouse.products.productById } }
    ],
    (categoriesTreeVal, productByIdVal) => {
        let categoriesTree = categoriesTreeVal.value;
        let productById = productByIdVal.value;

        let allProductIds = [];
        getProductIds(categoriesTree, 'root', allProductIds);

        let mainProductIds = [];
        let posProductIds = [];

        let l = allProductIds.length;

        for (let i = 0; i < l; i++) {
            let product = productById[allProductIds[i]];

            if (product.type === 'MAIN') {
                mainProductIds.push(allProductIds[i]);
            } else if (product.type === 'POS') {
                posProductIds.push(allProductIds[i]);
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