import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect';
import update from 'react-addons-update';
import {adminProductsSelector} from './adminproductsselector';
import {categoriesTreeSelector} from './categoriesselector';
import {adminCategoriesTreeSelector} from './categoriesselector';

function isProductByIdEqual(val1, val2) {
    let val1Keys = 0;
    let val2Keys = 0;
    for (let key in val1) {
        if (!val1.hasOwnProperty(key))
            continue;

        val1Keys++;
        if (!val2.hasOwnProperty(key) || (val1[key].type !== val2[key].type)) {
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

function isPos(prevPos, category, rootCategoryId) {
    return prevPos || ((category.parentCategoryId === rootCategoryId) && (category.name === 'POS'));
}

function getProductIds(categoryById, id, productIds, isPos, prevPos = false) {
    let currentCategory = categoryById[id];
    let pos = isPos(prevPos, currentCategory, categoryById['root'].categoryId);
    if (pos) {
        Array.prototype.push.apply(productIds.posProductIds, currentCategory.productIds);
    } else {
        Array.prototype.push.apply(productIds.mainProductIds, currentCategory.productIds);
    }

    let childCategoryIds = currentCategory.childCategoryIds;
    let l = childCategoryIds.length;

    for (let i = 0; i < l; i++) {
        let childCategoryId = childCategoryIds[i];
        getProductIds(categoryById, childCategoryId, productIds, isPos, pos);
    }
}

const productIdsSelector = createProductIdsSelector(
    [
        (state) => {
            return {type: 'categoriesTree', value: categoriesTreeSelector(state)}
        }
    ],
    (categoriesTreeVal) => {
        let categoryById = categoriesTreeVal.value;

        let productIds = {
            mainProductIds: [],
            posProductIds: []
        };
        getProductIds(categoryById, 'root', productIds, isPos);

        return productIds;
    }
);

function fillProductAnchorsRecursively(categoriesTree, currentCategory, categoryAnchors, categoryNames, res) {
    let hasProducts = currentCategory.productIds.length > 0;

    categoryAnchors.push(currentCategory.anchor);
    categoryNames.push(currentCategory.name);

    if (hasProducts) {
        let productIds = currentCategory.productIds;
        let productIdsLength = productIds.length;

        res[productIds[0]] = {
            name: currentCategory.anchor,
            categoryAnchors: categoryAnchors.slice(0),
            categoryNames: categoryNames.slice(0)
        };

        for (let i = 1; i < productIdsLength; i++) {
            res[productIds[i]] = {
                name: currentCategory.anchor
            };
        }

        while (categoryAnchors.length > 0) {
            categoryAnchors.pop();
        }
        while (categoryNames.length > 0) {
            categoryNames.pop();
        }
    }

    let childCategoryIds = currentCategory.childCategoryIds;
    let childCategoryIdsLength = childCategoryIds.length;

    for (let i = 0; i < childCategoryIdsLength; i++) {
        fillProductAnchorsRecursively(categoriesTree, categoriesTree[childCategoryIds[i]], categoryAnchors, categoryNames, res);
    }

    categoryAnchors.pop();
    categoryNames.pop();
}

function getProductAnchorsById(categoriesTree) {
    let result = {};

    fillProductAnchorsRecursively(categoriesTree, categoriesTree['root'], [], [], result);
    return result;
}

export const productAnchorsSelector = createSelector(
    [
        categoriesTreeSelector
    ],
    (categoriesTree) => {
        return getProductAnchorsById(categoriesTree);
    }
);

export const mainTotalWithoutDiscountSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.emiapp.warehouse.products.productById
    ],
    (productIds, productById) => {
        return productIds.mainProductIds.reduce((prev, id) => {
            return prev + (productById[id].price * productById[id].quantity);
        }, 0);
    }
);

export const posTotalWithoutDiscountSelector = createSelector(
    [
        productIdsSelector,
        (state) => state.emiapp.warehouse.products.productById
    ],
    (productIds, productById) => {
        return productIds.posProductIds.reduce((prev, id) => {
            return prev + (productById[id].price * productById[id].quantity);
        }, 0);
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
        productAnchorsSelector,
        (state) => state.emiapp.warehouse.products.productById
    ],
    (productIds, anchorsById, productById) => {
        return productIds.mainProductIds
            .filter((id) => productById[id].features.indexOf('VISIBLE') >= 0)
            .map((id) => {
                return {product: productById[id], anchor: anchorsById[id]}
            });
    }
);

export const posProductsSelector = createSelector(
    [
        productIdsSelector,
        productAnchorsSelector,
        (state) => state.emiapp.warehouse.products.productById,
    ],
    (productIds, anchorsById, productById) => {
        return productIds.posProductIds
            .filter((id) => productById[id].features.indexOf('VISIBLE') >= 0)
            .map((id) => {
                return {product: productById[id], anchor: anchorsById[id]}
            });
    }
);

export const posProductsWithLeftAmountSelector = createSelector(
    [
        productIdsSelector,
        productAnchorsSelector,
        (state) => state.emiapp.warehouse.products.productById,
        posAmountToOrderSelector
    ],
    (productIds, anchorsById, productById, posAmount) => {
        return productIds.posProductIds.map((id) => {
            let product = productById[id];
            let piecesLeftToOrder = posAmount >= 0 ? Math.floor((posAmount / product.price)) : 0;

            return {product: update(product, {piecesLeftToOrder: {$set: piecesLeftToOrder}}), anchor: anchorsById[id]}
        });
    }
);

export const adminProductCountersSelector = createSelector(
    [
        adminProductsSelector
    ],
    (products) => {
        let productById = products.productById;
        let modificationById = products.modificationById;
        let createdProductsCount = 0;
        let modifiedProductsCount = 0;
        let deletedProductsCount = 0;

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let modification = modificationById[key];
            if (modification === 'CREATED') {
                createdProductsCount++;
            } else if (modification === 'MODIFIED') {
                modifiedProductsCount++;
            } else if (modification === 'DELETED') {
                deletedProductsCount++;
            }
        }

        return {
            createdProducts: createdProductsCount,
            modifiedProducts: modifiedProductsCount,
            deletedProducts: deletedProductsCount
        };
    }
);

