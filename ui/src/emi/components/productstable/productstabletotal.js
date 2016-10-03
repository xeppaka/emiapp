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

    onProductsReset(event) {
        event.preventDefault();
        this.props.productsReset();
    }

    onCreateProductsOrder(event) {
        this.props.createProductsOrder();
    }

    render() {
        return (
                <nav className='navbar navbar-fixed-bottom navbar-dark bg-inverse'>
                    <ul className='nav navbar-nav pull-xs-right'>
                        <li className='nav-item'><a className='nav-link active'>POS amount to order: <span style={{fontSize: '120%'}}>{this.props.posAmountToOrder.toFixed(2)}&#8364;</span></a></li>
                        <li className='nav-item'><a className='nav-link active'>Total without discount: <span style={{fontSize: '120%'}}>{this.props.totalWithoutDiscount.toFixed(2)}&#8364;</span></a></li>
                        <li className='nav-item'><a className='nav-link active'>Total with discount: <span style={{fontWeight: 'bold', fontSize: '120%'}}>{this.props.totalWithDiscount.toFixed(2)}&#8364;</span></a></li>
                        <li className='nav-item'><a className='btn btn-secondary' href='#' onClick={(event) => this.onProductsReset(event)}>Reset</a></li>
                        <li className='nav-item'><button type='button' className='btn btn-primary' onClick={(event) => this.onCreateProductsOrder(event)}>Create order&hellip;</button></li>
                    </ul>
                </nav>
               )
    }
}

export default ProductsTableTotal;