import { combineReducers } from 'redux';
import menu from './menu/menu';
import products from './products/products';

const emiApp = combineReducers({
    products,
    menu
});

export default emiApp;