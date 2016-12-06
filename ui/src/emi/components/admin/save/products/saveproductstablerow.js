import React, { PropTypes } from 'react';

class SaveProductsTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;

        return (<tr>
            <th scope='row'>{this.props.idx}</th>
            <td style={{width: '300px'}}>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.weight}</td>
        </tr>)
    }
}

export default SaveProductsTableRow;