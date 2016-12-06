import React, { PropTypes } from 'react';
import SaveCategoriesTable from './savecategoriestable';

class SaveCategoriesModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        this.props.onSave(this.props.modalId);
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
                                <button type='button' className='close'
                                        aria-label='Close'
                                        onClick={this.props.onHideModal}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>Save categories</h4>
                            </div>
                            <div className='modal-body'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <SaveCategoriesTable categories={this.props.categories} />
                                    </div>
                                </div>
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
                <div className='modal-backdrop fade in' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default SaveCategoriesModal;