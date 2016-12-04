import React, { PropTypes } from 'react';
import SaveProductItem from './saveproductstablerow';

class SaveProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts(products) {
        let productsItems = [];

        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            productsItems.push(<SaveProductItem
                key={product.productId} idx={i + 1} product={product} />)
        }

        return productsItems;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope='row' style={{width:'2%'}}>#</th>
                    <th style={{width:'33%'}}>Product Name</th>
                    <th style={{width:'13%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                </tr>
                </thead>
                <tbody>
                { this.renderProducts(this.props.products) }
                </tbody>
            </table>
        )
    }
}

export default SaveProductsTable;