class CategoryNode {
    constructor(categoryName) {
        this.categoryName = categoryName;
        this.products = [];
        this.categoryNameToChildMap = {};
        this.childCategories = [];
    }

    getProducts() {
        return this.products;
    }

    getProduct(idx) {
        return this.products[idx];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getCategoryName() {
        return this.categoryName;
    }

    getChildCategory(categoryName) {
        var child = this.categoryNameToChildMap[categoryName];
        if (typeof child === 'undefined') {
            child = new CategoryNode(categoryName);
            this.categoryNameToChildMap[categoryName] = child;
            this.childCategories.push(child);
        }

        return child;
    }

    getChildCategories() {
        return this.childCategories;
    }
}

class ProductsTree {
    constructor() {
        this.rootCategory = new CategoryNode('root');
    }

    addProduct(categories, product) {
        var categoriesArray = categories.split(':');
        var categoriesLength = categoriesArray.length;
        var currentCategoryNode = this.rootCategory;

        for (var i = 0; i < categoriesLength; i++) {
            currentCategoryNode = currentCategoryNode.getChildCategory(categoriesArray[i]);
        }

        currentCategoryNode.addProduct(product);
    }
}

var t = new ProductsTree();