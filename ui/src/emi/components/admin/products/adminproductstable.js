import React, {PropTypes} from 'react';
import AdminProductsTableRow from './adminproductstablerow';
import AdminProductsTableModifyRow from './adminproductstablemodifyrow';
import AdminSelectedProductSecondRow from './adminproducttablesecondrow';
import AdminSelectedProductSecondRowDeleted from './adminproducttablesecondrowdeleted';

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

            if (productSelected && modification !== 'DELETED') {
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
                    modification={modification}
                    categories={this.props.categories}
                    onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                />);
            }

            if (productSelected) {
                if (modification === 'DELETED') {
                    productsItems.push(<AdminSelectedProductSecondRowDeleted
                        key={product.productId + '-buttons'}
                        product={product}
                        onProductImageThumbnailChanged={this.props.onProductImageThumbnailChanged}
                        onProductImageChanged={this.props.onProductImageChanged}
                        onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                        onDeleteProduct={this.props.onDeleteProduct}
                        onAcceptProduct={this.props.onAcceptProduct}
                        onResetProduct={this.props.onResetProduct}
                    />);
                } else {
                    productsItems.push(<AdminSelectedProductSecondRow
                        key={product.productId + '-buttons'}
                        product={product}
                        modification={modification}
                        onProductImageThumbnailChanged={this.props.onProductImageThumbnailChanged}
                        onProductImageChanged={this.props.onProductImageChanged}
                        onSetCurrentModifyProduct={this.props.onSetCurrentModifyProduct}
                        onDeleteProduct={this.props.onDeleteProduct}
                        onAcceptProduct={this.props.onAcceptProduct}
                        onResetProduct={this.props.onResetProduct}
                    />);
                }
            }
        }

        return productsItems;
    }

    render() {
        return (
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope='row' style={{width: '2%'}}>#</th>
                    <th style={{width: '29%'}}>Product Name</th>
                    <th style={{width: '7%'}}>Retail price<br />(without VAT, in &#8364; cents)</th>
                    <th style={{width: '7%'}}>Multiplicity</th>
                    <th style={{width: '20%'}}>Product Category</th>
                    <th style={{width: '15%'}}>Features</th>
                    <th style={{width: '15%'}}>Note</th>
                    <th style={{width: '5%'}}>Weight</th>
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