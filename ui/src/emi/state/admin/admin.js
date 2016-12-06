import update from 'react-addons-update';
import { SET_MODIFIED_PRODUCT, REMOVE_MODIFIED_PRODUCT,
         SET_MODIFIED_CATEGORY, REMOVE_MODIFIED_CATEGORY,
         SET_SEND_CUSTOMER_NOTIFICATION,
         RESET_PRODUCTS, RESET_CATEGORIES,
         SET_NOTIFICATION_TEXT, SAVE_STARTED, SAVE_FINISHED } from './adminactions';

const initialAdminState = {
    modifiedProductById: {},
    modifiedCategoryById: {},
    sendNotificationToCustomers: false,
    notificationText: null,
    saving: false,
    currentTab: 'products'
};

function admin(state = initialAdminState, action) {
    switch (action.type) {
        case RESET_PRODUCTS:
            return update(state, {
                modifiedProductById: {$set: {}}
            });
        case RESET_CATEGORIES:
            return update(state, {
                modifiedCategoryById: {$set: {}}
            });
        case SET_MODIFIED_PRODUCT: {
            let modifiedProduct = action.product;
            return update(state, {
                modifiedProductById: {
                    [modifiedProduct.productId]: {$set: modifiedProduct}
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
        case SET_MODIFIED_CATEGORY: {
            let modifiedCategory = action.category;
            return update(state, {
                modifiedCategoryById: {
                    [modifiedCategory.categoryId]: {$set: modifiedCategory}
                }
            });
        }
        case REMOVE_MODIFIED_CATEGORY:
            return update(state, {
                modifiedCategoryById: {
                    [action.id]: {$set: null}
                }
            });
        case SET_SEND_CUSTOMER_NOTIFICATION:
            return update(state, {
                sendNotificationToCustomers: {$set: action.value}
            });
        case SET_NOTIFICATION_TEXT:
            return update(state, {
                notificationText: {$set: action.text}
            });
        case SAVE_STARTED:
            return update(state, {
                saving: {$set: true}
            });
        case SAVE_FINISHED:
            return update(state, {
                saving: {$set: false}
            });
        default:
            return state;
    }
}

export default admin;