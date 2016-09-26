import React, { PropTypes } from 'react';
import MainProductsTable from '../components/mainproductstable';
import PosProductsTable from '../components/posproductstable';

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
        let anchor = this.refs['mainProductsContainer'].getVisibleAnchor();
        if (anchor === null) {
            anchor = this.refs['posProductsContainer'].getVisibleAnchor();
        }

        if (anchor !== null) {
            this.props.productCategoryChanged(anchor);
        }
    }

    render() {
        return (
                    <div className="container">
                        <div className="row">
                            <MainProductsTable ref='mainProductsContainer'
                                    products={this.props.mainProducts}
                                    productCategoryChanged={this.props.productCategoryChanged}
                                    productQuantityChanged={this.props.productQuantityChanged} />
                        </div>
                        <div className="row">
                            <PosProductsTable ref='posProductsContainer'
                                    products={this.props.posProducts}
                                    productCategoryChanged={this.props.productCategoryChanged}
                                    productQuantityChanged={this.props.productQuantityChanged} />
                        </div>
                    </div>
               )
    }
}

export default ProductsTable;