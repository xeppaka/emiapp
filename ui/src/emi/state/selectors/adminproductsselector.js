import { createSelector } from 'reselect';
import update from 'react-addons-update';

export const adminProductsSelector = createSelector(
    [
        (state) => state.warehouse.products.productById,
        (state) => state.admin.modifiedProductById,
        (state) => state.admin.deletedProducts
    ],
    (productById, modifiedProductById, deletedProductIds) => {
        let resultProductById = {};

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (!resultProductById.hasOwnProperty(key)) {
                let type = productById.hasOwnProperty(key) ? 'MODIFIED' : 'CREATED';

                resultProductById[key] = update(modifiedProductById[key], {
                    type: {$set: type}
                });
            }
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            if (!resultProductById.hasOwnProperty(key)) {
                let type = deletedProductIds.indexOf(key) >= 0 ? 'DELETED' : 'UNCHANGED';

                resultProductById[key] = update(productById[key], {
                    type: {$set: type}
                });
            }
        }

        return resultProductById;
    }
);