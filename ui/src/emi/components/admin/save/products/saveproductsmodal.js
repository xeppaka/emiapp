import React, { PropTypes } from 'react';
import SaveProductsTable from './saveproductstable';
import Notification from './notification';

class SaveProductsModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(event) {
        this.props.onHideModal();
    }

    onSave(event) {
        this.props.onSaveModifications(this.props.modalId);
    }

    renderCreatedProducts() {
        if (this.props.products.createdProducts.length > 0) {
            return (
                <div>
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
                <div>
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
                <div>
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
                <div className='modal fade in' style={style}>
                    <div className='modal-dialog' role='document' style={{maxWidth: modalMaxWidth + 'px'}}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>Save products</h4>
                            </div>
                            <div className='modal-body'>
                                <div className='container-fluid'>
                                    <form>
                                        <Notification notification={notification}
                                                      setSendNotification={this.props.setSendNotification}
                                                      setNotificationText={this.props.setNotificationText}
                                        />
                                        <div className='form-group row' style={{maxHeight: tablesMaxHeight + 'px', overflowY: 'auto'}}>
                                            { this.renderCreatedProducts() }
                                            { this.renderModifiedProducts() }
                                            { this.renderDeletedProducts() }
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary btn-sm' onClick={(event) => this.onCancel(event)}>Cancel</button>
                                <span>&nbsp;&nbsp;</span>
                                <button type='button' className='btn btn-primary' disabled={this.props.saving} onClick={(event) => this.onSave(event)}>{this.props.saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade in' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default SaveProductsModal;