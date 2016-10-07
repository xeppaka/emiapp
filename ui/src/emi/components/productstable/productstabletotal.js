import React, { PropTypes } from 'react';

class ProductsTableTotal extends React.Component {
    constructor(props) {
        super(props);
    }

    onProductsReset(event) {
        event.preventDefault();
        this.props.productsReset();
    }

    onCreateProductsOrder(event) {
        this.props.createProductsOrder();
    }

    renderExclamation() {
        return (<li className='nav-item' data-toggle="tooltip" data-placement="top" title="The total price for POS exceeded total price bla bla">
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16' style={{fill: '#e72626'}}>
                        <path d='M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z' />
                    </svg>
                </li>);
    }

    render() {
        return (
                <nav className='navbar navbar-fixed-bottom navbar-dark bg-inverse'>
                    <ul className='nav navbar-nav pull-xs-right'>
                        {
                            this.props.posExceeded ? (<li className='nav-item' data-toggle="tooltip" data-placement="top" title="The total price for POS exceeded total price bla bla">
                                                            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16' style={{fill: '#e72626'}}>
                                                                <path d='M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z' />
                                                            </svg>
                                                      </li>) : null
                        }
                        {
                            this.props.posExceeded ?
                                (<li className='nav-item' data-toggle='tooltip' data-placement='top' title='The total price for POS exceeded total price bla bla'><a className='nav-link active'>POS amount to order: <span style={{fontSize: '120%', color: '#e72626'}}>{this.props.posAmountToOrder.toFixed(2)}&#8364;</span></a></li>) :
                                (<li className='nav-item'><a className='nav-link active'>POS amount to order: <span style={{fontSize: '120%'}}>{this.props.posAmountToOrder.toFixed(2)}&#8364;</span></a></li>)
                        }
                        <li className='nav-item'><a className='nav-link active'>Total without discount: <span style={{fontSize: '120%'}}>{this.props.totalWithoutDiscount.toFixed(2)}&#8364;</span></a></li>
                        <li className='nav-item'><a className='nav-link active'>Total with discount: <span style={{fontWeight: 'bold', fontSize: '120%'}}>{this.props.totalWithDiscount.toFixed(2)}&#8364;</span></a></li>
                        <li className='nav-item'><a className='btn btn-secondary' href='#' onClick={(event) => this.onProductsReset(event)}>Reset</a></li>
                        <li className='nav-item'><button type='button' disabled={!this.props.canCreateOrder} className='btn btn-primary' onClick={(event) => this.onCreateProductsOrder(event)}>Create order&hellip;</button></li>
                    </ul>
                </nav>
               )
    }
}

export default ProductsTableTotal;