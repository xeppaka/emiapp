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
        let newProductsCount = 0;

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                if (categoryById.hasOwnProperty(key)) {
                    modifiedProductsCount++;
                } else {
                    newProductsCount++;
                }
            }
        }

        return {
            newProducts: newProductsCount,
            deletedProducts: deletedProductIds.length,
            modifiedProducts: modifiedProductsCount
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

export const adminProductListSaveSelector = createSelector(
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