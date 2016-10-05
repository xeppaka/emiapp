export const SELECT_MENU_NODE = 'SELECT_MENU_NODE';
export const SET_MENU = 'SET_MENU';

export function selectMenuNode(selectedNodeId) {
    return { type: SELECT_MENU_NODE, selectedNodeId: selectedNodeId };
}

export function setMenu(menu) {
    return { type: SET_MENU, menu: menu };
}
