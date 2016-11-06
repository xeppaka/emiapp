export const SET_WAREHOUSE = 'SET_WAREHOUSE';

export function setWarehouse(warehouse) {
    return { type: SET_WAREHOUSE, warehouse: warehouse };
}

export function loadWarehouse() {
    return function(dispatch) {
        return fetch('/api/warehouse')
            .then(response => response.json())
            .then(warehouseData => {
                dispatch(setWarehouse(warehouseData));
            });
    };
}