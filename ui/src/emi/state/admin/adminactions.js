import update from 'react-addons-update';
import { modifiedProductsSelector } from '../selectors/adminselector';
import { showMessageBoxModal, hideModal } from '../modals/modalsactions';

export const SET_MODIFIED_PRODUCT = 'SET_MODIFIED_PRODUCT';
export const REMOVE_MODIFIED_PRODUCT = 'REMOVE_MODIFIED_PRODUCT';
export const ACCEPT_MODIFIED_PRODUCTS = 'ACCEPT_MODIFIED_PRODUCTS';
export const RESET_MODIFICATIONS = 'RESET_MODIFICATIONS';
export const SET_SEND_CUSTOMER_NOTIFICATION = 'SET_SEND_CUSTOMER_NOTIFICATION';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SAVE_MODIFIED_PRODUCTS_STARTED = 'SAVE_MODIFIED_PRODUCTS_STARTED';
export const SAVE_MODIFIED_PRODUCTS_FINISHED = 'SAVE_MODIFIED_PRODUCTS_FINISHED';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export function setCurrentTab(tab) {
    return { type: SET_CURRENT_TAB, tab: tab }
}

export function resetModifications() {
    return { type: RESET_MODIFICATIONS };
}

export function setModifiedProduct(product) {
    return { type: SET_MODIFIED_PRODUCT, product: product };
}

export function removeModifiedProduct(id) {
    return { type: REMOVE_MODIFIED_PRODUCT, id: id };
}

export function setNotificationText(text) {
    return { type: SET_NOTIFICATION_TEXT, text: text };
}

export function setSendCustomerNotification(value) {
    return { type: SET_SEND_CUSTOMER_NOTIFICATION, value: value };
}

export function saveModifiedProductsStarted() {
    return { type: SAVE_MODIFIED_PRODUCTS_STARTED };
}

export function saveModifiedProductsFinished() {
    return { type: SAVE_MODIFIED_PRODUCTS_FINISHED };
}

export function acceptModifiedProducts(products) {
    return { type: ACCEPT_MODIFIED_PRODUCTS, products: products };
}

export function saveModifications(saveModalId) {
    return function(dispatch, getState) {
        dispatch(saveModifiedProductsStarted());

        let modifiedProducts = modifiedProductsSelector(getState());
        fetch('api/products', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedProducts)
        }).then(response => {
            if (response.status !== 200) {
                dispatch(saveModifiedProductsFinished());
                dispatch(showMessageBoxModal('Save products failed.', 'Error occurred while saving products.'));
                throw new Error('Save products failed.');
            } else {
                return response.json();
            }
        }).then(modifiedProductsData => {
            dispatch(saveModifiedProductsFinished());
            dispatch(acceptModifiedProducts(modifiedProductsData));
            dispatch(resetModifications());
            dispatch(hideModal(saveModalId));
        });
    };
}

export function setProductName(id, name) {
    return function(dispatch, getState) {
        let state = getState();
        let originalProduct = state.warehouse.products.productById[id];
        let modifiedProduct = state.admin.modifiedProductById.hasOwnProperty(id) ? state.admin.modifiedProductById[id] : null;
        let modifyProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        let newProduct = update(modifyProduct, {
            name: {$set: name}
        });

        if (newProduct.name === originalProduct.name && newProduct.price === originalProduct.price) {
            dispatch(removeModifiedProduct(id));
        } else {
            dispatch(setModifiedProduct(newProduct));
        }
    };
}

export function setProductPrice(id, price) {
    return function(dispatch, getState) {
        let state = getState();
        let originalProduct = state.warehouse.products.productById[id];
        let modifiedProduct = state.admin.modifiedProductById.hasOwnProperty(id) ? state.admin.modifiedProductById[id] : null;
        let modifyProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        let newProduct = update(modifyProduct, {
            price: {$set: price}
        });

        if ((newProduct.name === originalProduct.name) && (newProduct.price === originalProduct.price)) {
            dispatch(removeModifiedProduct(id));
        } else {
            dispatch(setModifiedProduct(newProduct));
        }
    };
}