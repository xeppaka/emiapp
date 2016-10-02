import React, { PropTypes } from 'react';
import MainProductItemQuantity from './mainproductitemquantity';

class MainProductItem extends React.Component {
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
        let calculatedPrice = (product.price * product.quantity).toFixed(2);
        let calculatedPriceWithDiscount = (product.price / 2 * product.quantity).toFixed(2);
        let calculatedPriceStr = '';
        let calculatedPriceWithDiscountStr = '';

        if (calculatedPrice > 0) {
            calculatedPriceStr = calculatedPrice.toString();
        }

        if (calculatedPriceWithDiscount > 0) {
            calculatedPriceWithDiscountStr = calculatedPriceWithDiscount.toString();
        }

        return (<tr>
            <th scope="row">{product.idx + 1}<div ref={'vis'}></div></th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{product.price.toString()}</td>
            <td>{Number(product.price / 2).toString()}</td>
            <td>
                <MainProductItemQuantity
                    product={product}
                    productQuantityChanged={productQuantityChanged} />
            </td>
            <td>{calculatedPriceStr}</td>
            <td style={{fontWeight: 'bold'}}>{calculatedPriceWithDiscountStr}</td>
        </tr>)
    }
}

export default MainProductItem;