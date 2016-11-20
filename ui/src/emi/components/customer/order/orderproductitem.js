import React, { PropTypes } from 'react';

class OrderProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let calculatedPrice = Number((product.price / 100 * product.quantity).toFixed(2));
        let calculatedPriceWithDiscount = product.type === 'MAIN' ? Number((product.price / 200 * product.quantity).toFixed(2)) : 0;

        return (<tr>
            <th scope="row">{this.props.idx}</th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{Number((product.price / 100).toFixed(2))}</td>
            <td>{Number((product.price / 200).toFixed(2))}</td>
            <td>{product.quantity}</td>
            <td>{calculatedPrice}</td>
            <td>{calculatedPriceWithDiscount}</td>
        </tr>)
    }
}

export default OrderProductItem;