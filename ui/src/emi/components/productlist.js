import React, { PropTypes } from 'react';
import ProductItem from './productitem';

const ProductList = ({ products }) => (
    <ul>
        {products.map(product =>
            <ProductItem
                {...product}
            />
        )}
    </ul>
);

TodoList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ProductList;