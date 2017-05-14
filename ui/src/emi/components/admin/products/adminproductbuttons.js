import React, {PropTypes} from 'react';

class AdminProductButtonsRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let canDelete = this.props.modification !== 'DELETED';
        let canReset = this.props.modification !== 'UNCHANGED';

        let deleteButton = canDelete ?
            <button style={{marginRight: '5px'}} type='button' className='btn btn-sm btn-danger'
                    onClick={(e) => { e.stopPropagation(); this.props.onDeleteProduct(product.productId) }}>Delete
            </button> : null;

        let resetButton = canReset ? <button style={{marginRight: '5px'}} type='button' className='btn btn-sm btn-info'
                                             onClick={(e) => { e.stopPropagation(); this.props.onResetProduct(product.productId) }}>Reset
        </button> : null;

        return (<tr onClick={() => this.props.onSetCurrentModifyProduct(product.productId)}>
            <td colSpan={8} style={{textAlign: 'right'}}>
                {deleteButton}
                {resetButton}
            </td>
        </tr>)
    }
}

export default AdminProductButtonsRow;
