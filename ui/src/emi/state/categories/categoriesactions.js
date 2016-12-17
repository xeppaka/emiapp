export const SET_CATEGORIES = 'SET_CATEGORIES';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';

export function setCategories(categoriesById) {
    return { type: SET_CATEGORIES, categoriesById: categoriesById };
}

export function removeCategories(categoryIds) {
    return { type: REMOVE_CATEGORIES, categoryIds: categoryIds }
}

export function updateCategories(categories) {
    return { type: UPDATE_CATEGORIES, categories: categories }
}