import React, { PropTypes } from 'react';

class MainProductItemQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    onQuantitySelected(id, amount) {
        this.props.productQuantityChanged(id, amount);
    }

    renderQuantityItems(id, multiplicity) {
        let items = [];
        items.push(<option value={0}>None</option>);

        for (let i = 1; i < 20; i++) {
            let val = i * multiplicity;
            items.push(<option value={val}>{val}</option>);
        }

        return items;
    }

    render() {
        let id = this.props.id;
        let quantity = this.props.quantity;
        let multiplicity = this.props.multiplicity;

        if (multiplicity > 1) {
            return (
                    <select value={quantity} onChange={(event) => this.onQuantitySelected(id, event.target.value)}>
                       { this.renderQuantityItems(id, multiplicity) }
                    </select>
                   )
        } else {
            return (
                        <input type='number' min='0' value={quantity > 0 ? quantity : ''}
                                onChange={(event) => {
                                        let v = Number(event.target.value);
                                        if (!isNaN(v) && v >= 0) {
                                            this.props.productQuantityChanged(id, v);
                                        }
                                    }
                                } />
                   )
        }
    }
}

export default MainProductItemQuantity;