import { combineReducers } from 'redux';
import categories from '../categories/categories';
import products from '../products/products';

const warehouse = combineReducers({
    categories,
    products
});

export default warehouse;