export function createCategoriesList(categoryTree) {
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

export function createAdminCategoriesList(categoryTree) {
    let idsQueue = ['root'];
    let rootCategory = null;
    let newCategoryList = [];
    let categoryList = [];

    while (idsQueue.length > 0) {
        let catId = idsQueue.pop();
        let category = categoryTree[catId];

        if (catId === 'root') {
            rootCategory = category;
        } else if (category.type === 'MODIFIED') {
            categoryList.push(category);
        } else if (category.type === 'CREATED') {
            newCategoryList.push(category);
        }

        for (let i = category.childCategoryIds.length; i > 0; i--) {
            idsQueue.push(category.childCategoryIds[i - 1]);
        }
    }

    return [rootCategory].concat(newCategoryList).concat(categoryList);
}