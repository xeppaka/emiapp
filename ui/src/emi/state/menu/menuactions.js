export const SELECT_MENU_NODE = 'SELECT_MENU_NODE';

export function selectMenuNode(selectedNodeId) {
    return { type: SELECT_MENU_NODE, selectedNodeId: selectedNodeId };
}
