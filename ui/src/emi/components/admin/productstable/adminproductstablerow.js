import React, { PropTypes } from 'react';

class AdminProductsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;

        return (<tr>
            <th scope='row'>{this.props.idx}</th>
            <td>
                <input type='text' className='form-control form-control-sm' value={product.name}
                       onChange={(event) => this.props.setProductName(product.productId, event.target.value)} />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' value={product.price}
                       onChange={(event) => this.props.setProductPrice(product.productId, Number(event.target.value))} />
            </td>
            <td>
                <input type='number' className='form-control form-control-sm' value={product.weight}
                       onChange={() => {}} />
            </td>
        </tr>)
    }
}

export default AdminProductsTableRow;