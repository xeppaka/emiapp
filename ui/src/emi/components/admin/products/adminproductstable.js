import React, { PropTypes } from 'react';
import AdminProductsTableRow from './adminproductstablerow';

class AdminProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.productsList;
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
                onProductMultiplicityChanged={this.props.onProductMultiplicityChanged}
                onProductNoteChanged={this.props.onProductNoteChanged}
                onProductWeightChanged={this.props.onProductWeightChanged}
                onDeleteProduct={this.props.onDeleteProduct}
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
                    <th style={{width:'28%'}}>Product Name</th>
                    <th style={{width:'7%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                    <th style={{width:'7%'}}>Multiplicity</th>
                    <th style={{width:'20%'}}>Product Category</th>
                    <th style={{width: '13%'}}>Features</th>
                    <th style={{width: '13%'}}>Note</th>
                    <th style={{width:'5%'}}>Weight</th>
                    <th style={{width: '5%'}}>Action</th>
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