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
        let calculatedPrice = Number((product.price * product.quantity).toFixed(2));
        let calculatedPriceWithDiscount = Number((product.price / 2 * product.quantity).toFixed(2));

        return (<tr>
            <th scope="row">{product.idx + 1}<div ref={'vis'}></div></th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{Number((product.price).toFixed(2))}</td>
            <td>{Number((product.price / 2).toFixed(2))}</td>
            <td>
                <MainProductItemQuantity
                    product={product}
                    productQuantityChanged={productQuantityChanged} />
            </td>
            <td>{calculatedPrice > 0 ? calculatedPrice.toString() : ''}</td>
            <td style={{fontWeight: 'bold'}}>{calculatedPriceWithDiscount > 0 ? calculatedPriceWithDiscount.toString() : ''}</td>
        </tr>)
    }
}

export default MainProductItem;