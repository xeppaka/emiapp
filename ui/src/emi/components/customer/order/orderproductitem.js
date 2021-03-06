import React, { PropTypes } from 'react';

class OrderProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let isMain = product.isMain;

        let price = Number((product.price / 100).toFixed(2));
        let discountPrice = isMain ? Number((product.price / 200).toFixed(2)) : 0;
        let calculatedTotalPrice = Number((product.price / 100 * product.quantity).toFixed(2));
        let calculatedTotalPriceWithDiscount = product.isMain ? Number((product.price / 200 * product.quantity).toFixed(2)) : 0;

        return (<tr>
            <th scope="row">{this.props.idx}</th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{price}</td>
            <td>{discountPrice}</td>
            <td>{product.quantity}</td>
            <td>{calculatedTotalPrice}</td>
            <td>{calculatedTotalPriceWithDiscount}</td>
        </tr>)
    }
}

export default OrderProductItem;