const adminProductIdsSelector = createProductIdsSelector(
    [
        adminCategoriesTreeSelector
    ],
    (categoryById) => {
        let productIds = {
            mainProductIds: [],
            posProductIds: []
        };
        getProductIds(categoryById, 'root', productIds, () => false);

        return productIds;
    }
);

export const adminProductListSelector = createSelector(
    [
        adminProductIdsSelector,
        adminProductsSelector
    ],
    (productIds, products) => {
        let productById = products.productById;

        return {
            productList: productIds.mainProductIds.map(id => productById[id]),
            modificationById: products.modificationById
        }
    }
);

function convertProductToViewProduct(product, categoryById) {
    return update(product, {
        categoryName: {$set: categoryById[product.categoryId].name},
        features: {
            $apply: features => features
                .map(f => f.substring(0, 1))
                .reduce((acc, cval, idx, arr) =>
                    (idx + 1 === arr.length) ? (acc + cval) : (acc + cval + ':'), '')
        }
    });
}

export const adminModifiedProductsSelector = createSelector(
    [
        adminProductsSelector
    ],
    (products) => {
        let productById = products.productById;
        let modificationById = products.modificationById;
        let createdProducts = [];
        let modifiedProducts = [];
        let deletedProducts = [];

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let product = productById[key];
            let modification = modificationById[key];
            if (modification === 'CREATED') {
                createdProducts.push(product);
            } else if (modification === 'MODIFIED') {
                modifiedProducts.push(product);
            } else if (modification === 'DELETED') {
                deletedProducts.push(product);
            }
        }

        return {
            createdProducts: createdProducts,
            modifiedProducts: modifiedProducts,
            deletedProducts: deletedProducts
        };
    }
);

export const adminModifiedProductsViewSelector = createSelector(
    [
        adminCategoriesTreeSelector,
        adminModifiedProductsSelector
    ],
    (categoryById, saveProducts) => {
        return {
            createdProducts: saveProducts.createdProducts.map(product => convertProductToViewProduct(product, categoryById)),
            modifiedProducts: saveProducts.modifiedProducts.map(product => convertProductToViewProduct(product, categoryById)),
            deletedProducts: saveProducts.deletedProducts.map(product => convertProductToViewProduct(product, categoryById))
        };
    }
);
