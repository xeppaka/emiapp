import MenuItem from '../menu/menu';

class CategoryNode {
    constructor(name) {
        this.name = name;
        this.products = [];
        this.nameToChildMap = {};
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

    getName() {
        return this.name;
    }

    getChildCategory(name) {
        var child = this.nameToChildMap[name];
        if (typeof child === 'undefined') {
            child = new CategoryNode(name);
            this.nameToChildMap[name] = child;
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

    getProduct(idx) {
        var productsList = this.getProducts();
        return productsList[idx];
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

    getMenu(rootName) {
        var menu = new MenuItem(rootName);
        this.addCategoriesToMenu(menu, this.rootCategory);

        return menu;
    }

    addCategoriesToMenu(menuItem, categoryNode) {
        var childCategories = categoryNode.getChildCategories();
        var childCategoriesLength = childCategories.length;

        for (var i = 0; i < childCategoriesLength; i++) {
            let newMenuItem = menuItem.addItem(childCategories[i].name);
            this.addCategoriesToMenu(newMenuItem, childCategories[i]);
        }
    }

    static emptyProducts() {
        return [];
    }
}

export default ProductsTree;