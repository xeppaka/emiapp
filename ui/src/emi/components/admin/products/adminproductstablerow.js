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
            (this.props.idx !== nextProps.idx)
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
                <input type='number' className='form-control form-control-sm' value={product.price}
                       onChange={(event) => this.props.onProductPriceChanged(product.productId, Number(event.target.value))} />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' value={product.multiplicity} min={1}
                       onChange={(event) => {
                           let val = Number(event.target.value);
                           if (val >= 1) {
                               this.props.onProductMultiplicityChanged(product.productId, val);
                           }
                       }} />
            </td>
            <td>
                <NameValueSelector currentValue={product.categoryId}
                                   nameValueList={categoryNameIdList}
                                   onValueSelected={(categoryId) => this.props.onProductCategoryChanged(product.productId, categoryId)}
                />
            </td>
            <td>
                <ProductFeatures features={product.features}
                                 onProductFeatureChanged={(name, enabled) => this.props.onProductFeatureChanged(product.productId, name, enabled)}
                />
            </td>
            <td>
                <input type='text' className='form-control form-control-sm' value={product.note}
                       onChange={(event) => this.props.onProductNoteChanged(product.productId, event.target.value)} />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' value={product.weight} min='0'
                       onChange={(event) => {
                           let val = Number(event.target.value);
                           if (val >= 0) {
                               this.props.onProductWeightChanged(product.productId, val);
                           }
                       }} />
            </td>
            <td>
                <button type='button' className='btn btn-sm btn-secondary' onClick={() => this.props.onDeleteProduct(product.productId)}>Delete</button>
            </td>
        </tr>)
    }
}

export default AdminProductsTableRow;