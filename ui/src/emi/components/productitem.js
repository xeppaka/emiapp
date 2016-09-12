import React, { PropTypes } from 'react';

const ProductItem = ({ name }) => (
    <li>
        {name}
    </li>
);

ProductItem.propTypes = {
    name: PropTypes.string.isRequired
};

export default ProductItem;