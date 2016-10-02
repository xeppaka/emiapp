import React, { PropTypes } from 'react';

class OrderProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let calculatedPrice = (product.price * product.quantity).toFixed(2);
        let calculatedPriceWithDiscount = (product.price / 2 * product.quantity).toFixed(2);

        return (<tr>
            <th scope="row">{product.idx + 1}</th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{product.price.toString()}</td>
            <td>{Number(product.price / 2).toString()}</td>
            <td>{product.quantity.toString()}</td>
            <td>{calculatedPrice}</td>
            <td>{calculatedPriceWithDiscount}</td>
        </tr>)
    }
}

export default OrderProductItem;