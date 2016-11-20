import React, { PropTypes } from 'react';
import SaveProductsTable from './saveproductstable';
import Notification from './notification';

class SaveModificationsModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(event) {
        this.props.hideModal();
    }

    onSubmit(event) {
        this.props.submitOrder();
    }

    render() {
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let modalHeight = $(window).height() * 0.55;
        let modalWidth = $(window).width() * 0.8;
        // let divFeedbackClass = this.props.order.emailValid ? 'has-success' : 'has-danger';
        // let inputFeedbackClass = this.props.order.emailValid ? 'form-control-success' : 'form-control-danger';

        return (
            <div>
                <div className='modal fade in' style={style}>
                    <div className='modal-dialog' role='document' style={{maxWidth: modalWidth + 'px'}}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>Save products</h4>
                            </div>
                            <div className='modal-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <form>
                                            <Notification notification={this.props.notification}
                                                          setSendNotification={this.props.setSendNotification}
                                                          setNotificationText={this.props.setNotificationText}
                                            />
                                            <SaveProductsTable products={this.props.products} />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary btn-sm' onClick={(event) => this.onCancel(event)}>Cancel</button>
                                <span>&nbsp;&nbsp;</span>
                                <button type='button' className='btn btn-primary' disabled={false} onClick={(event) => this.onSubmit(event)}>{'Save'}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade in' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default SaveModificationsModal;