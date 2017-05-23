import React, {PropTypes} from 'react';

class AdminSelectedProductSecondRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let canReset = this.props.modification !== 'UNCHANGED';

        let deleteButton = <button style={{marginRight: '5px'}} type='button' className='btn btn-sm btn-danger'
                                   onClick={(e) => {
                                       e.stopPropagation();
                                       this.props.onDeleteProduct(product.productId)
                                   }}>Delete
        </button>;

        let resetButton = canReset ? <button style={{marginRight: '5px'}} type='button' className='btn btn-sm btn-info'
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 this.props.onResetProduct(product.productId)
                                             }}>Reset
        </button> : null;

        return (<tr onClick={() => this.props.onSetCurrentModifyProduct(product.productId)}>
            <td />
            <td colSpan={4}>
                <div className='row'>
                    <div className='col-6'>
                        <input type='text' className='form-control form-control-sm' value={product.imageThumbnail}
                               placeholder='Image thumbnail URL'
                               onChange={(event) => this.props.onProductImageThumbnailChanged(product.productId, event.target.value)}
                               onClick={(event) => event.stopPropagation()}
                        />
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control form-control-sm' value={product.image}
                               placeholder='Image URL'
                               onChange={(event) => this.props.onProductImageChanged(product.productId, event.target.value)}
                               onClick={(event) => event.stopPropagation()}
                        />
                    </div>
                </div>
            </td>
            <td colSpan={3} style={{textAlign: 'right'}}>
                {deleteButton}
                {resetButton}
            </td>
        </tr>)
    }
}

export default AdminSelectedProductSecondRow;
