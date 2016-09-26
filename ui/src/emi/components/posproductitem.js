import React, { PropTypes } from 'react';
import ProductItemQuantity from './productitemquantity';

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
        let calculatedPrice = product.price * product.quantity;
        let calculatedPriceStr = "";

        if (calculatedPrice > 0) {
            calculatedPriceStr = String(calculatedPrice.toFixed(2));
        }

        return (<tr>
            <th scope="row">{product.id + 1}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{100}</td>
            <td>
                <ProductItemQuantity
                    id={product.id}
                    quantity={product.quantity}
                    multiplicity={product.multiplicity}
                    productQuantityChanged={productQuantityChanged} />
            </td>
            <td><div ref={'vis'}></div></td>
        </tr>)
    }
}

export default PosProductItem;