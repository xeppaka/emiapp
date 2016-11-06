import { combineReducers } from 'redux';
import categories from './categories/categories';
import products from './products/products';
import order from './order/order';
import modals from './modals/modals';

const emiApp = combineReducers({
    categories,
    products,
    order,
    modals
});

export default emiApp;