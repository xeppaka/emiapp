import React, { PropTypes } from 'react';
import MainProductsTable from './mainproductstable';
import PosProductsTable from './posproductstable';

class ProductsTables extends React.Component {
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
            this.props.setProductCategory(anchor);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.mainProducts === nextProps.mainProducts && this.props.posProducts === nextProps.posProducts)
            return false;

        if (this.props.mainProducts.length != nextProps.mainProducts.length)
            return true;

        if (this.props.posProducts.length != nextProps.posProducts.length)
            return true;

        return false;
    }

    render() {
        return (
                    <div className="container-fluid">
                        <div className="row">
                            <MainProductsTable ref='mainProductsContainer'
                                    products={this.props.mainProducts}
                                    productQuantityChanged={this.props.productQuantityChanged} />
                        </div>
                        <div className="row">
                            <PosProductsTable ref='posProductsContainer'
                                    products={this.props.posProducts}
                                    productQuantityChanged={this.props.productQuantityChanged} />
                        </div>
                    </div>
               )
    }
}

export default ProductsTables;