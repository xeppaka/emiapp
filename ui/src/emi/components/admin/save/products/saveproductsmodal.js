import React, { PropTypes } from 'react';
import SaveProductsTable from './saveproductstable';
import Notification from './notification';

class SaveProductsModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        this.props.onSaveModifications(this.props.modalId);
    }

    renderCreatedProducts() {
        if (this.props.products.createdProducts.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Created Products:</h5>
                    <SaveProductsTable products={this.props.products.createdProducts}/>
                </div>
            )
        } else {
            return null;
        }
    }

    renderModifiedProducts() {
        if (this.props.products.modifiedProducts.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Modified Products:</h5>
                    <SaveProductsTable products={this.props.products.modifiedProducts} />
                </div>
            )
        } else {
            return null;
        }
    }

    renderDeletedProducts() {
        if (this.props.products.deletedProducts.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Deleted Products:</h5>
                    <SaveProductsTable products={this.props.products.deletedProducts} />
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        let notification = this.props.notification;
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let tablesMaxHeight = $(window).height() * 0.65;
        let modalMaxWidth = $(window).width() * 0.8;

        return (
            <div>
                <div className='modal fade show' style={style}>
                    <div className='modal-dialog' role='document' style={{maxWidth: modalMaxWidth + 'px'}}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' aria-label='Close' onClick={this.props.onHideModal}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>Save products</h4>
                            </div>
                            <div className='modal-body'>
                                <form style={{maxHeight: tablesMaxHeight + 'px', overflowY: 'auto'}}>
                                    <div className='container-fluid'>
                                        <Notification notification={notification}
                                                      setSendNotification={this.props.onSetSendNotification}
                                                      setNotificationText={this.props.onSetNotificationText}
                                        />
                                        { this.renderCreatedProducts() }
                                        { this.renderModifiedProducts() }
                                        { this.renderDeletedProducts() }
                                    </div>
                                </form>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary btn-sm' onClick={this.props.onHideModal}>Cancel</button>
                                <span>&nbsp;&nbsp;</span>
                                <button type='button' className='btn btn-primary'
                                        disabled={this.props.saving}
                                        onClick={(event) => this.onSave()}>{this.props.saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade show' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default SaveProductsModal;