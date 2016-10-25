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

    getMenuId() {
        return this.menuId;
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

    hasProductIds() {
        return this.productIds.length > 0;
    }

    getProductIds() {
        return this.productIds;
    }
}

class ProductNode {
    constructor(productId, name, price, multiplicity, note, categoryId, productFeatures, visible) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.categoryId = categoryId;
        this.productFeatures = productFeatures;
        this.visible = visible;
        this.anchor = '';
        this.quantity = 0;
        this.type = 'MAIN';
    }

    isMain() {
        return this.type === 'MAIN';
    }

    isPos() {
        return this.type === 'POS';
    }

    setAnchor(anchor) {
        this.anchor = anchor;
    }

    getAnchor() {
        return this.anchor;
    }

    setCategoryAnchors(categoryAnchors) {
        this.categoryAnchors = categoryAnchors;
    }

    setCategoryNames(categoryNames) {
        this.categoryNames = categoryNames;
    }
}

class CategoriesTree {
    constructor(treeData) {
        this.products = null;
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
                product.multiplicity,
                product.note,
                product.categoryId,
                product.productFeatures,
                product.visible
            );

            let categoryNode = this.categoryNodesById[product.categoryId];
            categoryNode.addProductId(key);
        }

        return rootCategory;
    }

    setMenuId(categoryNode, categoryNodesById, menuId) {
        categoryNode.setMenuId(menuId);

        let childCategories = categoryNode.getChildCategoryIds().map(id => categoryNodesById[id]);
        let childCategoriesLength = childCategories.length;
        for (let i = 0; i < childCategoriesLength; i++) {
            this.setMenuId(childCategories[i], categoryNodesById, menuId + '.' + i);
        }
    }

    getProducts() {
        if (this.products === null) {
            let productIds = this.prepareProductIds(this.rootCategory);
            this.products = {
                productIds: productIds,
                productsById: this.productNodesById
            }
        }

        return this.products;
    }

    prepareProductIds(category, categoryAnchors = [], categoryNames = []) {
        let currProductIds = category.getProductIds();
        let anchor = category.getMenuId();
        currProductIds.forEach(id => this.productNodesById[id].setAnchor(anchor));

        if (currProductIds.length > 0) {
            let currentCategoryAnchors = categoryAnchors.slice(0);
            currentCategoryAnchors.push(category.getMenuId());
            let currentCategoryNames = categoryNames.slice(0);
            currentCategoryNames.push(category.name);

            let productZero = this.productNodesById[currProductIds[0]];
            productZero.setCategoryAnchors(currentCategoryAnchors);
            productZero.setCategoryNames(currentCategoryNames);

            while (categoryAnchors.length > 0) {
                categoryAnchors.pop();
            }

            while (categoryNames.length > 0) {
                categoryNames.pop();
            }
        } else {
            categoryAnchors.push(category.getMenuId());
            // categoryNames.push(category.name);
        }

        let childCategories = category.getChildCategoryIds().map(id => this.categoryNodesById[id]);
        let childCategoriesLength = childCategories.length;

        for (let i = 0; i < childCategoriesLength; i++) {
            currProductIds = currProductIds.concat(this.prepareProductIds(childCategories[i], categoryAnchors, categoryNames));
        }

        return currProductIds;
    }

    getMenu(rootName) {
        let menu = this.getMenuRecursively(this.rootCategory);
        menu.text = rootName;

        return menu;
    }

    getMenuRecursively(categoryNode) {
        let childItems = categoryNode.getChildCategoryIds().map(id => this.getMenuRecursively(this.categoryNodesById[id]));
        let hasValue = categoryNode.hasProductIds();

        let menuNode = {
            id: categoryNode.getMenuId(),
            text: categoryNode.getName(),
            items: childItems,
            hasValue: hasValue
        };

        return menuNode;
    }

    static emptyMenu(rootName) {
        return this.getMenuRecursively(new CategoryNode(rootName));
    }
}

export default CategoriesTree;