import React, { PropTypes } from 'react';
import OrderProductItem from './orderproductitem';

class OrderProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < productsLength; i++) {
            let product = products[i];
            productsItems.push(<OrderProductItem key={product.id} idx={i+1} product={product} />);
        }

        return productsItems;
    }

    render() {
        return (
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope='row'>#</th>
                            <th>Product Name</th>
                            <th>Retail price<br />(without VAT, in &#8364;)</th>
                            <th>Discount price<br />(without VAT, in &#8364;)</th>
                            <th>Quantity</th>
                            <th>Retail price x Quantity<br />(without discount, without VAT in &#8364;)</th>
                            <th>Retail price x Quantity<br />(with discount, without VAT in &#8364;)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderProducts() }
                    </tbody>
                </table>
               )
    }
}

export default OrderProductsTable;