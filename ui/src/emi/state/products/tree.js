class CategoryNode {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.nameToChildMap = {};
        this.childCategories = [];
        this.products = [];
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

    getChildCategories() {
        return this.childCategories;
    }

    getChildCategory(name) {
        let child = this.nameToChildMap[name];
        if (typeof child === 'undefined') {
            let nextIdx = this.childCategories.length;
            child = new CategoryNode(this.id + '.' + nextIdx, name);
            this.nameToChildMap[name] = child;
            this.childCategories.push(child);
        }

        return child;
    }

    getMenu() {
        let menu =
            {
                id: this.id,
                text: this.name,
                expanded: false,
                items: []
            };

        let childCount = this.childCategories.length;
        for (let i = 0; i < childCount; i++) {
            let child = this.childCategories[i];
            let childMenu = child.getMenu();
            menu.items.push(childMenu);
        }

        return menu;
    }
}

class ProductsTree {
    constructor() {
        this.rootCategory = new CategoryNode('', 'root');
        this.productsList = null;
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

    prepareProductsList(category) {
        let currProducts = category.getProducts();
        if (currProducts.length > 0) {
            currProducts[0] = Object.assign({}, currProducts[0], { anchor: category.id });
        }

        let childCategories = category.getChildCategories();
        let childCategoriesLength = childCategories.length;

        for (let i = 0; i < childCategoriesLength; i++) {
            currProducts = currProducts.concat(this.prepareProductsList(childCategories[i]));
        }

        return currProducts;
    }

    getMenu(rootName) {
        let menu = this.rootCategory.getMenu();
        menu.text = rootName;
        menu.expanded = true;

        return menu;
    }

    static emptyProducts() {
        return [];
    }

    static emptyMenu(rootName) {
        return new CategoryNode('', rootName).getMenu();
    }
}

export default ProductsTree;