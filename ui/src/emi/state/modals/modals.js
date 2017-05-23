import update from 'react-addons-update';
import {
    SHOW_SAVE_PRODUCTS_MODAL, SHOW_SAVE_CATEGORIES_MODAL, SHOW_PRODUCTS_ORDER_MODAL,
    SHOW_MESSAGE_BOX_MODAL, SHOW_CREATE_PRODUCT_MODAL, SHOW_CREATE_CATEGORY_MODAL,
    SHOW_IMAGE_MODAL, HIDE_MODAL
} from './modalsactions';

const initialModalsState = {
    nextId: 0,
    visibleModals: []
};

function modals(state = initialModalsState, action) {
    switch (action.type) {
        case SHOW_SAVE_CATEGORIES_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'SAVE_CATEGORIES_MODAL'}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_SAVE_PRODUCTS_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'SAVE_PRODUCTS_MODAL'}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_PRODUCTS_ORDER_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'PRODUCTS_ORDER_MODAL'}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_MESSAGE_BOX_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'MESSAGE_BOX_MODAL', title: action.title, text: action.text}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_CREATE_PRODUCT_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'CREATE_PRODUCT_MODAL', title: action.title, text: action.text}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_CREATE_CATEGORY_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'CREATE_CATEGORY_MODAL', title: action.title, text: action.text}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case SHOW_IMAGE_MODAL: {
            let id = state.nextId;
            return update(state, {
                visibleModals: {$push: [{id: id, type: 'IMAGE_MODAL', title: action.title, imageLink: action.imageLink}]},
                nextId: {$apply: (prev) => prev + 1}
            });
        }
        case HIDE_MODAL: {
            let idx = state.visibleModals.findIndex((elem) => elem.id === action.id);

            if (idx === -1) {
                return state;
            } else {
                return update(state, {
                    visibleModals: {$splice: [[idx, 1]]}
                });
            }
        }
        default:
            return state;
    }
}

export default modals;