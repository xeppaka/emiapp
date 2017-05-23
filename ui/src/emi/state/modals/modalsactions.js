export const SHOW_PRODUCTS_ORDER_MODAL = 'SHOW_PRODUCTS_ORDER_MODAL';
export const SHOW_SAVE_PRODUCTS_MODAL = 'SHOW_SAVE_PRODUCTS_MODAL';
export const SHOW_SAVE_CATEGORIES_MODAL = 'SHOW_SAVE_CATEGORIES_MODAL';
export const SHOW_CREATE_PRODUCT_MODAL = 'SHOW_CREATE_PRODUCT_MODAL';
export const SHOW_CREATE_CATEGORY_MODAL = 'SHOW_CREATE_CATEGORY_MODAL';
export const SHOW_MESSAGE_BOX_MODAL = 'SHOW_MESSAGE_BOX_MODAL';
export const SHOW_IMAGE_MODAL = 'SHOW_IMAGE_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showProductsOrderModal() {
    return { type: SHOW_PRODUCTS_ORDER_MODAL };
}

export function showSaveProductsModal() {
    return { type: SHOW_SAVE_PRODUCTS_MODAL };
}

export function showSaveCategoriesModal() {
    return { type: SHOW_SAVE_CATEGORIES_MODAL };
}

export function showCreateProductModal() {
    return { type: SHOW_CREATE_PRODUCT_MODAL };
}

export function showCreateCategoryModal() {
    return { type: SHOW_CREATE_CATEGORY_MODAL };
}

export function showMessageBoxModal(title, text) {
    return { type: SHOW_MESSAGE_BOX_MODAL, title: title, text: text };
}

export function showImageModal(title, imageLink) {
    return { type: SHOW_IMAGE_MODAL, title: title, imageLink: imageLink };
}

export function hideModal(id) {
    return { type: HIDE_MODAL, id: id };
}
