import { createSelector } from 'reselect';

export const adminProductsSelector = createSelector(
    [
        (state) => state.emiapp.warehouse.products.productById,
        (state) => state.emiapp.admin.modifiedProductById,
        (state) => state.emiapp.admin.deletedProducts
    ],
    (productById, modifiedProductById, deletedProductIds) => {
        let adminProductById = {};
        let adminModificationTypeById = {};

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (!adminProductById.hasOwnProperty(key)) {
                let type = productById.hasOwnProperty(key) ? 'MODIFIED' : 'CREATED';

                adminProductById[key] = modifiedProductById[key];
                adminModificationTypeById[key] = type;
            }
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            if (!adminProductById.hasOwnProperty(key)) {
                let type = deletedProductIds.indexOf(key) >= 0 ? 'DELETED' : 'UNCHANGED';

                adminProductById[key] = productById[key];
                adminModificationTypeById[key] = type;
            }
        }

        return {
            productById: adminProductById,
            modificationTypeById: adminModificationTypeById
        };
    }
);
