import { createSelector } from 'reselect';

export const categoriesTreeSelector = createSelector(
    [
        (state) => state.categories.categoriesById,
        (state) => state.products.productById
    ],
    (categoriesById, productsById) => {
        let tcategoryById = {};
        tcategoryById['root'] = {
            categoryId: 'root',
            name: 'root',
            childCategoryIds: [],
            productIds: []
        }

        // first walk -> creating categories with childCategoryIds field
        for (let key in categoriesById) {
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
        for (let key in categoriesById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (category.parentCategoryId !== null) {
                tcategoryById[category.parentCategoryId].childCategoryIds.push(category.categoryId);
            } else {
                tcategoryById['root'].childCategoryIds.push(category.categoryId);
            }
        }

        for (let key in productsById) {
            if (!productsById.hasOwnProperty(key))
                continue;

            let product = productsById[key];
            if (product.categoryId !== null) {
                tcategoryById[product.categoryId].productIds.push(key);
            } else {
                tcategoryById['root'].productIds.push(key);
            }
        }

        return tcategoryById;
    }
);