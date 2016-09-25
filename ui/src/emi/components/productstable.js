import React, { PropTypes } from 'react';
import ProductItem from './productitem';
import CategoryItem from './categoryitem';

class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let productsCount = this.props.products.length;
        let firstVisible = null;
        for (let i = 0; i < productsCount; i++) {
            if (this.refs['product' + i].isVisible()) {
                firstVisible = i;
                break;
            }
        }

        if (firstVisible != null) {
            this.props.productCategoryChanged(this.props.products[firstVisible].anchor);
        }
    }

    renderProducts() {
        let productsItems = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < products.length; i++) {
            if (products[i].hasOwnProperty('categoryAnchors')) {
                productsItems.push(<CategoryItem categoryAnchors={products[i].categoryAnchors}
                                                 categoryNames={products[i].categoryNames} />);
            }

            productsItems.push(<ProductItem
                            ref={'product' + i} idx={i} product={products[i]}
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

ProductsTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired
};

export default ProductsTable;