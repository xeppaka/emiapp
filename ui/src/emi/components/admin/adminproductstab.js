import React, { PropTypes } from 'react';
import AdminProductsTable from './products/adminproductstable';
import AdminProductsTotal from './products/adminproductstotal';

class AdminProductsTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button type='button' className='btn btn-primary' onClick={this.props.onCreateProduct}>New Product</button>
                <AdminProductsTable currentModifyingProductId={this.props.currentModifyingProductId}
                                    productsList={this.props.productsList}
                                    categoriesList={this.props.categoriesList}
                                    onProductNameChanged={this.props.onProductNameChanged}
                                    onProductPriceChanged={this.props.onProductPriceChanged}
                                    onProductCategoryChanged={this.props.onProductCategoryChanged}
                                    onProductMultiplicityChanged={this.props.onProductMultiplicityChanged}
                                    onProductNoteChanged={this.props.onProductNoteChanged}
                                    onProductWeightChanged={this.props.onProductWeightChanged}
                                    onProductFeatureChanged={this.props.onProductFeatureChanged}
                                    onDeleteProduct={this.props.onDeleteProduct}
                                    onSetCurrentModifyingProduct={this.props.onSetCurrentModifyingProduct}
                />
                <AdminProductsTotal modifiedProducts={this.props.modifiedProducts}
                                    createdProducts={this.props.createdProducts}
                                    deletedProducts={this.props.deletedProducts}
                                    canSave={this.props.canSave}
                                    onResetModifications={this.props.onResetModifications}
                                    onSaveModifications={this.props.onSaveModifications}
                />
            </div>
        )
    }
}

export default AdminProductsTab;