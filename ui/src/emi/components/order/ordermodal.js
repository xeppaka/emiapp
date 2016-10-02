import React, { PropTypes } from 'react';
import OrderProductsTable from './orderproductstable';

class OrderModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(event) {
        this.props.hideModal(this.props.id);
    }

    renderSelectedItems() {
    }

    render() {
        let style = {display: 'block'};
        let height = $(window).height() * 0.8;
        let width = $(window).width() * 0.8;

        return (
                 <div>
                    <div className='modal fade in' style={style}>
                      <div className='modal-dialog' role='document' style={{maxWidth: width + 'px'}}>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title'>Order</h4>
                          </div>
                          <div className='modal-body' style={{maxHeight: height + 'px', overflowY: 'auto'}}>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <OrderProductsTable products={ this.props.order.selectedProductsList } />
                                </div>
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={(event) => this.onCancel(event)}>Cancel</button>
                            <button type='button' className='btn btn-primary'>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-backdrop fade in'></div>
                 </div>
               )
    }
}

export default OrderModal;