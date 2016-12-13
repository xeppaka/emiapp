import update from 'react-addons-update';
import {adminCategoriesTreeSelector, modifiedCategoriesSaveSelector} from '../selectors/admin/admincategoriesselector';
import {adminProductListSaveSelector} from '../selectors/admin/adminproductsselector';
import {showMessageBoxModal, hideModal} from '../modals/modalsactions';
import {updateProducts, removeProduct} from '../products/productsactions';
import {updateCategories} from '../categories/categoriesactions';

export const SET_MODIFIED_PRODUCT = 'SET_MODIFIED_PRODUCT';
export const REMOVE_MODIFIED_PRODUCT = 'REMOVE_MODIFIED_PRODUCT';
export const SET_MODIFIED_CATEGORY = 'SET_MODIFIED_CATEGORY';
export const REMOVE_MODIFIED_CATEGORY = 'REMOVE_MODIFIED_CATEGORY';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const SET_PRODUCT_DELETED = 'SET_PRODUCT_DELETED';
export const REMOVE_PRODUCT_DELETED = 'REMOVE_PRODUCT_DELETED';
export const SET_CATEGORY_DELETED = 'SET_CATEGORY_DELETED';
export const REMOVE_CATEGORY_DELETED = 'REMOVE_CATEGORY_DELETED';
export const ADMIN_PRODUCTS_RESET = 'ADMIN_PRODUCTS_RESET';
export const ADMIN_CATEGORIES_RESET = 'ADMIN_CATEGORIES_RESET';
export const SET_SEND_CUSTOMER_NOTIFICATION = 'SET_SEND_CUSTOMER_NOTIFICATION';
export const SET_NOTIFICATION_TEXT = 'SET_NOTIFICATION_TEXT';
export const SAVE_STARTED = 'SAVE_STARTED';
export const SAVE_FINISHED = 'SAVE_FINISHED';

export function resetProducts() {
    return {type: ADMIN_PRODUCTS_RESET};
}

export function resetCategories() {
    return {type: ADMIN_CATEGORIES_RESET};
}

export function setModifiedProduct(product) {
    return {type: SET_MODIFIED_PRODUCT, product: product};
}

function setProductDeleted(productId) {
    return {type: SET_PRODUCT_DELETED, productId: productId};
}

function removeProductDeleted(productId) {
    return {type: REMOVE_PRODUCT_DELETED, productId: productId};
}

export function deleteProduct(productId) {
    return function(dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;

        if (productById.hasOwnProperty(productId)) {
            dispatch(setProductDeleted(productId));
        } else {
            dispatch(removeModifiedProduct(productId));
        }
    }
}

function setCategoryDeleted(categoryId) {
    return {type: SET_CATEGORY_DELETED, categoryId: categoryId};
}

function removeCategoryDeleted(categoryId) {
    return {type: REMOVE_CATEGORY_DELETED, categoryId: categoryId};
}

export function deleteCategory(categoryId) {
    return function(dispatch, getState) {
        let state = getState();
        let categoryById = state.warehouse.categories.categoryById;

        if (categoryById.hasOwnProperty(categoryId)) {
            dispatch(setCategoryDeleted(categoryId));
        } else {
            dispatch(removeModifiedCategory(categoryId));
        }
    }
}

export function createProduct() {
    return function (dispatch, getState) {
        let categories = adminCategoriesTreeSelector(getState());
        let rootCategoryId = categories['root'].categoryId;
        dispatch(addNewProduct({
            productId: '',
            name: '',
            price: 0,
            multiplicity: 1,
            features: ['VISIBLE'],
            categoryId: rootCategoryId,
            weight: 0,
            note: ''
        }));
    }
}

export function addNewProduct(product) {
    return {type: ADD_NEW_PRODUCT, product};
}

export function addNewCategory() {
    return {type: ADD_NEW_CATEGORY};
}

export function removeModifiedProduct(id) {
    return {type: REMOVE_MODIFIED_PRODUCT, id: id};
}

export function setModifiedCategory(category) {
    return {type: SET_MODIFIED_CATEGORY, category: category}
}

export function removeModifiedCategory(id) {
    return {type: REMOVE_MODIFIED_CATEGORY, id: id}
}

