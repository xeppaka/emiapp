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
//        console.log('onScroll');
//        console.log(this.refs.item0.isVisible());
//        console.log(this.refs.item730.isVisible());
        // for (let i = 0; i < this.refs.length)
    }

    renderProducts() {
        let productsTable = [];
        let products = this.props.products;
        let productsLength = products.length;

        for (let i = 0; i < products.length; i++) {
            if (products[i].hasOwnProperty('categoryAnchors')) {
                productsTable.push(<CategoryItem categoryAnchors={products[i].categoryAnchors}
                                                 categoryNames={products[i].categoryNames} />);
            }

            productsTable.push(<ProductItem
                            ref={'item' + i} idx={i} product={products[i]}
                            productQuantityChanged={this.props.productQuantityChanged} />)
        }

        return productsTable;
    }

    render() {
        return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
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