import { combineReducers } from 'redux';
import menu from './menu/menu';
import products from './products/products';
import order from './order/order';
import modals from './modals/modals';

const emiApp = combineReducers({
    products,
    menu,
    order,
    modals
});

export default emiApp;