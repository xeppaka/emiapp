import { createSelector } from 'reselect';
import { categoriesTreeSelector } from './categoriestree';

function createMenuNodeRecursively(categoryNode, tcategoryById, id) {
    let menuNode = {
        hasValue: categoryNode.productIds.length > 0,
        id: id,
        items: [],
        text: categoryNode.name
    };

    let childIds = categoryNode.childCategoryIds;
    let l = childIds.length;

    for (let i = 0; i < l; i++) {
        menuNode.items.push(createMenuNodeRecursively(tcategoryById[childIds[i]], tcategoryById, id + '.' + i));
    }

    return menuNode;
}

export const menuSelector = createSelector(
    [
        categoriesTreeSelector
    ],
    (tcategoryById) => {
        return createMenuNodeRecursively(tcategoryById['root'], tcategoryById, '');
    }
);