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
        this.productsList = null;
    }

    addProduct(categories, product) {
        this.productsList = null;

        var categoriesArray = categories.split(':');
        var categoriesLength = categoriesArray.length;
        var currentCategoryNode = this.rootCategory;

        for (var i = 0; i < categoriesLength; i++) {
            currentCategoryNode = currentCategoryNode.getChildCategory(categoriesArray[i]);
        }

        currentCategoryNode.addProduct(product);
    }

    getProducts() {
        if (this.productsList === null) {
            this.productsList = this.prepareProductsList(this.rootCategory);
        }

        return this.productsList;
    }

    prepareProductsList(category) {
        var currProducts = category.getProducts();

        var childCategories = category.getChildCategories();
        var childCategoriesLength = childCategories.length;

        for (var i = 0; i < childCategoriesLength; i++) {
            currProducts = currProducts.concat(this.prepareProductsList(childCategories[i]));
        }

        return currProducts;
    }
}

var t = new ProductsTree();
t.addProduct('1:1:1', {name: 'product 1:1:1'});
t.addProduct('1:2:2', {name: 'product 1:2:2'});
t.addProduct('1:1:2', {name: 'product 1:1:2'});

console.log(t.getProducts());