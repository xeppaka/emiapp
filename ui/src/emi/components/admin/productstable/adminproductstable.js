import React, { PropTypes } from 'react';
import AdminProductsTableRow from './adminproductstablerow';

class AdminProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < productsLength; i++) {
            let product = products[i].product;

            productsItems.push(<AdminProductsTableRow
                key={product.productId} idx={i + 1}
                product={product}
                categoriesList={this.props.categoriesList}
                onProductNameChanged={this.props.onProductNameChanged}
                onProductPriceChanged={this.props.onProductPriceChanged}
                onProductCategoryChanged={this.props.onProductCategoryChanged}
            />)
        }

        return productsItems;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope='row' style={{width:'2%'}}>#</th>
                    <th style={{width:'38%'}}>Product Name</th>
                    <th style={{width:'20%'}}>Product Category</th>
                    <th style={{width:'20%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                    <th style={{width:'20%'}}>Weight</th>
                </tr>
                </thead>
                <tbody>
                { this.renderProducts() }
                </tbody>
            </table>
        )
    }
}

export default AdminProductsTable;