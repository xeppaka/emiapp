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

        if (this.props.products.length != nextProps.products.length)
            return true;

        let l = this.props.products.length;
        for (let i = 0; i < l; i++) {
            if (this.props.products[i] != nextProps.products[i])
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
            return this.props.products[firstVisible].anchor;
        }

        return null;
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            if (product.hasOwnProperty('categoryAnchors')) {
                productsItems.push(<CategoryItem key={product.anchor} categoryAnchors={product.categoryAnchors}
                                                 categoryNames={product.categoryNames} colspan={'7'} />);
            }

            productsItems.push(<PosProductItem
                            key={product.id} ref={'product' + i} product={product}
                            setProductQuantity={this.props.setProductQuantity} />)
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