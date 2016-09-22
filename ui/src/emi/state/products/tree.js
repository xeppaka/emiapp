class CategoryNode {
    constructor(id, name) {
        this.id = id;
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
        let currProducts = category.getProducts();

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

        return menu;
    }

    static emptyProducts() {
        return [];
    }

    static emptyMenu() {
        return new CategoryNode('', 'root').getMenu();
    }
}

export default ProductsTree;

//let t = new ProductsTree();
//t.addProduct('1:1:1', {p: '1:1:1'});
//t.addProduct('1:1:2', {p: '1:1:2'});
//t.addProduct('1:2:1', {p: '1:2:1'});
//t.addProduct('1:2:2', {p: '1:2:2'});
//
//console.log(t);
//console.log(t.getMenu('Menu1'));
