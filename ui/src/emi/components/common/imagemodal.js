import React, { PropTypes } from 'react';

class ImageModal extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancel(event) {
        this.props.onHideModal();
    }

    render() {
        let style = {display: 'block', zIndex: this.props.zIndex + 1};
        let modalHeight = $(window).height() * 0.65;
        let title = this.props.title;
        let imageLink = this.props.imageLink;

        return (
            <div>
                <div className='modal fade show' style={style}>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title'>{title}</h4>
                                <button type='button' className='close' aria-label='Close' onClick={(event) => this.onCancel(event)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body' style={{maxHeight: modalHeight + 'px', overflowY: 'auto', marginTop: '7px'}}>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <img style={{maxHeight: modalHeight * 0.92}} src={imageLink} />
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary btn-sm' onClick={(event) => this.onCancel(event)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop fade show' style={{zIndex: this.props.zIndex}} />
            </div>
        )
    }
}

export default ImageModal;
