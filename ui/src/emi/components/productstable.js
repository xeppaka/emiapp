import React, { PropTypes } from 'react';
import ProductItem from './productitem';

const ProductsTable = ({ products, productQuantityChanged }) => (
    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
            <tr>
                <th className="mdl-data-table__cell--non-numeric">#</th>
                <th>Product Name</th>
                <th>Retail price<br />(without VAT, in &#8364;)</th>
                <th>Quantity</th>
                <th>Retail price x Quantity<br />(without VAT in &#8364;)</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, idx) =>
                <ProductItem
                    key={product.idx}
                    idx={product.idx}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    productQuantityChanged={productQuantityChanged}
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