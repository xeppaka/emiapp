import React, {PropTypes} from 'react';
import MainProductItemQuantity from './mainproductitemquantity';
import SvgFlame from '../../common/svgflame';

class MainProductItem extends React.Component {
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

    // componentDidMount() {
    //     $('[data-toggle="tooltip"]').tooltip({
    //         trigger: 'hover',
    //         placement: 'left',
    //         html: true
    //     });
    // }

    render() {
        let product = this.props.product;
        let calculatedPrice = Number((product.price / 100 * product.quantity).toFixed(2));
        let calculatedPriceWithDiscount = Number((product.price / 200 * product.quantity).toFixed(2));
        let isAvailable = product.features.indexOf('AVAILABLE') >= 0;
        let isNew = product.features.indexOf('NEW') >= 0;
        let isFlammable = product.features.indexOf('FLAMMABLE') >= 0;

        let imageTitle = product.image.length > 0 ? 'Click to open image...' : null;
        let image = product.imageThumbnail.length > 0 ? <img height='64' width='64'
                                                             src={product.imageThumbnail}
                                                             title={imageTitle}
                                                             onClick={(event) => {
                                                                 if (product.image.length > 0)
                                                                     this.props.onShowProductImage(product.productId)
                                                             }}/> : null;

        return (<tr>
            <th scope="row">{this.props.idx}
                <div ref={'vis'}/>
            </th>
            <td>
                {image}
            </td>
            <td style={{width: '300px'}}>
                {isNew ? <span style={{color: '#e72626'}}>NEW!&nbsp;</span> : null}
                {!isAvailable ? <span style={{fontWeight: 'bold'}}>NOT AVAILABLE!&nbsp;</span> : null}
                {product.name}
                {isFlammable ? <span>&nbsp;&nbsp;<SvgFlame width={20} height={20}/></span> : null}
            </td>
            <td>{Number((product.price / 100).toFixed(2))}</td>
            <td>{Number((product.price / 200).toFixed(2))}</td>
            <td>
                <MainProductItemQuantity
                    productId={product.productId}
                    quantity={product.quantity}
                    multiplicity={product.multiplicity}
                    isAvailable={isAvailable}
                    setProductQuantity={this.props.setProductQuantity}/>
            </td>
            <td>{calculatedPrice > 0 ? calculatedPrice.toString() : ''}</td>
            <td style={{fontWeight: 'bold'}}>{calculatedPriceWithDiscount > 0 ? calculatedPriceWithDiscount.toString() : ''}</td>
        </tr>)
    }
}

export default MainProductItem;
