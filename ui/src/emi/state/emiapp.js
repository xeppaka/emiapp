import { combineReducers } from 'redux';
import menu from './menu/menu';
import order from './order/order';
import modals from './modals/modals';
import warehouse from './warehouse/warehouse';

const emiApp = combineReducers({
    menu,
    warehouse,
    order,
    modals
});

export default emiApp;