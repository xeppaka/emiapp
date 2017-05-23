import React, { PropTypes } from 'react';
import ProductFeaturesText from './features/productfeaturestext';

class AdminProductsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.categories.length !== nextProps.categories.length) ||
            (this.props.product !== nextProps.product) ||
            (this.props.idx !== nextProps.idx) ||
            (this.props.currentModifyProductId !== nextProps.currentModifyProductId);
    }

    render() {
        let product = this.props.product;
        let modification = this.props.modification;
        let category = this.props.categories.find((cat) => cat.categoryId === product.categoryId);
        let categoryName = category.name;

        let nameComponent;
        if (modification === 'DELETED') {
            nameComponent = <span><span style={{color: 'red'}}>{'DELETED'}</span>{' - ' + product.name}</span>;
        } else if (modification === 'CREATED') {
            nameComponent = <span><span style={{color: 'green'}}>{'CREATED'}</span>{' - ' + product.name}</span>;
        } else {
            nameComponent = <span>{product.name}</span>;
        }

        return (<tr onClick={() => this.props.onSetCurrentModifyProduct(product.productId)}>
            <th scope='row'>{this.props.idx}</th>
            <td>
                {nameComponent}
            </td>
            <td>
                {product.price}
            </td>
            <td>
                {product.multiplicity}
            </td>
            <td>
                {categoryName}
            </td>
            <td>
                <ProductFeaturesText features={product.features} />
            </td>
            <td>
                {product.note}
            </td>
            <td>
                {product.weight}
            </td>
        </tr>)
    }
}

export default AdminProductsTableRow;
