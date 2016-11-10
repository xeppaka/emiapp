import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

function isProductByIdEqual(val1, val2) {
    let val1Keys = 0;
    let val2Keys = 0;
    for (let key in val1) {
        if (!val1.hasOwnProperty(key))
            continue;

        val1Keys++;
        if (!val2.hasOwnProperty(key) || val1[key].categoryId !== val2[key].categoryId) {
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
        console.log('Recomputing categories tree');

        let categoryById = categoryByIdVal.value;
        let productById = productByIdVal.value;
        let tcategoryById = {};
        tcategoryById['root'] = {
            categoryId: 'root',
            name: 'Product Categories',
            childCategoryIds: [],
            parentCategoryId: null,
            productIds: []
        };

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
                    parentCategoryId: category.parentCategoryId,
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