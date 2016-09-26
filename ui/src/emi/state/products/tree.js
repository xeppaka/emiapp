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
        let hasProducts = this.products.length > 0;
        let menu =
            {
                id: this.id,
                text: this.name,
                expanded: false,
                items: [],
                hasProducts: hasProducts
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
        this.allProductsList = null;
        this.mainProductsList = null;
        this.posProductsList = null;
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

    getAllProducts() {
        if (this.productsList === null) {
            this.productsList = this.prepareProductsList(this.rootCategory);
        }

        return this.productsList;
    }

    prepareProductsList(category, categoryAnchors = [], categoryNames = [], counter = 0) {
        let currProducts = category.getProducts().map(function(product, idx) {
            return Object.assign({}, product, { anchor: category.id, idx: counter + idx });
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
            currProducts = currProducts.concat(this.prepareProductsList(childCategories[i], categoryAnchors, categoryNames, counter + currProducts.length));
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