import React, { PropTypes } from 'react';

class MainProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    renderQuantityOptions(multiplicity) {
        let items = [];
        items.push(<option key={0} value={0}>None</option>);

        for (let i = 1; i < 20; i++) {
            items.push(<option key={i} value={i * multiplicity}>{i * multiplicity}</option>);
        }

        return items;
    }

    render() {
        let productId = this.props.product.productId;
        let quantity = this.props.product.quantity;
        let multiplicity = this.props.product.multiplicity;

        if (multiplicity > 1) {
            return (
                        <select className='form-control form-control-sm' value={quantity}
                                onChange={(event) => this.props.setProductQuantity(productId, event.target.value)} style={{width: '65%'}}>
                            {
                                this.renderQuantityOptions(multiplicity)
                            }
                        </select>
                   )
        } else {
            return (
                        <input type='number' className='form-control form-control-sm' min='0' value={quantity > 0 ? quantity : ''}
                                onChange={(event) => {
                                        let v = Number(event.target.value);
                                        if (!isNaN(v) && v >= 0) {
                                            this.props.setProductQuantity(productId, v);
                                        }
                                    }
                                } style={{width: '65%'}}/>
                   )
        }
    }
}

export default MainProductItemQuantity;