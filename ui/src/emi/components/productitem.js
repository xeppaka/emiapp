import React, { PropTypes } from 'react';

const ProductItem = ({ row, name, price }) => (
    <tr>
        <th scope="row">{row}</th>
        <td>{name}</td>
        <td>{price}</td>
        <td><input type="number" value="0" min="0" step="5" /></td>
    </tr>
);

ProductItem.propTypes = {
    name: PropTypes.string.isRequired
};

export default ProductItem;