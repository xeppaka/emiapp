import { createSelector } from 'reselect';

export const adminProductsSelector = createSelector(
    [
        (state) => state.emiapp.warehouse.products.productById,
        (state) => state.emiapp.admin.modifiedProductById,
        (state) => state.emiapp.admin.deletedProducts
    ],
    (productById, modifiedProductById, deletedProductIds) => {
        let adminProductById = {};
        let modificationById = {};

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (!adminProductById.hasOwnProperty(key)) {
                let modification = deletedProductIds.indexOf(key) >= 0 ? 'DELETED' : productById.hasOwnProperty(key) ? 'MODIFIED' : 'CREATED';

                adminProductById[key] = modifiedProductById[key];
                modificationById[key] = modification;
            }
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            if (!adminProductById.hasOwnProperty(key)) {
                let modification = deletedProductIds.indexOf(key) >= 0 ? 'DELETED' : 'UNCHANGED';

                adminProductById[key] = productById[key];
                modificationById[key] = modification;
            }
        }

        return {
            productById: adminProductById,
            modificationById: modificationById
        };
    }
);
