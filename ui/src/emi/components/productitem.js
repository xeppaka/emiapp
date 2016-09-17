import React, { PropTypes } from 'react';
import ProductItemQuantity from './productitemquantity';

const ProductItem = ({ idx, name, price, quantity, productQuantityChanged }) => {
    var calculatedPrice = price * quantity;
    var calculatedPriceStr = "";

    if (calculatedPrice > 0) {
        calculatedPriceStr = String(calculatedPrice.toFixed(2));
    }

    return (<tr>
        <td className="mdl-data-table__cell--non-numeric" scope="row">{idx + 1}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
            <ProductItemQuantity
                idx={idx}
                quantity={quantity}
                productQuantityChanged={productQuantityChanged} />
        </td>
        <td>{calculatedPriceStr}</td>
    </tr>)
};

ProductItem.propTypes = {
    name: PropTypes.string.isRequired
};

export default ProductItem;