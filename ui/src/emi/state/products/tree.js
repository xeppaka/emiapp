class CategoryNode {
    constructor(name) {
        this.menuId = '#';
        this.name = name;
        this.childCategoryIds = [];
        this.productIds = [];
    }

    setMenuId(menuId) {
        this.menuId = menuId;
    }

    getProductIds() {
        return this.productIds;
    }

    addProductId(productId) {
        this.productIds.push(productId);
    }

    getName() {
        return this.name;
    }

    addChildCategoryId(categoryId) {
        this.childCategoryIds.push(categoryId);
    }

    getChildCategoryIds() {
        return this.childCategoryIds;
    }

//    getMenu() {
//        let hasValue = this.products.length > 0;
//        let menu =
//            {
//                id: this.id,
//                text: this.name,
//                items: [],
//                hasValue: hasValue
//            };
//
//        let childCount = this.childCategories.length;
//        for (let i = 0; i < childCount; i++) {
//            let child = this.childCategories[i];
//            let childMenu = child.getMenu();
//            menu.items.push(childMenu);
//        }
//
//        return menu;
//    }
}

class ProductNode {
    constructor(productId, name, price, note, categoryId, productFeatures, visible) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.note = note;
        this.categoryId = categoryId;
        this.productFeatures = productFeatures;
        this.visible = visible;
    }
}

class CategoriesTree {
    constructor(treeData) {
        this.allProductsList = null;
        this.mainProductsList = null;
        this.posProductsList = null;
        this.categoryNodesById = {};
        this.productNodesById = {};
        this.rootCategory = this.createCategoryNodes(treeData, this.categoryNodesById, this.productNodesById);
    }

    createCategoryNodes(treeData, categoryNodesById, productNodesById) {
        let categoryById = treeData.categoryById;
        let productById = treeData.productById;
        let rootCategory = new CategoryNode('root');

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            categoryNodesById[key] = new CategoryNode(category.name);
        }

        for (let key in categoryById) {
            if (!categoryById.hasOwnProperty(key))
                continue;

            let category = categoryById[key];
            if (category.parentCategoryId !== null) {
                let parentCategoryNode = categoryNodesById[category.parentCategoryId];
                parentCategoryNode.addChildCategoryId(key);
            } else {
                rootCategory.addChildCategoryId(key);
            }
        }

        this.setMenuId(rootCategory, categoryNodesById, '');

        for (let key in productById) {
            if (!productById.hasOwnProperty(key))
                continue;

            let product = productById[key];
            productNodesById[key] = new ProductNode(product.productId,
                product.name,
                product.price,
                product.note,
                product.categoryId,
                product.productFeatures,
                product.visible
            );

            let categoryNode = categoryById[product.categoryId];
            categoryNode.addProductId(key);
        }

        return rootCategory;
    }

    setMenuId(categoryNode, categoryNodesById, menuId) {
        categoryNode.setMenuId(menuId);

        let childCategoryIds = categoryNode.getChildCategoryIds();
        let childCategoryIdsLength = childCategoryIds.length;
        for (let i = 0; i < childCategoryIdsLength; i++) {
            this.setMenuId(categoryNodesById[childCategoryIds[i]], categoryNodesById, menuId + '.' + i);
        }
    }

    addProduct(categories, product) {
        this.productsList = null;

        let categoriesArray = categories.split(':');
        let categoriesLength = categoriesArray.length;
        let currentCategoryNode = this.rootCategory;

        for (let i = 0; i < categoriesLength; i++) {
            currentCategoryNode = currentCategoryNode.getChildCategory(categoriesArray[i]);
        }

        currentCategoryNode.addProduct(product);
    }

    getProduct(idx) {
        var productsList = this.getProducts();
        return productsList[idx];
    }

    getProducts() {
        if (this.productsList === null) {
            this.productsList = this.prepareProductsList(this.rootCategory);
        }

        return this.productsList;
    }

    prepareProductsList(category, categoryAnchors = [], categoryNames = []) {
        let currProducts = category.getProducts().map(function(product) {
            return Object.assign({}, product, { anchor: category.id });
        });

        if (currProducts.length > 0) {
            let currentCategoryAnchors = categoryAnchors.slice(0);
            currentCategoryAnchors.push(category.id);
            let currentCategoryNames = categoryNames.slice(0);
            currentCategoryNames.push(category.name);

            currProducts[0] = Object.assign({}, currProducts[0], { categoryAnchors: currentCategoryAnchors, categoryNames: currentCategoryNames });

            while (categoryAnchors.length > 0) {
                categoryAnchors.pop();
            }

            while (categoryNames.length > 0) {
                categoryNames.pop();
            }
        } else {
            categoryAnchors.push(category.id);
            // categoryNames.push(category.name);
        }

        let childCategories = category.getChildCategories();
        let childCategoriesLength = childCategories.length;

        for (let i = 0; i < childCategoriesLength; i++) {
            currProducts = currProducts.concat(this.prepareProductsList(childCategories[i], categoryAnchors, categoryNames));
        }

        return currProducts;
    }

    getMenu(rootName) {
        let menu = this.rootCategory.getMenu();
        menu.text = rootName;

        return menu;
    }

    static emptyMenu(rootName) {
        return new CategoryNode('', rootName).getMenu();
    }
}

export default ProductsTree;