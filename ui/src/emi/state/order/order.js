import update from 'react-addons-update';
import { SET_ORDER_EMAIL, SET_ORDER_COUNTRY, SUBMIT_ORDER_STARTED, SUBMIT_ORDER_FINISHED_SUCCESS, SUBMIT_ORDER_FINISHED_FAIL } from './orderactions';

const initialOrderState = {
    email: '',
    country: 'CYP',
    submitting: false
};

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
        case SUBMIT_ORDER_STARTED:
            return update(state, {
                submitting: {$set: true}
            });
        case SUBMIT_ORDER_FINISHED_SUCCESS:
        case SUBMIT_ORDER_FINISHED_FAIL:
            return update(state, {
                submitting: {$set: false}
            });
        default:
            return state;
    }
}

export default order;