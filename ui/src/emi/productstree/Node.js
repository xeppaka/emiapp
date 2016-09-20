class Node {
    constructor(data) {
        this.data = data;
        this.childNodes = [];
    }

    addChildNode(node) {
        childNodes.push(node);
    }

    getChildren() {
        return this.childNodes;
    }
}

export default Node;