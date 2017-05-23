import { createSelector } from 'reselect';

export const adminProductsSelector = createSelector(
    [
        (state) => state.emiapp.admin.modifiedProductById,
        (state) => state.emiapp.admin.newProductById
    ],
    (modifiedProductById, newProductById) => {
        let products = [];

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                products.push(modifiedProductById[key]);
            }
        }

        for (let key in newProductById) {
            if (!newProductById.hasOwnProperty(key))
                continue;

            if (newProductById[key] !== null) {
                products.push(newProductById[key]);
            }
        }

        return products;
    }
);

function generateCustomerNotification(products) {
    let header = "List of modified products:\n";
    let footer = "Sincerely, your E.Mi team, hahaha.";

    let productsText = "";
    let productsLength = products.length;

    for (let i = 0; i < productsLength; i++) {
        let product = products[i];
        productsText += 'Name: ' + product.name + ', price: ' + product.price + '\n';
    }

    return header + productsText + footer;
}

export const notificationSelector = createSelector(
    [
        (state) => state.emiapp.admin.sendNotificationToCustomers,
        (state) => state.emiapp.admin.notificationText,
        adminProductsSelector
    ],
    (sendNotification, notificationText, modifiedProducts) => {
        if (!sendNotification) {
            return {
                sendNotification: false
            }
        }

        let text = notificationText !== null ? notificationText : generateCustomerNotification(modifiedProducts);
        return {
            sendNotification: true,
            text: text
        }
    }
);