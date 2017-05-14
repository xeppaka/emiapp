import update from 'react-addons-update';
import {
    adminCategoriesTreeSelector,
    modifiedCategoriesListSaveSelector
} from '../selectors/categoriesselector';
import {adminModifiedProductsSelector} from '../selectors/productsselector';
import {showMessageBoxModal, hideModal} from '../modals/modalsactions';
import {updateProducts, removeProduct} from '../products/productsactions';
import {updateCategories, removeCategories} from '../categories/categoriesactions';
import {loadWarehouse} from '../warehouse/warehouseactions';

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
export const SET_MODIFY_PRODUCT = "SET_MODIFY_PRODUCT";
export const CLEAR_MODIFY_PRODUCT = "CLEAR_MODIFY_PRODUCT";

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
    return function (dispatch, getState) {
        let state = getState();
        let productById = state.emiapp.warehouse.products.productById;

        if (productById.hasOwnProperty(productId)) {
            dispatch(removeModifiedProduct(productId));
            dispatch(setProductDeleted(productId));
        } else {
            dispatch(removeProductDeleted(productId));
            dispatch(removeModifiedProduct(productId));
        }
    }
}

export function resetProduct(productId) {
    return function (dispatch, getState) {
        dispatch(removeProductDeleted(productId));
        dispatch(removeModifiedProduct(productId));
    }
}

function setCategoryDeleted(categoryId) {
    return {type: SET_CATEGORY_DELETED, categoryId: categoryId};
}

function removeCategoryDeleted(categoryId) {
    return {type: REMOVE_CATEGORY_DELETED, categoryId: categoryId};
}

export function deleteCategory(categoryId) {
    return function (dispatch, getState) {
        let state = getState();
        let categoryById = state.emiapp.warehouse.categories.categoryById;

        if (categoryById.hasOwnProperty(categoryId)) {
            dispatch(setCategoryDeleted(categoryId));
        } else {
            dispatch(removeCategoryDeleted(categoryId));
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
            features: ['VISIBLE', 'AVAILABLE'],
            categoryId: rootCategoryId,
            weight: 0,
            note: ''
        }));
    }
}

function addNewProduct(product) {
    return {type: ADD_NEW_PRODUCT, product};
}

export function createCategory() {
    return function (dispatch, getState) {
        let categories = adminCategoriesTreeSelector(getState());
        let rootCategoryId = categories['root'].categoryId;

        dispatch(addNewCategory({
            categoryId: '',
            name: '',
            parentCategoryId: rootCategoryId,
            weight: 0
        }));
    }
}

function addNewCategory(category) {
    return {type: ADD_NEW_CATEGORY, category};
}

function removeModifiedProduct(id) {
    return {type: REMOVE_MODIFIED_PRODUCT, id: id};
}

function setModifiedCategory(category) {
    return {type: SET_MODIFIED_CATEGORY, category: category}
}

