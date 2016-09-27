import React, { PropTypes } from 'react';

class ProductsTableTotal extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {scrollTop: 20};
    }

    componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
//        let scrollTop = event.srcElement.body.scrollTop;
//        this.setState({
//            scrollTop: scrollTop + 20
//        });
    }

    render() {
        return (
                    <div className="card" style={{marginTop: this.state.scrollTop, position: 'fixed'}}>
                        <div className="card-block">
                            <h4 className="card-title">POS amount to order: {this.props.posAmountToOrder.toFixed(2)}&#8364;</h4>
                            <h4 className="card-title">Total without discount: {this.props.totalWithoutDiscount.toFixed(2)}&#8364;</h4>
                            <h4 className="card-title">Total with discount: {this.props.totalWithDiscount.toFixed(2)}&#8364;</h4>
                            <a href="#" className="btn btn-primary">Reset</a>
                        </div>
                    </div>
               )
    }
}

export default ProductsTableTotal;