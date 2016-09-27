import React, { PropTypes } from 'react';
import PosProductItem from './posproductitem';
import CategoryItem from './categoryitem';

class PosProductsTable extends React.Component {
    constructor(props) {
        super(props);
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
                            productQuantityChanged={this.props.productQuantityChanged} />)
        }

        return productsItems;
    }

    render() {
        return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope='row'>#</th>
                            <th>Product Name</th>
                            <th>Retail price<br />(without VAT, in &#8364;)</th>
                            <th>Discount price<br />(-100%, without VAT, in &#8364;)</th>
                            <th>Max allowed quantity</th>
                            <th>Quantity</th>
                            <th>Retail price x Quantity<br />(without discount, without VAT in &#8364;)</th>
                            <th>Retail price x Quantity<br />(with discount, without VAT in &#8364;)</th>
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