function removeModifiedCategory(id) {
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

function deleteProducts(dispatch, products) {
    let promises = [];
    let authToken = localStorage.getItem('auth-token');
    for (let i = 0; i < products.length; i++) {
        let productId = products[i].productId;
        let p = fetch('/api/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
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
    let authToken = localStorage.getItem('auth-token');
    for (let key in products) {
        if (!products.hasOwnProperty(key))
            continue;

        let product = products[key];
        let p = fetch('/api/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
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
        let authToken = localStorage.getItem('auth-token');
        return fetch('/api/products', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
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
        let products = adminModifiedProductsSelector(getState());
        deleteProducts(dispatch, products.deletedProducts)
            .then(() => createProducts(dispatch, products.createdProducts))
            .then(() => modifyProducts(dispatch, products.modifiedProducts))
            .then(() => {
                    dispatch(saveFinished());
                    dispatch(resetProducts());
                    dispatch(hideModal(saveModalId));
                }, () => {
                    dispatch(saveFinished());
                    dispatch(showMessageBoxModal('Product(s) save failed.', 'Error occurred while saving product(s).'));
                }
            );
    };
}

function deleteCategories(dispatch, categories) {
    let promises = [];
    let authToken = localStorage.getItem('auth-token');
    for (let i = 0; i < categories.length; i++) {
        let categoryId = categories[i].categoryId;
        let p = fetch('/api/categories/' + categoryId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
            }
        }).then(response => {
            if (response.status !== 200) {
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then(deleteCategoryResult => {
            dispatch(removeCategories(deleteCategoryResult.deletedCategories));
            dispatch(updateProducts(deleteCategoryResult.updatedProducts));
        });

        promises.push(p);
    }

    return Promise.all(promises);
}

function updateParentCategoryIds(oldCategoryId, newCategoryId, categories) {
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        if (category.parentCategoryId === oldCategoryId)
            category.parentCategoryId = newCategoryId;
    }
}

function createCategories(dispatch, categories) {
    let currPromise = Promise.resolve();
    let authToken = localStorage.getItem('auth-token');
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        currPromise = currPromise.then(
            () => fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                },
                body: JSON.stringify(category)})
        ).then(response => {
            if (response.status !== 201) {
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then(createdCategory => {
            updateParentCategoryIds(category.categoryId, createdCategory.categoryId, categories);
            dispatch(updateCategories([createdCategory]));
        });
    }

    return currPromise;
}

function modifyCategories(dispatch, categories) {
    if (categories.length > 0) {
        let authToken = localStorage.getItem('auth-token');
        return fetch('/api/categories', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': authToken
            },
            body: JSON.stringify(categories)
        }).then(response => {
            if (response.status !== 200) {
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then(modifiedCategoriesData => {
            dispatch(updateCategories(modifiedCategoriesData));
        });
    } else {
        return Promise.resolve();
    }
}

function createOrderComparator(category1, category2) {
    let id1 = category1.categoryId.substring(24);
    let id2 = category2.categoryId.substring(24);

    return Number(id1) - Number(id2);
}

export function saveCategories(saveModalId) {
    return function (dispatch, getState) {
        dispatch(saveStarted());
        let categories = modifiedCategoriesListSaveSelector(getState());
        deleteCategories(dispatch, categories.deletedCategories)
            .then(() => createCategories(dispatch, categories.createdCategories.slice().sort(createOrderComparator)))
            .then(() => modifyCategories(dispatch, categories.modifiedCategories))
            .then(() => {
                    dispatch(saveFinished());
                    dispatch(resetCategories());
                    dispatch(hideModal(saveModalId));
                }, () => {
                    dispatch(saveFinished());
                    dispatch(showMessageBoxModal('Category(s) save failed.', 'Error occurred while saving category(s).'));
                }
            );
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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

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
        let productById = state.emiapp.warehouse.products.productById;
        let modifiedProductById = state.emiapp.admin.modifiedProductById;

        let originalProduct = productById.hasOwnProperty(productId) ? productById[productId] : null;
        let modifiedProduct = modifiedProductById.hasOwnProperty(productId) ? modifiedProductById[productId] : null;
        modifiedProduct = modifiedProduct === null ? originalProduct : modifiedProduct;
        modifiedProduct = update(modifiedProduct, {
            weight: {$set: weight}
        });

        compareProductsAndDispatch(dispatch, modifiedProduct, originalProduct);
    };
}

function compareCategoriesAndDispatch(dispatch, modifiedCategory, originalCategory) {
    if (originalCategory !== null &&
        modifiedCategory.name === originalCategory.name &&
        modifiedCategory.parentCategoryId === originalCategory.parentCategoryId &&
        modifiedCategory.weight === originalCategory.weight) {
        dispatch(removeModifiedCategory(originalCategory.categoryId));
    } else {
        dispatch(setModifiedCategory(modifiedCategory));
    }
}

export function setCategoryName(categoryId, name) {
    return function (dispatch, getState) {
        let state = getState();
        let categoryById = state.emiapp.warehouse.categories.categoryById;
        let originalCategory = categoryById.hasOwnProperty(categoryId) ? categoryById[categoryId] : null;
        let modifiedCategory = state.emiapp.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.emiapp.admin.modifiedCategoryById[categoryId] : null;
        modifiedCategory = modifiedCategory === null ? originalCategory : modifiedCategory;
        modifiedCategory = update(modifiedCategory, {
            name: {$set: name}
        });

        compareCategoriesAndDispatch(dispatch, modifiedCategory, originalCategory);
    };
}

export function setCategoryParentId(categoryId, parentCategoryId) {
    return function (dispatch, getState) {
        let state = getState();
        let categoryById = state.emiapp.warehouse.categories.categoryById;
        let originalCategory = categoryById.hasOwnProperty(categoryId) ? categoryById[categoryId] : null;
        let modifiedCategory = state.emiapp.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.emiapp.admin.modifiedCategoryById[categoryId] : null;
        modifiedCategory = modifiedCategory === null ? originalCategory : modifiedCategory;
        modifiedCategory = update(modifiedCategory, {
            parentCategoryId: {$set: parentCategoryId}
        });

        compareCategoriesAndDispatch(dispatch, modifiedCategory, originalCategory);
    };
}

export function setCategoryWeight(categoryId, weight) {
    return function (dispatch, getState) {
        let state = getState();
        let categoryById = state.emiapp.warehouse.categories.categoryById;
        let originalCategory = categoryById.hasOwnProperty(categoryId) ? categoryById[categoryId] : null;
        let modifiedCategory = state.emiapp.admin.modifiedCategoryById.hasOwnProperty(categoryId) ? state.emiapp.admin.modifiedCategoryById[categoryId] : null;
        modifiedCategory = modifiedCategory === null ? originalCategory : modifiedCategory;
        modifiedCategory = update(modifiedCategory, {
            weight: {$set: weight}
        });

        compareCategoriesAndDispatch(dispatch, modifiedCategory, originalCategory);
    };
}

export function bootstrapAdmin() {
    return function(dispatch) {
        return dispatch(loadWarehouse());
    }
}

export function setCurrentModifyProduct(productId) {
    return function(dispatch, getState) {
        let state = getState();

        if (state.emiapp.admin.currentModifyProductId === null) {
            dispatch(setModifyProduct(productId));
        } else if (state.emiapp.admin.currentModifyProductId !== productId) {
            dispatch(setModifyProduct(productId));
        } else {
            dispatch(clearModifyProduct());
        }
    }
}

function setModifyProduct(productId) {
    return {type: SET_MODIFY_PRODUCT, productId: productId};
}

function clearModifyProduct() {
    return {type: CLEAR_MODIFY_PRODUCT};
}
