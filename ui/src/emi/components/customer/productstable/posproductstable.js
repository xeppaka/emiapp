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
            if (this.refs['product' + i].isVisible()) {
                firstVisible = i;
                break;
            }
        }

        if (firstVisible != null) {
            return this.props.products[firstVisible].anchor.name;
        }

        return null;
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < products.length; i++) {
            let product = products[i].product;
            let anchor = products[i].anchor;
            let features = product.features;

            if (anchor.hasOwnProperty('categoryAnchors')) {
                productsItems.push(<CategoryItem key={anchor.name} anchor={anchor} colspan={'7'} />);
            }

            if (features.indexOf('VISIBLE') >= 0) {
                let available = features.indexOf('AVAILABLE') >= 0;

                productsItems.push(<PosProductItem
                    key={product.productId} ref={'product' + i} idx={i + 1} available={available}
                    product={product} setProductQuantity={this.props.setProductQuantity}/>)
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
                            <th style={{width:'32%'}}>Product Name</th>
                            <th style={{width:'11%'}}>Retail price<br />(without VAT, in &#8364;)</th>
                            <th style={{width:'11%'}}>Discount price<br />(-100%, without VAT, in &#8364;)</th>
                            <th style={{width:'11%'}}>Pieces left to order</th>
                            <th style={{width:'11%'}}>Quantity</th>
                            <th style={{width:'11%'}}>Retail price x Quantity<br />(without discount, without VAT in &#8364;)</th>
                            <th style={{width:'11%'}}>Retail price x Quantity<br />(with discount, without VAT in &#8364;)</th>
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