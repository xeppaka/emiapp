import update from 'react-addons-update';
import { SET_CATEGORIES, UPDATE_CATEGORIES, REMOVE_CATEGORIES } from './categoriesactions';
import { SET_WAREHOUSE } from '../warehouse/warehouseactions';

const initialCategoriesState = {
    categoryById: {}
};

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case SET_WAREHOUSE:
            return update(state, {
                categoryById: {$set: action.warehouse.categoryById}
            });
        case SET_CATEGORIES:
            return update(state, {
                categoryById: {$set: action.categoryById}
            });
        case REMOVE_CATEGORIES: {
            let categoryIds = action.categoryIds;
            let updatedState = state;

            for (let i = 0; i < categoryIds.length; i++) {
                updatedState = update(updatedState, {
                    categoryById: {
                        [categoryIds[i]]: {$set: null}
                    }
                });

                delete updatedState.categoryById[categoryIds[i]];
            }

            return updatedState;
        }
        case UPDATE_CATEGORIES: {
            let updatedCategories = action.categories;
            let updatedState = state;

            for (let i = 0; i < updatedCategories.length; i++) {
                updatedState = update(updatedState, {
                    categoryById: {
                        [updatedCategories[i].categoryId]: {$set: updatedCategories[i]}
                    }
                });
            }

            return updatedState;
        }
        default:
            return state;
    }
}

export default categories;