import React, { PropTypes } from 'react';
import SaveCategoriesTable from './savecategoriestable';

class SaveCategoriesModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        this.props.onSave(this.props.modalId);
    }

    renderCreatedCategories() {
        if (this.props.categories.createdCategories.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Created Categories:</h5>
                    <SaveCategoriesTable categories={this.props.categories.createdCategories}/>
                </div>
            )
        } else {
            return null;
        }
    }

    renderModifiedCategories() {
        if (this.props.categories.modifiedCategories.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Modified Categories:</h5>
                    <SaveCategoriesTable categories={this.props.categories.modifiedCategories} />
                </div>
            )
        } else {
            return null;
        }
    }

    renderDeletedCategories() {
        if (this.props.categories.deletedCategories.length > 0) {
            return (
                <div className='form-group row'>
                    <h5>Deleted Categories:</h5>
                    <SaveCategoriesTable categories={this.props.categories.deletedCategories} />
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let tablesMaxHeight = $(window).height() * 0.65;
        let modalMaxWidth = $(window).width() * 0.8;

        return (
            <div>
                <div className='modal fade in' style={style}>
                    <div className='modal-dialog' role='document' style={{maxWidth: modalMaxWidth + 'px'}}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' aria-label='Close' onClick={this.props.onHideModal}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                <h4 className='modal-title'>Save categories</h4>
                            </div>
                            <div className='modal-body'>
                                    <form style={{maxHeight: tablesMaxHeight + 'px', overflowY: 'auto'}}>
                                        <div className='container-fluid'>
                                            { this.renderCreatedCategories() }
                                            { this.renderModifiedCategories() }
                                            { this.renderDeletedCategories() }
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
                <div className='modal-backdrop fade in' style={{zIndex: this.props.zIndex}}></div>
            </div>
        )
    }
}

export default SaveCategoriesModal;