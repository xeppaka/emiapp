import React, { PropTypes } from 'react';

class ProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    onQuantitySelected(id, amount, event) {
        event.preventDefault();
        this.props.productQuantityChanged(id, amount);
    }

    renderQuantityItems(id, multiplicity) {
        let items = [];
        items.push(<a key={id} className='dropdown-item' href='#' onClick={(event) => this.onQuantitySelected(id, 0, event)}>None</a>);

        for (let i = 1; i < 20; i++) {
            items.push(<a className='dropdown-item' href='#' onClick={(event) => this.onQuantitySelected(id, i * multiplicity, event)}>{i * multiplicity}</a>);
        }

        return items;
    }

    render() {
        let id = this.props.id;
        let quantity = this.props.quantity;
        let multiplicity = this.props.multiplicity;

        if (multiplicity > 1) {
            return (
                        <div className='btn-group'>
                            <button type="button" className="btn btn-secondary dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {quantity > 0 ? quantity : 'None'}
                            </button>
                            <div className='dropdown-menu'>
                            {
                                this.renderQuantityItems(id, multiplicity)
                            }
                            </div>
                        </div>
                   )
        } else {
            return (
                        <input type='number' value={quantity > 0 ? quantity : ''}
                                onChange={(event) => {
                                        let v = Number(event.target.value);
                                        if (!isNaN(v)) {
                                            this.props.productQuantityChanged(id, v);
                                        }
                                    }
                                } />
                   )
        }
    }
}

export default ProductItemQuantity;