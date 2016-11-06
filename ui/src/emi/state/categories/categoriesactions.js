export const SET_CATEGORIES = 'SET_CATEGORIES';

export function setCategories(categoriesById) {
    return { type: SET_CATEGORIES, categoriesById: categoriesById };
}