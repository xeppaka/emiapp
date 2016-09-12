import { combineReducers } from 'redux';
import { ADD_PRODUCT, REMOVE_PRODUCT } from './actions';

function products(state = [], action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return [
                ...state,
                {
                    name: 'Some product'
                }
            ];
        case REMOVE_PRODUCT:
            var newProducts = state.slice();
            newProducts.splice(action.idx, 1);
            return newProducts;
        default:
            return state;
    }
}

export default product;