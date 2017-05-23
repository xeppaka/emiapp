import React, {PropTypes} from 'react';

class AdminSelectedProductSecondRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.product;
        let resetButton = <button style={{marginRight: '5px'}} type='button' className='btn btn-sm btn-info'
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      this.props.onResetProduct(product.productId)
                                  }}>Reset
                          </button>;

        return (<tr onClick={() => this.props.onSetCurrentModifyProduct(product.productId)}>
            <td />
            <td colSpan={4}>
                <div className='row'>
                    <div className='col-6'>
                        {product.imageThumbnail}
                    </div>
                    <div className='col-6'>
                        {product.image}
                    </div>
                </div>
            </td>
            <td colSpan={3} style={{textAlign: 'right'}}>
                {resetButton}
            </td>
        </tr>)
    }
}

export default AdminSelectedProductSecondRow;
