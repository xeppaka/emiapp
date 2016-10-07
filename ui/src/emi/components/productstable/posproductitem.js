import React, { PropTypes } from 'react';
import PosProductItemQuantity from './posproductitemquantity';

class PosProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.product === nextProps.product)
            return false;

        return true;
    }

    isVisible() {
        let elemTop = this.refs.vis.getBoundingClientRect().top;
        let elemBottom = this.refs.vis.getBoundingClientRect().bottom;

        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    }

    render() {
        let product = this.props.product;
        let setProductQuantity = this.props.setProductQuantity;
        let calculatedPrice = Number(product.price * product.quantity).toFixed(2);
        let calculatedPriceStr = '';
        let calculatedPriceDiscountStr = '';

        if (calculatedPrice > 0) {
            calculatedPriceStr = String(calculatedPrice);
            calculatedPriceDiscountStr = '0';
        }

        return (<tr>
            <th scope='row'>{product.id + 1}<div ref={'vis'}></div></th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{0}</td>
            <td>{product.piecesLeftToOrder}</td>
            <td>
                <PosProductItemQuantity
                    product={product}
                    setProductQuantity={setProductQuantity} />
            </td>
            <td>{calculatedPriceStr}</td>
            <td>{calculatedPriceDiscountStr}</td>
        </tr>)
    }
}

export default PosProductItem;