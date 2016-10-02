import React, { PropTypes } from 'react';

class PosProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    onQuantitySelected(type, id, amount) {
        this.props.productQuantityChanged(type, id, amount);
    }

    renderQuantityItems(type, id, multiplicity) {
        let items = [];
        items.push(<a key={id} className='dropdown-item' style={{fontSize: '90%'}} href='#' onClick={(event) => { event.preventDefault(); this.onQuantitySelected(type, id, 0) }}>None</a>);

        for (let i = 1; i < 20; i++) {
            items.push(<a className='dropdown-item' style={{fontSize: '90%'}} href='#' onClick={(event) => { event.preventDefault(); this.onQuantitySelected(type, id, i * multiplicity)}}>{i * multiplicity}</a>);
        }

        return items;
    }

    render() {
        let id = this.props.product.id;
        let type = this.props.product.type;
        let quantity = this.props.product.quantity;
        let multiplicity = this.props.product.multiplicity;
        let maxAllowedQuantity = this.props.product.maxAllowedQuantity;

        if (multiplicity > 1) {
            return (
                        <div className='btn-group'>
                            <button type="button" className="btn btn-secondary dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontSize: '90%', width: '90px'}}>
                                {quantity > 0 ? quantity : 'None'}
                            </button>
                            <div className='dropdown-menu'>
                            {
                                this.renderQuantityItems(type, id, multiplicity)
                            }
                            </div>
                        </div>
                   )
        } else {
            return (
                        <input type='number' min='0' value={quantity > 0 ? quantity : ''}
                                onChange={(event) => {
                                        let v = Number(event.target.value);
                                        if (!isNaN(v) && v <= (maxAllowedQuantity + quantity) && v >= 0) {
                                            this.props.productQuantityChanged(type, id, v);
                                        }
                                    }
                                } style={{width: '90px'}} />
                   )
        }
    }
}

export default PosProductItemQuantity;