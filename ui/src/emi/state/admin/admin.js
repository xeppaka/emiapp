import update from 'react-addons-update';
import {
    SET_MODIFIED_PRODUCT, REMOVE_MODIFIED_PRODUCT,
    SET_MODIFIED_CATEGORY, REMOVE_MODIFIED_CATEGORY,
    SET_SEND_CUSTOMER_NOTIFICATION,
    ADMIN_PRODUCTS_RESET, ADMIN_CATEGORIES_RESET,
    SET_NOTIFICATION_TEXT, SAVE_STARTED, SAVE_FINISHED,
    ADD_NEW_PRODUCT, ADD_NEW_CATEGORY,
    SET_PRODUCT_DELETED, REMOVE_PRODUCT_DELETED,
    SET_CATEGORY_DELETED, REMOVE_CATEGORY_DELETED,
    SET_MODIFY_PRODUCT, CLEAR_MODIFY_PRODUCT
} from './adminactions';

const initialAdminState = {
    currentModifyProductId: null,
    modifiedProductById: {},
    modifiedCategoryById: {},
    deletedProducts: [],
    deletedCategories: [],
    sendNotificationToCustomers: false,
    notificationText: null,
    saving: false,
    nextProductId: 0,
    nextCategoryId: 0
};

function getNextSurrogateUUID(nextId) {
    let id = '00000000000' + nextId.toString();
    if (id.length > 12) {
        id = id.substring(id.length - 12);
    }

    return '00000000-0000-0000-0000-' + id;
}

function admin(state = initialAdminState, action) {
    switch (action.type) {
        case ADMIN_PRODUCTS_RESET:
            return update(state, {
                modifiedProductById: {$set: {}},
                deletedProducts: {$set: []},
                nextProductId: {$set: 0},
                currentModifyProductId: {$set: null}
            });
        case ADMIN_CATEGORIES_RESET:
            return update(state, {
                modifiedCategoryById: {$set: {}},
                deletedCategories: {$set: []},
                nextCategoryId: {$set: 0}
            });
        case ADD_NEW_PRODUCT: {
            let product = action.product;
            product.productId = getNextSurrogateUUID(state.nextProductId);
            return update(state, {
                modifiedProductById: {
                    [product.productId]: {$set: product}
                },
                nextProductId: {$apply: id => id + 1},
                currentModifyProductId: {$set: product.productId}
            });
        }
        case ADD_NEW_CATEGORY: {
            let category = action.category;
            category.categoryId = getNextSurrogateUUID(state.nextCategoryId);
            return update(state, {
                modifiedCategoryById: {
                    [category.categoryId]: {$set: category}
                },
                nextCategoryId: {$apply: id => id + 1}
            });
        }
        case SET_MODIFIED_PRODUCT: {
            let modifiedProduct = action.product;
            return update(state, {
                modifiedProductById: {
                    [modifiedProduct.productId]: {$set: modifiedProduct}
                }
            });
        }
        case REMOVE_MODIFIED_PRODUCT: {
            let modifiedState = update(state, {
                modifiedProductById: {
                    [action.id]: {$set: null}
                }
            });

            delete modifiedState.modifiedProductById[action.id];
            return modifiedState;
        }
        case SET_MODIFIED_CATEGORY: {
            let modifiedCategory = action.category;
            return update(state, {
                modifiedCategoryById: {
                    [modifiedCategory.categoryId]: {$set: modifiedCategory}
                }
            });
        }
        case REMOVE_MODIFIED_CATEGORY: {
            let modifiedState = update(state, {
                modifiedCategoryById: {
                    [action.id]: {$set: null}
                }
            });
            delete modifiedState.modifiedCategoryById[action.id];
            return modifiedState;
        }
        case SET_PRODUCT_DELETED: {
            let productId = action.productId;
            return update(state, {
                deletedProducts: {$push: [productId]}
            });
        }
        case REMOVE_PRODUCT_DELETED: {
            let productId = action.productId;
            return update(state, {
                deletedProducts: {$apply: ids => ids.filter(id => id !== productId)}
            });
        }
        case SET_CATEGORY_DELETED: {
            let categoryId = action.categoryId;
            return update(state, {
                deletedCategories: {$push: [categoryId]}
            });
        }
        case REMOVE_CATEGORY_DELETED: {
            let categoryId = action.categoryId;
            return update(state, {
                deletedCategories: {$apply: ids => ids.filter(id => id !== categoryId)}
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
        case SAVE_STARTED:
            return update(state, {
                saving: {$set: true}
            });
        case SAVE_FINISHED:
            return update(state, {
                saving: {$set: false}
            });
        case SET_MODIFY_PRODUCT:
            return update(state, {
                currentModifyProductId: {$set: action.productId}
            });
        case CLEAR_MODIFY_PRODUCT:
            return update(state, {
                currentModifyProductId: {$set: null}
            });
        default:
            return state;
    }
}

export default admin;