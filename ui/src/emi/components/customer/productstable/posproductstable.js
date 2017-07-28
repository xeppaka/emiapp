import React, { PropTypes } from 'react';
import PosProductItem from './posproductitem';
import CategoryItem from './categoryitem';

class PosProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.products === nextProps.products)
            return false;

        if (this.props.products.length !== nextProps.products.length)
            return true;

        let l = this.props.products.length;
        for (let i = 0; i < l; i++) {
            if (this.props.products[i] !== nextProps.products[i])
                return true;
        }

        return false;
    }

    getVisibleAnchor() {
        let productsCount = this.props.products.length;
        let firstVisible = null;
        for (let i = 0; i < productsCount; i++) {
            let refId = 'product' + i;
            if (this.refs.hasOwnProperty(refId) && this.refs[refId].isVisible()) {
                firstVisible = i;
                break;
            }
        }

        if (firstVisible !== null) {
            return this.props.products[firstVisible].anchor.name;
        }

        return null;
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < productsLength; i++) {
            let product = products[i].product;
            let anchor = products[i].anchor;

            if (anchor.hasOwnProperty('categoryAnchors')) {
                productsItems.push(<CategoryItem key={anchor.name} anchor={anchor} colspan={'9'} />);
            }

            if (product.features.indexOf('VISIBLE') >= 0) {
                productsItems.push(<PosProductItem
                        key={product.productId} ref={'product' + i} idx={i + 1}
                        product={product}
                        setProductQuantity={this.props.setProductQuantity}
                        onShowProductImage={this.props.onShowProductImage}
                    />
                )
            }
        }

        return productsItems;
    }

    render() {
        return (
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope='row' style={{width:'2%'}}>#</th>
                            <th style={{width: '7%'}}>Image</th>
                            <th style={{width:'31%'}}>Product Name</th>
                            <th style={{width:'10%'}}>Retail price<br />(without VAT, in &#8364;)</th>
                            <th style={{width:'10%'}}>Discount price<br />(-100%, without VAT, in &#8364;)</th>
                            <th style={{width:'10%'}}>Pieces left to order</th>
                            <th style={{width:'10%'}}>Quantity</th>
                            <th style={{width:'10%'}}>Retail price x Quantity<br />(without discount, without VAT in &#8364;)</th>
                            <th style={{width:'10%'}}>Retail price x Quantity<br />(with discount, without VAT in &#8364;)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderProducts() }
                    </tbody>
                </table>
               )
    }
}

export default PosProductsTable;