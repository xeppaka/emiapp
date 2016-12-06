import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

function createProductsComparator(productById) {
    return function compareProducts(prodId1, prodId2) {
        let prod1 = productById[prodId1];
        let prod2 = productById[prodId2];

        if (prod1.weight < prod2.weight) {
            return -1;
        }

        if (prod1.weight > prod2.weight) {
            return 1;
        }

        return prod1.name.localeCompare(prod2.name);
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

function sortCategoryTree(categoryById, productById) {
    sortCategoryTreeWithComparators('root',
        categoryById,
        createCategoriesComparator(categoryById),
        createProductsComparator(productById));
}

function sortCategoryTreeWithComparators(catId, categoryById, categoriesComparator, productsComparator) {
    let category = categoryById[catId];
    category.childCategoryIds = category.childCategoryIds.sort(categoriesComparator);
    category.productIds = category.productIds.sort(productsComparator);

    let l = category.childCategoryIds.length;
    for (let i = 0; i < l; i++) {
        sortCategoryTreeWithComparators(category.childCategoryIds[i], categoryById,
            categoriesComparator, productsComparator);
    }
}

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

function setAnchors(categoriesTree) {
    setAnchorsRecursively(categoriesTree, 'root', '#');
}

function setAnchorsRecursively(categoriesTree, id, anchor) {
    let currentCategory = categoriesTree[id];
    currentCategory.anchor = anchor;

    let childCategoryIds = currentCategory.childCategoryIds;
    let childCategoryIdsLength = childCategoryIds.length;

    for (let i = 0; i < childCategoryIdsLength; i++) {
        setAnchorsRecursively(categoriesTree, childCategoryIds[i], anchor + '.' + i);
    }
}

function getDefaultRootCategory() {
    return {
        categoryId: 'root',
        name: '',
        anchor: '',
        childCategoryIds: [],
        parentCategoryId: null,
        productIds: [],
        weight: 0
    }
}

export const categoriesTreeSelector = createDeepEqualSelector(
    [
        (state) => { return { type: 'categoryById', value: state.warehouse.categories.categoryById } },
        (state) => { return { type: 'productById', value: state.warehouse.products.productById } }
    ],
    (categoryByIdVal, productByIdVal) => {
        let categoryById = categoryByIdVal.value;
        let productById = productByIdVal.value;
        let tcategoryById = {};

        // first walk -> creating categories with childCategoryIds field
        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (!tcategoryById.hasOwnProperty(key)) {
                tcategoryById[key] = {
                    categoryId: category.categoryId,
                    name: category.name,
                    anchor: '',
                    childCategoryIds: [],
                    parentCategoryId: category.parentCategoryId,
                    productIds: [],
                    weight: category.weight
                };
            }
        }

        let rootCategoryId = null;
        // second walk -> fill childCategoryIds field
        for (let key in tcategoryById) {
            if (!tcategoryById.hasOwnProperty(key))
                continue;

            let category = tcategoryById[key];
            if (category.parentCategoryId !== null) {
                tcategoryById[category.parentCategoryId].childCategoryIds.push(category.categoryId);
            } else {
                rootCategoryId = category.categoryId;
            }
        }

        if (rootCategoryId !== null) {
            tcategoryById.root = tcategoryById[rootCategoryId];
        } else {
            tcategoryById.root = getDefaultRootCategory();
        }

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let product = productById[key];
            if (product.categoryId !== null) {
                tcategoryById[product.categoryId].productIds.push(key);
            }
        }

        sortCategoryTree(tcategoryById, productById);
        setAnchors(tcategoryById);

        return tcategoryById;
    }
);