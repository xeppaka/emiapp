import React, { PropTypes } from 'react';

class PosProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    renderQuantityOptions(multiplicity) {
        let items = [];
        items.push(<option value={0}>None</option>);

        for (let i = 1; i < 20; i++) {
            items.push(<option value={i * multiplicity}>{i * multiplicity}</option>);
        }

        return items;
    }

    render() {
        let productId = this.props.product.productId;
        let quantity = this.props.product.quantity;
        let multiplicity = this.props.product.multiplicity;
        let piecesLeftToOrder = this.props.product.piecesLeftToOrder;
        let isAvailable = this.props.isAvailable;

        if (multiplicity > 1) {
            return (
                        <select className='form-control form-control-sm' value={quantity} disabled={!isAvailable}
                                onChange={(event) => {
                                    let v = Number(event.target.value);
                                    if (!isNaN(v) && v >= 0 &&
                                        ( (v <= quantity + piecesLeftToOrder) || ((v > quantity + piecesLeftToOrder) && v < quantity) )) {
                                        this.props.setProductQuantity(productId, v);
                                    }
                                }}
                                style={{width: '65%'}}>
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
                                        if (!isNaN(v) && v >= 0 &&
                                                ( (v <= quantity + piecesLeftToOrder) || ((v > quantity + piecesLeftToOrder) && v < quantity) )) {
                                            this.props.setProductQuantity(productId, v);
                                        }
                                    }
                                } style={{width: '65%'}} disabled={!isAvailable} />
                   )
        }
    }
}

export default PosProductItemQuantity;