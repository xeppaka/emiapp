import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import update from 'react-addons-update';
import { createCategoriesTree } from './categoriestreecreator';
import { createCategoriesList, createAdminCategoriesList } from './categorieslistcreator';
import { adminProductsSelector } from './adminproductsselector';

function isProductByIdEqual(val1, val2) {
    let val1Keys = 0;
    let val2Keys = 0;
    for (let key in val1) {
        if (!val1.hasOwnProperty(key))
            continue;

        val1Keys++;
        if (!val2.hasOwnProperty(key) || (val1[key].categoryId !== val2[key].categoryId)) {
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

function isCategoryByIdEqual(val1, val2) {
    let val1Keys = 0;
    let val2Keys = 0;
    for (let key in val1) {
        if (!val1.hasOwnProperty(key))
            continue;

        val1Keys++;
        if (!val2.hasOwnProperty(key) || val1[key].parentCategoryId !== val2[key].parentCategoryId) {
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

function isEqual(val1, val2) {
    switch (val1.type) {
        case 'categoryById':
            return isCategoryByIdEqual(val1.value, val2.value);
        case 'productById':
            return isProductByIdEqual(val1.value, val2.value);
        default:
            return val1 === val2;
    }
}

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

export const categoriesTreeSelector = createDeepEqualSelector(
    [
        (state) => { return { type: 'categoryById', value: state.warehouse.categories.categoryById } },
        (state) => { return { type: 'productById', value: state.warehouse.products.productById } }
    ],
    (categoryByIdVal, productByIdVal) => {
        let categoryById = categoryByIdVal.value;
        let productById = productByIdVal.value;

        return createCategoriesTree(categoryById, productById);
    }
);

export const categoriesListSelector = createSelector(
    [
        categoriesTreeSelector
    ],
    (categoryTree) => {
        return createCategoriesList(categoryTree);
    }
);

export const adminCategoriesSelector = createSelector(
    [
        (state) => state.warehouse.categories.categoryById,
        (state) => state.admin.modifiedCategoryById,
        (state) => state.admin.deletedCategories
    ],
    (categoryById, modifiedCategoryById, deletedCategoryIds) => {
        let resultCategoryById = {};

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key))
                continue;

            if (!resultCategoryById.hasOwnProperty(key)) {
                let type = categoryById.hasOwnProperty(key) ? 'MODIFIED' : 'CREATED';

                resultCategoryById[key] = update(modifiedCategoryById[key], {
                    type: {$set: type}
                });
            }
        }

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            if (!resultCategoryById.hasOwnProperty(key)) {
                let type = deletedCategoryIds.indexOf(key) >= 0 ? 'DELETED' : 'UNCHANGED';

                resultCategoryById[key] = update(categoryById[key], {
                    type: {$set: type}
                });
            }
        }

        return resultCategoryById;
    }
);

export const adminCategoriesTreeSelector = createDeepEqualSelector(
    [
        (state) => { return { type: 'categoryById', value: adminCategoriesSelector(state) } },
        (state) => { return { type: 'productById', value: adminProductsSelector(state) } }
    ],
    (categoryByIdVal, productByIdVal) => {
        let categoryById = categoryByIdVal.value;
        let productById = productByIdVal.value;

        return createCategoriesTree(categoryById, productById);
    }
);

export const adminCategoriesListSelector = createSelector(
    [
        adminCategoriesTreeSelector
    ],
    (categoryTree) => {
        return createAdminCategoriesList(categoryTree);
    }
);

export const adminCategoryCountersSelector = createSelector(
    [
        adminCategoriesSelector
    ],
    (categoryById) => {
        let createdCategoryCount = 0;
        let modifiedCategoryCount = 0;
        let deletedCategoryCount = 0;

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];

            if (category.type === 'CREATED') {
                createdCategoryCount++;
            } else if (category.type === 'MODIFIED') {
                modifiedCategoryCount++;
            } else if (category.type === 'DELETED') {
                deletedCategoryCount++;
            }
        }

        return {
            createdCategories: createdCategoryCount,
            modifiedCategories: modifiedCategoryCount,
            deletedCategories: deletedCategoryCount
        }
    }
);

function convertCategoryToViewCategory(category, categoryById) {
    return update(category, {
        parentCategoryName: {
            $set: category.parentCategoryId === null ? '-----' : categoryById[category.parentCategoryId].name
        }
    });
}

export const modifiedCategoriesListSelector = createSelector(
    [
        adminCategoriesSelector
    ],
    (categoryById) => {
        let createdCategories = [];
        let modifiedCategories = [];
        let deletedCategories = [];

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = convertCategoryToViewCategory(categoryById[key], categoryById);
            if (category.type === 'CREATED') {
                createdCategories.push(category);
            } else if (category.type === 'MODIFIED') {
                modifiedCategories.push(category);
            } else if (category.type === 'DELETED') {
                deletedCategories.push(category);
            }
        }

        return {
            createdCategories: createdCategories,
            modifiedCategories: modifiedCategories,
            deletedCategories: deletedCategories
        };
    }
);

export const modifiedCategoriesListSaveSelector = createSelector(
    [
        adminCategoriesSelector
    ],
    (categoryById) => {
        let createdCategories = [];
        let modifiedCategories = [];
        let deletedCategories = [];

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (category.type === 'CREATED') {
                createdCategories.push(category);
            } else if (category.type === 'MODIFIED') {
                modifiedCategories.push(category);
            } else if (category.type === 'DELETED') {
                deletedCategories.push(category);
            }
        }

        return {
            createdCategories: createdCategories,
            modifiedCategories: modifiedCategories,
            deletedCategories: deletedCategories
        };
    }
);