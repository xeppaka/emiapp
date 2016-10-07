import update from 'react-addons-update';
import { SET_ORDER_EMAIL, SET_ORDER_COUNTRY } from './orderactions';

const initialOrderState = {
    email: '',
    country: 'CZ'
}

function order(state = initialOrderState, action) {
    switch (action.type) {
        case SET_ORDER_EMAIL:
            return update(state, {
                email: {$set: action.email}
            });
        case SET_ORDER_COUNTRY:
            return update(state, {
                country: {$set: action.country}
            });
        default:
            return state;
    }
}

export default order;