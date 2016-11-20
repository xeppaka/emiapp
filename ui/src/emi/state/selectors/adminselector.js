import { createSelector } from 'reselect';

export const modifiedProductsCountSelector = createSelector(
    [
        (state) => state.admin.modifiedProductById
    ],
    (modifiedProductById) => {
        let modifiedProductsCount = 0;

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                modifiedProductsCount++;
            }
        }

        return modifiedProductsCount;
    }
);

export const modifiedProductsSelector = createSelector(
    [
        (state) => state.admin.modifiedProductById
    ],
    (modifiedProductById) => {
        let modifiedProducts = [];

        for (let key in modifiedProductById) {
            if (!modifiedProductById.hasOwnProperty(key))
                continue;

            if (modifiedProductById[key] !== null) {
                modifiedProducts.push(modifiedProductById[key]);
            }
        }

        return modifiedProducts;
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
        (state) => state.admin.sendNotificationToCustomers,
        (state) => state.admin.notificationText,
        modifiedProductsSelector
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