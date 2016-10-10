export const SET_ORDER_EMAIL = 'SET_ORDER_EMAIL';
export const SET_ORDER_COUNTRY = 'SET_ORDER_COUNTRY';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export function setOrderEmail(email) {
    return { type: SET_ORDER_EMAIL, email: email };
}

export function setOrderCountry(country) {
    return { type: SET_ORDER_COUNTRY, country: country };
}

export function submitOrder() {
    return { type: SUBMIT_ORDER };
}