import React, { PropTypes } from 'react';
import MainProductItem from './mainproductitem';
import CategoryItem from './categoryitem';

class MainProductsTable extends React.Component {
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

        for (let i = 0; i < productsLength; i++) {
            let product = products[i];

            if (product.hasOwnProperty('categoryAnchors')) {
                productsItems.push(<CategoryItem key={product.anchor} categoryAnchors={product.categoryAnchors}
                                                 categoryNames={product.categoryNames} colspan={'4'} />);
            }

            productsItems.push(<MainProductItem
                            key={product.idx} ref={'product' + i} product={product}
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
                            <th>Quantity</th>
                            <th>Retail price x Quantity<br />(without VAT in &#8364;)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderProducts() }
                    </tbody>
                </table>
               )
    }
}

export default MainProductsTable;