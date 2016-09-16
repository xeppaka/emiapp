import React, { PropTypes } from 'react';
import ProductItem from './productitem';

const ProductsTable = ({ products }) => (
    <table className="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Retail price without VAT</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) =>
                <ProductItem
                    row={index}
                    name={product.name}
                    price={product.price}
                />
            )}
        </tbody>
    </table>
);

ProductsTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired
};

export default ProductsTable;