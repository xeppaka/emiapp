import React, { PropTypes } from 'react';
import SvgExclamation from '../../common/svgexclamation';

class ProductsTableTotal extends React.Component {
    constructor(props) {
        super(props);
    }

    onProductsReset(event) {
        this.props.productsReset();
    }

    onCreateProductsOrder(event) {
        this.props.createProductsOrder();
    }

    render() {
        return (
                <nav className='navbar navbar-fixed-bottom navbar-dark bg-inverse'>
                    <ul className='nav navbar-nav float-lg-right'>
                        {
                            this.props.posExceeded ? (<li className='nav-item' data-toggle="tooltip" data-placement="top" title="The total price for selected POS products exceeded allowed maximum value.">
                                                        <SvgExclamation />
                                                      </li>) : null
                        }
                        {
                            this.props.posExceeded ?
                                (<li className='nav-item' data-toggle='tooltip' data-placement='top' title='The total price for POS exceeded total price bla bla'><a className='nav-link active'>POS amount to order: <span style={{fontSize: '120%', color: '#e72626'}}>{this.props.posAmountToOrder.toFixed(2)}&#8364;</span></a></li>) :
                                (<li className='nav-item'><a className='nav-link active'>POS amount to order: <span style={{fontSize: '120%'}}>{Number((this.props.posAmountToOrder / 100).toFixed(2))}&#8364;</span></a></li>)
                        }
                        <li className='nav-item'><a className='nav-link active'>Total without discount: <span style={{fontSize: '120%'}}>{Number((this.props.totalWithoutDiscount / 100).toFixed(2))}&#8364;</span></a></li>
                        <li className='nav-item'><a className='nav-link active'>Total with discount: <span style={{fontWeight: 'bold', fontSize: '120%'}}>{Number((this.props.totalWithDiscount / 100).toFixed(2))}&#8364;</span></a></li>
                        <li className='nav-item'><button type='button' className='btn btn-secondary' onClick={(event) => this.onProductsReset(event)}>Reset</button></li>
                        <li className='nav-item'><button type='button' className='btn btn-primary' disabled={!this.props.canCreateOrder} onClick={(event) => this.onCreateProductsOrder(event)}>Create order&hellip;</button></li>
                    </ul>
                </nav>
               )
    }
}

export default ProductsTableTotal;