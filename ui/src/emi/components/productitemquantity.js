import React, { PropTypes } from 'react';

const ProductItemQuantity = ({ idx, quantity, productQuantityChanged }) => (
    <input type="number" value={quantity > 0 ? quantity : ""}
            onChange={(event) => {
                var v = Number(event.target.value);

                if (!isNaN(v)) {
                    productQuantityChanged(idx, v);
                }
            }
    } />
);

ProductItemQuantity.propTypes = {
    quantity: PropTypes.number.isRequired
};

export default ProductItemQuantity;