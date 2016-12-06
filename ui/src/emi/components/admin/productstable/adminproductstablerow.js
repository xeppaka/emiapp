import React, { PropTypes } from 'react';
import NameValueSelector from '../namevalueselector';

class AdminProductsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.categoriesList.length !== nextProps.categoriesList.length) ||
            (this.props.product !== nextProps.product);
    }

    render() {
        let product = this.props.product;
        let categoryNameIdList = this.props.categoriesList
            .map(cat => { return { name: cat.name, value: cat.categoryId } });

        return (<tr>
            <th scope='row'>{this.props.idx}</th>
            <td>
                <input type='text' className='form-control form-control-sm' value={product.name}
                       onChange={(event) => this.props.onProductNameChanged(product.productId, event.target.value)} />
            </td>
            <td>
                <NameValueSelector currentValue={product.categoryId}
                                   nameValueList={categoryNameIdList}
                                   onValueSelected={(categoryId) => this.props.onProductCategoryChanged(product.productId, categoryId)}
                />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' value={product.price}
                       onChange={(event) => this.props.onProductPriceChanged(product.productId, Number(event.target.value))} />
            </td>
            <td>
                <input disabled type='number' className='form-control form-control-sm' value={product.weight}
                       onChange={() => {}} />
            </td>
        </tr>)
    }
}

export default AdminProductsTableRow;