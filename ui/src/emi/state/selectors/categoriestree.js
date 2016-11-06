import { createSelector } from 'reselect';

export const categoriesTreeSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.warehouse.products.productById
    ],
    (categoryById, productById) => {
        let tcategoryById = {};
        tcategoryById['root'] = {
            categoryId: 'root',
            name: 'Product Categories',
            childCategoryIds: [],
            productIds: []
        }

        // first walk -> creating categories with childCategoryIds field
        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (!tcategoryById.hasOwnProperty(key)) {
                tcategoryById[key] = {
                    categoryId: category.categoryId,
                    name: category.name,
                    childCategoryIds: [],
                    productIds: []
                };
            }
        }

        // second walk -> fill childCategoryIds field
        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (category.parentCategoryId !== null) {
                tcategoryById[category.parentCategoryId].childCategoryIds.push(category.categoryId);
            } else {
                tcategoryById['root'].childCategoryIds.push(category.categoryId);
            }
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let product = productById[key];
            if (product.categoryId !== null) {
                tcategoryById[product.categoryId].productIds.push(key);
            } else {
                tcategoryById['root'].productIds.push(key);
            }
        }

        return tcategoryById;
    }
);