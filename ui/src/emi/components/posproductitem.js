import React, { PropTypes } from 'react';
import PosProductItemQuantity from './posproductitemquantity';

class PosProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    isVisible() {
        let elemTop = this.refs.vis.getBoundingClientRect().top;
        let elemBottom = this.refs.vis.getBoundingClientRect().bottom;

        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    }

    render() {
        let product = this.props.product;
        let productQuantityChanged = this.props.productQuantityChanged;
        let calculatedPrice = Number(product.price * product.quantity).toFixed(2);
        let calculatedPriceStr = "";

        if (calculatedPrice > 0) {
            calculatedPriceStr = String(calculatedPrice);
        }

        return (<tr>
            <th scope="row">{product.id + 1}<div ref={'vis'}></div></th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{0}</td>
            <td>{product.maxAllowedQuantity}</td>
            <td>
                <PosProductItemQuantity
                    id={product.id}
                    quantity={product.quantity}
                    multiplicity={product.multiplicity}
                    maxAllowedQuantity={product.maxAllowedQuantity}
                    productQuantityChanged={productQuantityChanged} />
            </td>
            <td>{calculatedPriceStr}</td>
            <td>{0}</td>
        </tr>)
    }
}

export default PosProductItem;