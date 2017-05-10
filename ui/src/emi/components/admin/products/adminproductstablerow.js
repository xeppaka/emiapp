import React, { PropTypes } from 'react';
import NameValueSelector from '../../common/namevalueselector';
import ProductFeatures from './features/productfeatures';

class AdminProductsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.categoriesList.length !== nextProps.categoriesList.length) ||
            (this.props.product !== nextProps.product) ||
            (this.props.idx !== nextProps.idx) ||
            (this.props.currentModifyingProductId !== nextProps.currentModifyingProductId);
    }

    render() {
        let product = this.props.product;
        let categoryNameIdList = this.props.categoriesList
            .map(cat => { return { name: cat.name, value: cat.categoryId } });

        return (<tr onClick={() => this.props.onSetCurrentModifyingProduct(product.productId)}>
            <th scope='row'>{this.props.idx}</th>
            <td>
                {product.name}
            </td>
            <td>
                {product.price}
            </td>
            <td>
                {product.multiplicity}
            </td>
            <td>
                {product.categoryId}
            </td>
            <td>
                {product.features}
            </td>
            <td>
                {product.note}
            </td>
            <td>
                {product.weight}
            </td>
            <td>
                <button type='button' className='btn btn-sm btn-secondary' onClick={() => this.props.onDeleteProduct(product.productId)}>Delete</button>
            </td>
        </tr>)
    }
}

export default AdminProductsTableRow;
