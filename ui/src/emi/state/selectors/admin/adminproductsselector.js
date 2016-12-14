import update from 'react-addons-update';
import { createSelector } from 'reselect';
import { adminCategoriesTreeSelector } from './admincategoriesselector';

export const adminProductCountersSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.admin.modifiedProductById,
        (state) => state.admin.deletedProducts
    ],
    (categoryById, modifiedProductById, deletedProductIds) => {
        let modifiedProductsCount = 0;
        let createdProductsCount = 0;

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key) || modifiedProductById[key] === null)
                continue;

            if (categoryById.hasOwnProperty(key)) {
                modifiedProductsCount++;
            } else {
                createdProductsCount++;
            }
        }

        return {
            createdProducts: createdProductsCount,
            modifiedProducts: modifiedProductsCount,
            deletedProducts: deletedProductIds.length
        };
    }
);

export const adminProductListSelector = createSelector(
    [
        adminCategoriesTreeSelector,
        (state) => state.warehouse.products.productById,
        (state) => state.admin.modifiedProductById
    ],
    (adminCategoriesById, productById, modifiedProductById) => {
        let categoryIds = ['root'];
        let productIds = [];

        while (categoryIds.length > 0) {
            let catId = categoryIds.pop();
            let category = adminCategoriesById[catId];

            for (let i = 0; i < category.productIds.length; i++) {
                productIds.push(category.productIds[i]);
            }

            for (let i = category.childCategoryIds.length; i > 0; i--) {
                categoryIds.push(category.childCategoryIds[i - 1]);
            }
        }

        return productIds.map(id => {
            let product;

            if (modifiedProductById.hasOwnProperty(id) && modifiedProductById[id] !== null) {
                product = modifiedProductById[id];
            } else {
                product = productById[id];
            }

            return { product: product };
        });
    }
);

function convertProductToViewProduct(product, categoryById) {
    return update(product, {
        categoryName: {$set: categoryById[product.categoryId].name},
        features: {$apply: features => features
            .map(f => f.substring(0,1))
            .reduce((acc, cval, idx, arr) =>
                (idx + 1 === arr.length) ? (acc + cval) : (acc + cval + ':'), '')
        }
    });
}

export const adminModifiedProductsSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.warehouse.products.productById,
        (state) => state.admin.modifiedProductById,
        (state) => state.admin.deletedProducts
    ],
    (categoryById, productById, modifiedProductById, deletedProductIds) => {
        let screatedProducts = [];
        let smodifiedProducts = [];
        let sdeletedProducts = [];

        for (let i = 0; i < deletedProductIds.length; i++) {
            if (!productById.hasOwnProperty(deletedProductIds[i]))
                continue;

            let product = productById[deletedProductIds[i]];
            sdeletedProducts.push(convertProductToViewProduct(product, categoryById));
        }

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key) || modifiedProductById[key] === null)
                continue;

            let product = convertProductToViewProduct(modifiedProductById[key], categoryById);
            if (!productById.hasOwnProperty(key)) {
                screatedProducts.push(product);
            } else {
                smodifiedProducts.push(product);
            }
        }

        return {
            createdProducts: screatedProducts,
            modifiedProducts: smodifiedProducts,
            deletedProducts: sdeletedProducts
        };
    }
);

export const adminModifiedProductsSaveSelector = createSelector(
    [
        (state) => state.warehouse.products.productById,
        (state) => state.admin.modifiedProductById,
        (state) => state.admin.deletedProducts
    ],
    (productById, modifiedProductById, deletedProductIds) => {
        let screatedProducts = [];
        let smodifiedProducts = [];
        let sdeletedProductIds = [];

        for (let i = 0; i < deletedProductIds.length; i++) {
            if (productById.hasOwnProperty(deletedProductIds[i])) {
                sdeletedProductIds.push(deletedProductIds[i]);
            }
        }

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key) || modifiedProductById[key] === null)
                continue;

            if (deletedProductIds.indexOf(key) >= 0) {
                continue;
            }

            let product = modifiedProductById[key];
            if (!productById.hasOwnProperty(key)) {
                screatedProducts.push(product);
            } else {
                smodifiedProducts.push(product);
            }
        }

        return {
            createdProducts: screatedProducts,
            modifiedProducts: smodifiedProducts,
            deletedProducts: sdeletedProductIds
        };
    }
);