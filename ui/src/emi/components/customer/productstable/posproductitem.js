import React, { PropTypes } from 'react';
import PosProductItemQuantity from './posproductitemquantity';

class PosProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.product !== nextProps.product;
    }

    isVisible() {
        let elemTop = this.refs.vis.getBoundingClientRect().top;
        let elemBottom = this.refs.vis.getBoundingClientRect().bottom;

        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    }

    render() {
        let product = this.props.product;
        let setProductQuantity = this.props.setProductQuantity;
        let calculatedPrice = Number((product.price / 100 * product.quantity).toFixed(3));
        let calculatedPriceStr = '';
        let calculatedPriceDiscountStr = '';

        if (calculatedPrice > 0) {
            calculatedPriceStr = String(calculatedPrice);
            calculatedPriceDiscountStr = '0';
        }

        let isAvailable = product.features.indexOf('AVAILABLE') >= 0;
        let isNew = product.features.indexOf('NEW') >= 0;
        let isFlammable = product.features.indexOf('FLAMMABLE') >= 0;

        let imageTitle = product.image.length > 0 ? 'Click to open image...' : null;
        let image = product.imageThumbnail.length > 0 ? <img style={{maxWidth: '64', maxHeight: '64'}}
                                                             src={product.imageThumbnail}
                                                             title={imageTitle}
                                                             onClick={(event) => {
                                                                 if (product.image.length > 0)
                                                                     this.props.onShowProductImage(product.productId)
                                                             }}/> : null;

        return (<tr>
            <th scope='row'>{this.props.idx}<div ref={'vis'}/></th>
            <td>
                {image}
            </td>
            <td>
                {isNew ? <span style={{color: '#e72626'}}>NEW!&nbsp;</span> : null}
                {!isAvailable ? <span style={{fontWeight: 'bold'}}>NOT AVAILABLE!&nbsp;</span> : null}
                {product.name}
                {isFlammable ? <span>&nbsp;&nbsp;<SvgFlame width={20} height={20} /></span> : null}
            </td>
            <td>{Number((product.price / 100).toFixed(3))}</td>
            <td>{0}</td>
            <td>{isAvailable ? product.piecesLeftToOrder : 0}</td>
            <td>
                <PosProductItemQuantity
                    product={product}
                    isAvailable={isAvailable}
                    setProductQuantity={setProductQuantity} />
            </td>
            <td>{calculatedPriceStr}</td>
            <td>{calculatedPriceDiscountStr}</td>
        </tr>)
    }
}

export default PosProductItem;