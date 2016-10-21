export const MENU_NODE_TOGGLED = 'MENU_NODE_TOGGLED';

export function menuNodeToggled(id) {
    return { type: MENU_NODE_TOGGLED, id: id };
}
