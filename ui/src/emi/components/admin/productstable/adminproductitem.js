import React, { PropTypes } from 'react';

class AdminProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;

        return (<tr>
            <th scope='row'>{this.props.idx}</th>
            <td style={{width: '300px'}}><input type='text' className='form-control' value={product.name}
                                                onChange={(event) => this.props.setProductName(product.productId, event.target.value)} /></td>
            <td><input type='number' className='form-control' value={product.price}
                       onChange={(event) => this.props.setProductPrice(product.productId, Number(event.target.value))} /></td>
        </tr>)
    }
}

export default AdminProductItem;