import React, { PropTypes } from 'react';
import ProductFeaturesText from './features/productfeaturestext';

class AdminProductsTableDeletedRow extends React.Component {
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
        let category = this.props.categories.find((cat) => cat.categoryId === product.categoryId);
        let categoryName = category.name;

        return (<tr onClick={() => this.props.onSetCurrentModifyProduct(product.productId)}>
            <th scope='row'>{this.props.idx}</th>
            <td>
                <span style={{color: 'red'}}>{'DELETED'}</span>{' - ' + product.name}
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

export default AdminProductsTableDeletedRow;
