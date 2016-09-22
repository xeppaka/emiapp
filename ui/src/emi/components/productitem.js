import React, { PropTypes } from 'react';
import ProductItemQuantity from './productitemquantity';

const ProductItem = ({ idx, product, productQuantityChanged }) => {
    var calculatedPrice = product.price * product.quantity;
    var calculatedPriceStr = "";

    if (calculatedPrice > 0) {
        calculatedPriceStr = String(calculatedPrice.toFixed(2));
    }

    return (<tr>
        <th scope="row">{idx + 1}</th>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
            <ProductItemQuantity
                idx={idx}
                quantity={product.quantity}
                productQuantityChanged={productQuantityChanged} />
        </td>
        {(() => {
                if (product.hasOwnProperty('anchor')) {
                    return <td><a name={product.anchor}></a></td>
                } else {
                    return <td></td>
                }
            }
        )()}
    </tr>)
};

ProductItem.propTypes = {
    name: PropTypes.string.isRequired
};

export default ProductItem;