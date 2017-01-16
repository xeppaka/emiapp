export const SET_WAREHOUSE = 'SET_WAREHOUSE';

function setWarehouse(warehouse) {
    return { type: SET_WAREHOUSE, warehouse: warehouse };
}

export function loadWarehouse() {
    return function(dispatch) {
        return fetch('/api/warehouse').then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    return Promise.reject();
                }
            }).then(warehouseData => {
                dispatch(setWarehouse(warehouseData));
                return Promise.resolve();
            });
    };
}

export function bootstrapCustomer() {
    return function(dispatch) {
        return dispatch(loadWarehouse());
    }
}