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

    render() {
        return (
                    <div className="container-fluid">
                        <div className="row">
                            <MainProductsTable ref='mainProductsContainer'
                                    products={this.props.mainProducts}
                                    setProductQuantity={this.props.setProductQuantity} />
                        </div>
                        <div className="row">
                            <PosProductsTable ref='posProductsContainer'
                                    products={this.props.posProducts}
                                    setProductQuantity={this.props.setProductQuantity} />
                        </div>
                    </div>
               )
    }
}

export default ProductsTables;