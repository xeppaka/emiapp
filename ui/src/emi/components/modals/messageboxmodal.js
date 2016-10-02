import React, { PropTypes } from 'react';

class MessageBoxModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose(event) {
        this.props.hideModal();
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
                            <button type='button' className='close' aria-label='Close' onClick={(event) => this.onClose(event)}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title'>No products selected!</h4>
                          </div>
                          <div className='modal-body' style={{maxHeight: height + 'px', overflowY: 'auto'}}>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h5>No products selected!</h5>
                                </div>
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={(event) => this.onClose(event)}>Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-backdrop fade in'></div>
                 </div>
               )
    }
}

export default MessageBoxModal;