import { combineReducers } from 'redux';
import menu from './menu/menu';
import products from './products/products';
import order from './order/order';

const emiApp = combineReducers({
    products,
    menu,
    order
});

export default emiApp;