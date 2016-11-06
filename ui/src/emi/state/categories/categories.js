import update from 'react-addons-update';
import { SET_CATEGORIES } from './categoriesactions';
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
        default:
            return state;
    }
}

export default categories;