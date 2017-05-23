import { combineReducers } from 'redux';
import menu from './menu/menu';
import order from './order/order';
import modals from './modals/modals';
import warehouse from './warehouse/warehouse';
import admin from './admin/admin';
import security from './security/security';

const emiApp = combineReducers({
    admin,
    menu,
    warehouse,
    order,
    modals,
    security
});

export default emiApp;