export function setNotificationText(text) {
    return {type: SET_NOTIFICATION_TEXT, text: text};
}

export function setSendCustomerNotification(value) {
    return {type: SET_SEND_CUSTOMER_NOTIFICATION, value: value};
}

export function saveStarted() {
    return {type: SAVE_STARTED};
}

export function saveFinished() {
    return {type: SAVE_FINISHED};
}

function deleteProducts(dispatch, productIds) {
    let promises = [];
    for (let i = 0; i < productIds.length; i++) {
        let productId = productIds[i];
        let p = fetch('api/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 204) {
                return Promise.reject();
            } else {
                dispatch(removeProduct(productId));
            }
        });

        promises.push(p);
    }

    return Promise.all(promises);
}

function createProducts(dispatch, products) {
    let promises = [];
    for (let key in products) {
        if (!products.hasOwnProperty(key))
            continue;

        let product = products[key];
        let p = fetch('api/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => {
            if (response.status !== 201) {
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then(createdProduct => {
            dispatch(updateProducts([createdProduct]));
        });

        promises.push(p);
    }

    return Promise.all(promises);
}

function modifyProducts(dispatch, products) {
    if (products.length > 0) {
        return fetch('api/products', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        }).then(response => {
            if (response.status !== 200) {
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then(modifiedProductsData => {
            dispatch(updateProducts(modifiedProductsData));
        });
    } else {
        return Promise.resolve();
    }
}

export function saveProducts(saveModalId) {
    return function (dispatch, getState) {
        dispatch(saveStarted());
        let products = adminProductListSaveSelector(getState());
        deleteProducts(dispatch, products.deletedProducts)
            .then(() => createProducts(dispatch, products.createdProducts))
            .then(() => modifyProducts(dispatch, products.modifiedProducts))
            .then(() => {
                    dispatch(saveFinished());
                    dispatch(resetProducts());
                    dispatch(hideModal(saveModalId));
                }, () => {
                    dispatch(saveFinished());
                    dispatch(showMessageBoxModal('Product(s) save failed.', 'Error occurred while saving products.'));
                }
            );
    };
}

export function saveCategories(saveModalId) {
    return function (dispatch, getState) {
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

function featuresEquals(features1, features2) {
    if (features1.length !== features2.length) {
        return false;
    }

    for (let i = 0; i < features1.length; i++) {
        if (features2.indexOf(features1[i]) < 0) {
            return false;
        }
    }

    return true;
}

function compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct) {
    if (originalProduct !== null &&
        modifiedProduct.name === originalProduct.name &&
        modifiedProduct.price === originalProduct.price &&
        modifiedProduct.categoryId === originalProduct.categoryId &&
        modifiedProduct.multiplicity === originalProduct.multiplicity &&
        featuresEquals(modifiedProduct.features, originalProduct.features) &&
        modifiedProduct.note === originalProduct.note &&
        modifiedProduct.weight === originalProduct.weight) {
        dispatch(removeModifiedProduct(originalProduct.productId));
    } else {
        dispatch(setModifiedProduct(modifiedProduct));
    }
}

export function setProductName(productId, name) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            name: {$set: name}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductPrice(productId, price) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            price: {$set: price}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductCategory(productId, categoryId) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            categoryId: {$set: categoryId}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductFeature(productId, featureName, enabled) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        if (enabled) {
            let idx = modifiedProduct.features.indexOf(featureName);
            if (idx < 0) {
                modifiedProduct = update(modifiedProduct, {
                    features: {$push: [featureName]}
                })
            }
        } else {
            let idx = modifiedProduct.features.indexOf(featureName);
            if (idx >= 0) {
                modifiedProduct = update(modifiedProduct, {
                    features: {$splice: [[idx, 1]]}
                })
            }
        }

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductMultiplicity(productId, multiplicity) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            multiplicity: {$set: multiplicity}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductNote(productId, note) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            note: {$set: note}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setProductWeight(productId, weight) {
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.warehouse.products.productById;
        let modifiedProductById = state.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;

        modifiedProduct = update(modifiedProduct, {
            weight: {$set: weight}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

export function setCategoryName(categoryId, name) {
    return function (dispatch, getState) {
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
    return function (dispatch, getState) {
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
    return function (dispatch, getState) {
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