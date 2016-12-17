import React, { PropTypes } from 'react';
import SaveProductTableRow from './saveproductstablerow';

class SaveProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts(products) {
        let productsItems = [];

        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            productsItems.push(<SaveProductTableRow
                key={product.productId} idx={i + 1} product={product} />)
        }

        return productsItems;
    }

    render() {
        return (
            <table className='table table-striped table-sm'>
                <thead>
                <tr>
                    <th scope='row' style={{width:'2%'}}>#</th>
                    <th style={{width:'21%'}}>Product Name</th>
                    <th style={{width:'9%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                    <th style={{width:'8%'}}>Multiplicity</th>
                    <th style={{width:'15%'}}>Category</th>
                    <th style={{width:'15%'}}>Features</th>
                    <th style={{width:'15%'}}>Note</th>
                    <th style={{width:'15%'}}>Weight</th>
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