import update from 'react-addons-update';
import { SELECT_MENU_NODE, SET_MENU } from './menuactions';

const initialMenuState = {
    selectedNodeId: ''
}

function menu(state = initialMenuState, action) {
    switch (action.type) {
        case SELECT_MENU_NODE: {
            return update(state, {
                selectedNodeId: {$set: action.selectedNodeId}
            });

            return state;
        }
        default:
            return state;
    }
}

export default menu;