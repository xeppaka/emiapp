export const SET_CATEGORIES = 'SET_CATEGORIES';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export function setCategories(categoriesById) {
    return { type: SET_CATEGORIES, categoriesById: categoriesById };
}

export function removeCategory(categoryId) {
    return { type: REMOVE_CATEGORY, categoryId: categoryId }
}

export function updateCategories(categories) {
    return { type: UPDATE_CATEGORIES, categories: categories }
}