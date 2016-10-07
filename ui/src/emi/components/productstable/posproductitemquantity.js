import React, { PropTypes } from 'react';

class PosProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    renderQuantityOptions(id, multiplicity) {
        let items = [];
        items.push(<option value={0}>None</option>);

        for (let i = 1; i < 20; i++) {
            items.push(<option value={i * multiplicity}>{i * multiplicity}</option>);
        }

        return items;
    }

    render() {
        let id = this.props.product.id;
        let quantity = this.props.product.quantity;
        let multiplicity = this.props.product.multiplicity;
        let piecesLeftToOrder = this.props.product.piecesLeftToOrder;

        if (multiplicity > 1) {
            return (
                        <select className='form-control form-control-sm' value={quantity}
                                onChange={(event) => this.setProductQuantity(id, event.target.value)} style={{width: '65%'}}>
                            {
                                this.renderQuantityOptions(id, multiplicity)
                            }
                        </select>
                   )
        } else {
            return (
                        <input type='number' className='form-control form-control-sm' min='0' value={quantity > 0 ? quantity : ''}
                                onChange={(event) => {
                                        let v = Number(event.target.value);
                                        if (!isNaN(v) && v >= 0 &&
                                                ( (v <= quantity + piecesLeftToOrder) || ((v > quantity + piecesLeftToOrder) && v < quantity) )) {
                                            this.props.setProductQuantity(id, v);
                                        }
                                    }
                                } style={{width: '65%'}} />
                   )
        }
    }
}

export default PosProductItemQuantity;