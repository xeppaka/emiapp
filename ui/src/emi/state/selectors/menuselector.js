import { createSelector } from 'reselect';
import { categoriesTreeSelector } from './categoriesselector';

function createMenuNodeRecursively(categoryNode, tcategoryById) {
    let menuNode = {
        hasValue: categoryNode.productIds.length > 0,
        id: categoryNode.anchor,
        items: [],
        text: categoryNode.name
    };

    let childIds = categoryNode.childCategoryIds;
    let l = childIds.length;

    for (let i = 0; i < l; i++) {
        menuNode.items.push(createMenuNodeRecursively(tcategoryById[childIds[i]], tcategoryById));
    }

    return menuNode;
}

export const menuSelector = createSelector(
    [
        categoriesTreeSelector
    ],
    (tcategoryById) => {
        return createMenuNodeRecursively(tcategoryById['root'], tcategoryById);
    }
);