import update from 'react-addons-update';
import { modifiedProductsSelector, modifiedCategoriesSaveSelector } from '../selectors/adminselector';
import { showMessageBoxModal, hideModal } from '../modals/modalsactions';
import { updateProducts } from '../products/productsactions';
import { updateCategories } from '../categories/categoriesactions';

export const SET_MODIFIED_PRODUCT = 'SET_MODIFIED_PRODUCT';
export const REMOVE_MODIFIED_PRODUCT = 'REMOVE_MODIFIED_PRODUCT';
export const SET_MODIFIED_CATEGORY = 'SET_MODIFIED_CATEGORY';
export const REMOVE_MODIFIED_CATEGORY = 'REMOVE_MODIFIED_CATEGORY';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';
export const SET_SEND_CUSTOMER_NOTIFICATION = 'SET_SEND_CUSTOMER_NOTIFICATION';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SAVE_STARTED = 'SAVE_STARTED';
export const SAVE_FINISHED = 'SAVE_FINISHED';

export function resetProducts() {
    return { type: RESET_PRODUCTS };
}

export function resetCategories() {
    return { type: RESET_CATEGORIES };
}

export function setModifiedProduct(product) {
    return { type: SET_MODIFIED_PRODUCT, product: product };
}

export function removeModifiedProduct(id) {
    return { type: REMOVE_MODIFIED_PRODUCT, id: id };
}

export function setModifiedCategory(category) {
    return { type: SET_MODIFIED_CATEGORY, category: category }
}

export function removeModifiedCategory(id) {
    return { type: REMOVE_MODIFIED_CATEGORY, id: id }
}

export function setNotificationText(text) {
    return { type: SET_NOTIFICATION_TEXT, text: text };
}

export function setSendCustomerNotification(value) {
    return { type: SET_SEND_CUSTOMER_NOTIFICATION, value: value };
}

export function saveStarted() {
    return { type: SAVE_STARTED };
}

export function saveFinished() {
    return { type: SAVE_FINISHED };
}

export function saveProducts(saveModalId) {
    return function(dispatch, getState) {
        dispatch(saveStarted());

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
                dispatch(saveFinished());
                dispatch(showMessageBoxModal('Save products failed.', 'Error occurred while saving products.'));
                throw new Error('Save products failed.');
            } else {
                return response.json();
            }
        }).then(modifiedProductsData => {
            dispatch(saveFinished());
            dispatch(updateProducts(modifiedProductsData));
            dispatch(resetProducts());
            dispatch(hideModal(saveModalId));
        });
    };
}

export function saveCategories(saveModalId) {
    return function(dispatch, getState) {
        dispatch(saveStarted());

        let modifiedCategories = modifiedCategoriesSaveSelector(getState());
        fetch('api/categories', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedCategories)
        }).then(response => {
            if (response.status !== 200) {
                dispatch(saveFinished());
                dispatch(showMessageBoxModal('Save products failed.', 'Error occurred while saving products.'));
                throw new Error('Save products failed.');
            } else {
                return response.json();
            }
        }).then(modifiedCategoriesData => {
            dispatch(saveFinished());
            dispatch(updateCategories(modifiedCategoriesData));
            dispatch(resetCategories());
            dispatch(hideModal(saveModalId));
        });
    };
}

export function setProductName(productId, name) {
    return function(dispatch, getState) {
        let state = getState();
        let originalProduct = state.warehouse.products.productById[productId];
        let modifiedProduct = state.admin.modifiedProductById.hasOwnProperty(productId) ? state.admin.modifiedProductById[productId] : null;
        let modifyProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        let newProduct = update(modifyProduct, {
            name: {$set: name}
        });

        if (newProduct.name === originalProduct.name &&
            newProduct.price === originalProduct.price &&
            newProduct.categoryId === originalProduct.categoryId) {
            dispatch(removeModifiedProduct(productId));
        } else {
            dispatch(setModifiedProduct(newProduct));
        }
    };
}

export function setProductPrice(productId, price) {
    return function(dispatch, getState) {
        let state = getState();
        let originalProduct = state.warehouse.products.productById[productId];
        let modifiedProduct = state.admin.modifiedProductById.hasOwnProperty(productId) ? state.admin.modifiedProductById[productId] : null;
        let modifyProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        let newProduct = update(modifyProduct, {
            price: {$set: price}
        });

        if (newProduct.name === originalProduct.name &&
            newProduct.price === originalProduct.price &&
            newProduct.categoryId === originalProduct.categoryId) {
            dispatch(removeModifiedProduct(productId));
        } else {
            dispatch(setModifiedProduct(newProduct));
        }
    };
}

export function setProductCategory(productId, categoryId) {
    return function(dispatch, getState) {
        let state = getState();
        let originalProduct = state.warehouse.products.productById[productId];
        let modifiedProduct = state.admin.modifiedProductById.hasOwnProperty(productId) ? state.admin.modifiedProductById[productId] : null;
        let modifyProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        let newProduct = update(modifyProduct, {
            categoryId: {$set: categoryId}
        });

        if (newProduct.name === originalProduct.name &&
            newProduct.price === originalProduct.price &&
            newProduct.categoryId === originalProduct.categoryId) {
            dispatch(removeModifiedProduct(productId));
        } else {
            dispatch(setModifiedProduct(newProduct));
        }
    };
}

export function setCategoryName(categoryId, name) {
    return function(dispatch, getState) {
        let state = getState();
        let originalCategory = state.warehouse.categories.categoryById[categoryId];
        let modifiedCategory = state.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.admin.modifiedCategoryById[categoryId] : null;
        let modifyCategory = modifiedCategory === null ? originalCategory : modifiedCategory;

        let newCategory = update(modifyCategory, {
            name: {$set: name}
        });

        if (newCategory.name === originalCategory.name &&
            newCategory.parentCategoryId === originalCategory.parentCategoryId &&
            newCategory.weight === originalCategory.weight) {
            dispatch(removeModifiedCategory(categoryId));
        } else {
            dispatch(setModifiedCategory(newCategory));
        }
    };
}

export function setCategoryParentId(categoryId, parentCategoryId) {
    return function(dispatch, getState) {
        let state = getState();
        let originalCategory = state.warehouse.categories.categoryById[categoryId];
        let modifiedCategory = state.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.admin.modifiedCategoryById[categoryId] : null;
        let modifyCategory = modifiedCategory === null ? originalCategory : modifiedCategory;

        let newCategory = update(modifyCategory, {
            parentCategoryId: {$set: parentCategoryId}
        });

        if (newCategory.name === originalCategory.name &&
            newCategory.parentCategoryId === originalCategory.parentCategoryId &&
            newCategory.weight === originalCategory.weight) {
            dispatch(removeModifiedCategory(categoryId));
        } else {
            dispatch(setModifiedCategory(newCategory));
        }
    };
}

export function setCategoryWeight(categoryId, weight) {
    return function(dispatch, getState) {
        let state = getState();
        let originalCategory = state.warehouse.categories.categoryById[categoryId];
        let modifiedCategory = state.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.admin.modifiedCategoryById[categoryId] : null;
        let modifyCategory = modifiedCategory === null ? originalCategory : modifiedCategory;

        let newCategory = update(modifyCategory, {
            weight: {$set: weight}
        });

        if (newCategory.name === originalCategory.name &&
            newCategory.parentCategoryId === originalCategory.parentCategoryId &&
            newCategory.weight === originalCategory.weight) {
            dispatch(removeModifiedCategory(categoryId));
        } else {
            dispatch(setModifiedCategory(newCategory));
        }
    };
}