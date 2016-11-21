import update from 'react-addons-update';
import { SET_MODIFIED_PRODUCT, REMOVE_MODIFIED_PRODUCT, SET_SEND_CUSTOMER_NOTIFICATION,
         SET_CURRENT_TAB, RESET_MODIFICATIONS, SET_NOTIFICATION_TEXT, SAVE_MODIFIED_PRODUCTS_STARTED,
         SAVE_MODIFIED_PRODUCTS_FINISHED } from './adminactions';

const initialAdminState = {
    modifiedProductById: {},
    sendNotificationToCustomers: false,
    notificationText: null,
    saving: false,
    currentTab: 'products'
};

function admin(state = initialAdminState, action) {
    switch (action.type) {
        case RESET_MODIFICATIONS:
            return update(state, {
                modifiedProductById: {$set: {}}
            });
        case SET_MODIFIED_PRODUCT: {
            let modifiedProduct = action.product;

            return update(state, {
                modifiedProductById: {
                    [modifiedProduct.productId]: {$set: action.product}
                }
            });
        }
        case REMOVE_MODIFIED_PRODUCT: {
            return update(state, {
                modifiedProductById: {
                    [action.id]: {$set: null}
                }
            });
        }
        case SET_SEND_CUSTOMER_NOTIFICATION:
            return update(state, {
                sendNotificationToCustomers: {$set: action.value}
            });
        case SET_NOTIFICATION_TEXT:
            return update(state, {
                notificationText: {$set: action.text}
            });
        case SAVE_MODIFIED_PRODUCTS_STARTED:
            return update(state, {
                saving: {$set: true}
            });
        case SAVE_MODIFIED_PRODUCTS_FINISHED:
            return update(state, {
                saving: {$set: false}
            });
        case SET_CURRENT_TAB:
            return update(state, {
                currentTab: {$set: action.tab}
            });
        default:
            return state;
    }
}

export default admin;