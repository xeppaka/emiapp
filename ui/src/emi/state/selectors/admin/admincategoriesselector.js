import { createSelector } from 'reselect';
import update from 'react-addons-update';

function getDefaultRootCategory() {
    return {
        categoryId: 'root',
        name: '',
        anchor: '',
        childCategoryIds: [],
        parentCategoryId: null,
        productIds: []
    }
}

function createCategoriesComparator(categoryById) {
    return function compareCategories(categoryId1, categoryId2) {
        let category1 = categoryById[categoryId1];
        let category2 = categoryById[categoryId2];

        if (category1.weight < category2.weight) {
            return -1;
        }

        if (category1.weight > category2.weight) {
            return 1;
        }

        return category1.name.localeCompare(category2.name);
    }
}

function sortCategoryTree(categoryById) {
    sortCategoryTreeWithComparator('root',
        categoryById,
        createCategoriesComparator(categoryById));
}

function sortCategoryTreeWithComparator(catId, categoryById, categoriesComparator) {
    let category = categoryById[catId];
    category.childCategoryIds = category.childCategoryIds.sort(categoriesComparator);

    let l = category.childCategoryIds.length;
    for (let i = 0; i < l; i++) {
        sortCategoryTreeWithComparator(category.childCategoryIds[i], categoryById, categoriesComparator);
    }
}

export const adminCategoriesTreeSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.admin.modifiedCategoryById,
        (state) => state.warehouse.products.productById,
        (state) => state.admin.modifiedProductById,
        (state) => state.admin.deletedProducts,
        (state) => state.admin.deletedCategories
    ],
    (categoryById, modifiedCategoryById, productById, modifiedProductById, deletedProductIds, deletedCategoryIds) => {
        let tcategoryById = {};

        // creating categories with childCategoryIds field from modifiedCategoryById
        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key))
                continue;

            let category = modifiedCategoryById[key];
            if (!tcategoryById.hasOwnProperty(key)) {
                tcategoryById[key] = update(category, {
                    childCategoryIds: {$set: []},
                    productIds: {$set: []}
                });
            }
        }

        // creating categories with childCategoryIds field from categoryById
        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key) || deletedCategoryIds.indexOf(key) >= 0)
                continue;

            let category = categoryById[key];
            if (!tcategoryById.hasOwnProperty(key)) {
                tcategoryById[key] = update(category, {
                    childCategoryIds: {$set: []},
                    productIds: {$set: []}
                });
            }
        }

        let rootCategoryId = null;
        // second walk -> fill childCategoryIds and parentCategoryName fields
        for (let key in tcategoryById) {
            if (!tcategoryById.hasOwnProperty(key))
                continue;

            let category = tcategoryById[key];
            if (category.parentCategoryId !== null && !tcategoryById.hasOwnProperty(category.parentCategoryId))
                continue;

            if (category.parentCategoryId !== null) {
                let parentKey = category.parentCategoryId;
                let parentCategory = tcategoryById[parentKey];
                parentCategory.childCategoryIds.push(key);
                category.parentCategoryName = parentCategory.name;
            } else {
                rootCategoryId = category.categoryId;
                category.parentCategoryName = '-----';
            }
        }

        if (rootCategoryId !== null) {
            tcategoryById.root = tcategoryById[rootCategoryId];
        } else {
            tcategoryById.root = getDefaultRootCategory();
        }

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key) || modifiedProductById[key] === null)
                continue;

            if (deletedProductIds.indexOf(key) >= 0) {
                continue;
            }

            let product = modifiedProductById[key];
            if (tcategoryById.hasOwnProperty(product.categoryId)) {
                tcategoryById[product.categoryId].productIds.push(product.productId);
            }
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            if (deletedProductIds.indexOf(key) >= 0) {
                continue;
            }

            if (modifiedProductById.hasOwnProperty(key) && modifiedProductById[key] !== null)
                continue;

            let product = productById[key];
            if (tcategoryById.hasOwnProperty(product.categoryId)) {
                tcategoryById[product.categoryId].productIds.push(product.productId);
            }
        }

        sortCategoryTree(tcategoryById);

        return tcategoryById;
    }
);

export const adminCategoriesListSelector = createSelector(
    [
        adminCategoriesTreeSelector
    ],
    (categoryTree) => {
        let idsQueue = ['root'];
        let categoriesList = [];

        while (idsQueue.length > 0) {
            let catId = idsQueue.pop();
            let category = categoryTree[catId];
            categoriesList.push(category);

            for (let i = category.childCategoryIds.length; i > 0; i--) {
                idsQueue.push(category.childCategoryIds[i - 1]);
            }
        }

        return categoriesList;
    }
);

export const adminCategoryCountersSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.admin.modifiedCategoryById,
        (state) => state.admin.deletedCategories
    ],
    (categoryById, modifiedCategoryById, deletedCategoryIds) => {
        let createdCategoryCount = 0;
        let modifiedCategoryCount = 0;

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key) || modifiedCategoryById[key] === null)
                continue;

            if (categoryById.hasOwnProperty(key)) {
                modifiedCategoryCount++;
            } else {
                createdCategoryCount++;
            }
        }

        return {
            createdCategories: createdCategoryCount,
            modifiedCategories: modifiedCategoryCount,
            deletedCategories: deletedCategoryIds.length
        }
    }
);

function convertCategoryToViewCategory(category, categoryById) {
    return update(category, {
        parentCategoryName: {$set: category.parentCategoryId === null ?
            '-----' : categoryById[category.parentCategoryId].name}
    });
}

export const modifiedCategoriesListSelector = createSelector(
    [
        adminCategoriesTreeSelector,
        (state) => state.admin.modifiedCategoryById,
        (state) => state.admin.deletedCategories
    ],
    (categoryById, modifiedCategoryById, deletedCategoryIds) => {
        let screatedCategories = [];
        let smodifiedCategories = [];
        let sdeletedCategories = [];

        for (let i = 0; i < deletedCategoryIds.length; i++) {
            if (!categoryById.hasOwnProperty(deletedCategoryIds[i]))
                continue;

            let category = categoryById[deletedCategoryIds[i]];
            sdeletedCategories.push(convertCategoryToViewCategory(category, categoryById));
        }

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key) || modifiedCategoryById[key] === null)
                continue;

            let category = convertCategoryToViewCategory(modifiedCategoryById[key], categoryById);
            if (categoryById.hasOwnProperty(key)) {
                smodifiedCategories.push(category);
            } else {
                screatedCategories.push(category);
            }
        }

        return {
            createdCategories: screatedCategories,
            modifiedCategories: smodifiedCategories,
            deletedCategories: sdeletedCategories
        };
    }
);

export const modifiedCategoriesListSaveSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.admin.modifiedCategoryById,
        (state) => state.admin.deletedCategories
    ],
    (categoryById, modifiedCategoryById, deletedCategoryIds) => {
        let screatedCategories = [];
        let smodifiedCategories = [];
        let sdeletedCategories = [];

        for (let i = 0; i < deletedCategoryIds.length; i++) {
            if (!categoryById.hasOwnProperty(deletedCategoryIds[i]))
                continue;

            sdeletedCategories.push(deletedCategoryIds[i]);
        }

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key) || modifiedCategoryById[key] === null)
                continue;

            let category = modifiedCategoryById[key];
            if (categoryById.hasOwnProperty(key)) {
                smodifiedCategories.push(category);
            } else {
                screatedCategories.push(category);
            }
        }

        return {
            createdCategories: screatedCategories,
            modifiedCategories: smodifiedCategories,
            deletedCategories: sdeletedCategories
        };
    }

);