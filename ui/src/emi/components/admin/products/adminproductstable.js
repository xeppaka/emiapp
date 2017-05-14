import React, { PropTypes } from 'react';
import AdminProductsTableRow from './adminproductstablerow';
import AdminProductsTableModifyRow from './adminproductstablemodifyrow';
import AdminProductButtonsRow from "./adminproductbuttons";
import AdminProductButtonsDeletedRow from "./adminproductstabledeletedrow";

class AdminProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderProducts() {
        let productsItems = [];
        let currentModifyProductId = this.props.currentModifyProductId;
        let products = this.props.products.productList;
        let modificationById = this.props.products.modificationById;
        let productsLength = products.length;

        for (let i = 0; i < productsLength; i++) {
            let product = products[i];
            let modification = modificationById[product.productId];
            let productSelected = currentModifyProductId !== null && product.productId === currentModifyProductId;

            if (modification === 'DELETED') {
                productsItems.push(<AdminProductButtonsDeletedRow
                    key={product.productId} idx={i + 1}
                    product={product}
                    categories={this.props.categories}
                    onProductNameChanged={this.props.onProductNameChanged}
                    onProductPriceChanged={this.props.onProductPriceChanged}
                    onProductCategoryChanged={this.props.onProductCategoryChanged}
                    onProductMultiplicityChanged={this.props.onProductMultiplicityChanged}
                    onProductNoteChanged={this.props.onProductNoteChanged}
                    onProductWeightChanged={this.props.onProductWeightChanged}
                    onProductFeatureChanged={this.props.onProductFeatureChanged}
                    onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                />);
            } else if (productSelected) {
                productsItems.push(<AdminProductsTableModifyRow
                    key={product.productId} idx={i + 1}
                    product={product}
                    categories={this.props.categories}
                    onProductNameChanged={this.props.onProductNameChanged}
                    onProductPriceChanged={this.props.onProductPriceChanged}
                    onProductCategoryChanged={this.props.onProductCategoryChanged}
                    onProductMultiplicityChanged={this.props.onProductMultiplicityChanged}
                    onProductNoteChanged={this.props.onProductNoteChanged}
                    onProductWeightChanged={this.props.onProductWeightChanged}
                    onProductFeatureChanged={this.props.onProductFeatureChanged}
                    onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                />);
            } else {
                productsItems.push(<AdminProductsTableRow
                    key={product.productId} idx={i + 1}
                    product={product}
                    categories={this.props.categories}
                    onProductNameChanged={this.props.onProductNameChanged}
                    onProductPriceChanged={this.props.onProductPriceChanged}
                    onProductCategoryChanged={this.props.onProductCategoryChanged}
                    onProductMultiplicityChanged={this.props.onProductMultiplicityChanged}
                    onProductNoteChanged={this.props.onProductNoteChanged}
                    onProductWeightChanged={this.props.onProductWeightChanged}
                    onProductFeatureChanged={this.props.onProductFeatureChanged}
                    onDeleteProduct={this.props.onDeleteProduct}
                    onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                />);
            }

            if (productSelected) {
                productsItems.push(<AdminProductButtonsRow
                    product={product}
                    modification={modification}
                    onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                    onDeleteProduct={this.props.onDeleteProduct}
                    onAcceptProduct={this.props.onAcceptProduct}
                    onResetProduct={this.props.onResetProduct}
                />);
            }
        }

        return productsItems;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope='row' style={{width:'2%'}}>#</th>
                    <th style={{width:'29%'}}>Product Name</th>
                    <th style={{width:'7%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                    <th style={{width:'7%'}}>Multiplicity</th>
                    <th style={{width:'20%'}}>Product Category</th>
                    <th style={{width: '15%'}}>Features</th>
                    <th style={{width: '15%'}}>Note</th>
                    <th style={{width:'5%'}}>Weight</th>
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