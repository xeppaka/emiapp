class MenuItem {
    constructor(text) {
        this.text = text;
        this.expanded = false;
        this.items = [];
    }

    addItem(text) {
        var newMenuItem = new MenuItem(text);
        this.items.push(newMenuItem);

        return newMenuItem;
    }

    itemsCount() {
        return this.items.length;
    }

    expand(expand) {
        this.expanded = expand;
    }

    isExpandable() {
        return this.items.length > 0;
    }

    isExpanded() {
        return this.expanded;
    }

    getItemByIndex(idx) {
        return this.items[idx];
    }

    // id is in form '0.1.1.2'
    getItemById(id) {
        var idxArray = id.split('.');
        var idxArrayLength = idxArray.length;
        var currItem = this;

        for (let i = 0; i < idxArrayLength; i++) {
            let idx = Number(idxArray[i]);
            currItem = currItem.getItemByIndex(idx);
        }

        return currItem;
    }

    // id is in form '0.1.1.2'
    expandItemById(id) {
        this.getItemById(id).expand(true);
    }

    getMenuState() {
        return this.createMenuStateRecursively(this);
    }

    createMenuStateRecursively(currNode, stateNode = null) {
        var currentStateNode = stateNode;
        if (currentStateNode === null) {
            currentStateNode =
                {
                    text: currNode.text,
                    expanded: false,
                    items: []
                };
        }

        var currNodeItems = currNode.items;
        var currNodeItemsLength = currNodeItems.length;

        for (let i = 0; i < currNodeItemsLength; i++) {
            let newStateNode = {
                text: currNodeItems[i].text,
                expanded: false,
                items: []
            };

            currentStateNode.items.push(newStateNode);
            this.createMenuStateRecursively(currNodeItems[i], newStateNode);
        }

        return currentStateNode;
    }

    static emptyMenuState(text) {
        return {
            text: text,
            expanded: false,
            items: []
        };
    }
}

export default MenuItem;