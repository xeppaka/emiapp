import { createSelector } from 'reselect';

export const modifiedProductsCountSelector = createSelector(
    [
        (state) => state.admin.modifiedProductById
    ],
    (modifiedProductById) => {
        let modifiedProductsCount = 0;

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                modifiedProductsCount++;
            }
        }

        return modifiedProductsCount;
    }
);

export const modifiedProductsSelector = createSelector(
    [
        (state) => state.admin.modifiedProductById
    ],
    (modifiedProductById) => {
        let modifiedProducts = [];

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                modifiedProducts.push(modifiedProductById[key]);
            }
        }

        return modifiedProducts;
    }
);

function generateCustomerNotification(products) {
    let header = "List of modified products:\n";
    let footer = "Sincerely, your E.Mi team, hahaha.";

    let productsText = "";
    let productsLength = products.length;

    for (let i = 0; i < productsLength; i++) {
        let product = products[i];
        productsText += 'Name: ' + product.name + ', price: ' + product.price + '\n';
    }

    return header + productsText + footer;
}

export const notificationSelector = createSelector(
    [
        (state) => state.admin.sendNotificationToCustomers,
        (state) => state.admin.notificationText,
        modifiedProductsSelector
    ],
    (sendNotification, notificationText, modifiedProducts) => {
        if (!sendNotification) {
            return {
                sendNotification: false
            }
        }

        let text = notificationText !== null ? notificationText : generateCustomerNotification(modifiedProducts);
        return {
            sendNotification: true,
            text: text
        }
    }
);

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
        (state) => state.admin.modifiedCategoryById
    ],
    (categoryById, modifiedCategoryById) => {
        let tcategoryById = {};
        tcategoryById['root'] = {
            categoryId: 'root',
            name: 'Product Categories',
            childCategoryIds: [],
            parentCategoryId: null,
            weight: 0
        };

        // first walk -> creating categories with childCategoryIds field
        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = (modifiedCategoryById.hasOwnProperty(key) && modifiedCategoryById[key] !== null) ? modifiedCategoryById[key] : categoryById[key];
            if (!tcategoryById.hasOwnProperty(key)) {
                tcategoryById[key] = {
                    categoryId: category.categoryId,
                    name: category.name,
                    childCategoryIds: [],
                    parentCategoryId: category.parentCategoryId === null ? 'root' : category.parentCategoryId,
                    parentCategoryName: category.parentCategoryId === null ? 'ROOT' : categoryById[category.parentCategoryId].name,
                    weight: category.weight
                };
            }
        }

        // second walk -> fill childCategoryIds and parentCategoryName fields
        for (let key in tcategoryById) {
            if (!tcategoryById.hasOwnProperty(key))
                continue;

            let category = (modifiedCategoryById.hasOwnProperty(key) && modifiedCategoryById[key] !== null) ? modifiedCategoryById[key] : tcategoryById[key];
            if (category.parentCategoryId !== null) {
                let parentKey = category.parentCategoryId;
                let parentCategory = (modifiedCategoryById.hasOwnProperty(parentKey) && modifiedCategoryById[parentKey] !== null) ? modifiedCategoryById[parentKey] : tcategoryById[parentKey];
                parentCategory.childCategoryIds.push(category.categoryId);
            } else {
                if (category.categoryId != 'root') {
                    tcategoryById['root'].childCategoryIds.push(category.categoryId);
                }
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

export const modifiedCategoriesCountSelector = createSelector(
    [
        (state) => state.admin.modifiedCategoryById
    ],
    (modifiedCategoryById) => {
        let modifiedCategoryCount = 0;

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key))
                continue;

            if (modifiedCategoryById[key] !== null) {
                modifiedCategoryCount++;
            }
        }

        return modifiedCategoryCount;
    }
);

export const modifiedCategoriesSelector = createSelector(
    [
        (state) => state.admin.modifiedCategoryById,
        adminCategoriesTreeSelector
    ],
    (modifiedCategoryById, categoryTree) => {
        let modifiedCategories = [];

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key))
                continue;

            if (modifiedCategoryById[key] !== null) {
                modifiedCategories.push(categoryTree[key]);
            }
        }

        return modifiedCategories;
    }
);

export const modifiedCategoriesSaveSelector = createSelector(
    [
        (state) => state.admin.modifiedCategoryById
    ],
    (modifiedCategoryById) => {
        let modifiedCategories = [];

        for (let key in modifiedCategoryById) {
            if (!modifiedCategoryById.hasOwnProperty(key))
                continue;

            if (modifiedCategoryById[key] !== null) {
                modifiedCategories.push(modifiedCategoryById[key]);
            }
        }

        return modifiedCategories;
    }
);