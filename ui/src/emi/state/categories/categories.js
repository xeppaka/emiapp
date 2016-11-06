import update from 'react-addons-update';
import { SET_CATEGORIES } from './categoriesactions';

const initialCategoriesState = {
    categoriesById: {}
};

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return update(state, {
                categoriesById: {$set: action.categoriesById}
            });
        default:
            return state;
    }
}

export default categories;