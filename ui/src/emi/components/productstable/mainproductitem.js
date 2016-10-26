import React, { PropTypes } from 'react';
import MainProductItemQuantity from './mainproductitemquantity';

class MainProductItem extends React.Component {
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
        let calculatedPrice = Number((product.price / 100 * product.quantity).toFixed(2));
        let calculatedPriceWithDiscount = Number((product.price / 200 * product.quantity).toFixed(2));

        return (<tr>
            <th scope="row">{this.props.idx}<div ref={'vis'}></div></th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{Number((product.price / 100).toFixed(2))}</td>
            <td>{Number((product.price / 200).toFixed(2))}</td>
            <td>
                <MainProductItemQuantity
                    product={product}
                    setProductQuantity={this.props.setProductQuantity} />
            </td>
            <td>{calculatedPrice > 0 ? calculatedPrice.toString() : ''}</td>
            <td style={{fontWeight: 'bold'}}>{calculatedPriceWithDiscount > 0 ? calculatedPriceWithDiscount.toString() : ''}</td>
        </tr>)
    }
}

export default MainProductItem;