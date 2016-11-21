import React, { PropTypes } from 'react';
import OrderModalContainer from '../../containers/ordermodalcontainer';
import SaveProductsModalContainer from '../../containers/saveproductsmodalcontainer';
import MessageBoxModal from './messageboxmodal';

class Modals extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.modals.map((modal, idx) => {
                        let zIndex = idx * 2;
                        switch (modal.type) {
                            case 'SAVE_MODIFICATIONS_MODAL':
                                return <SaveProductsModalContainer key={modal.id} hideModal={() => this.props.hideModal(modal.id)} modalId={modal.id} zIndex={zIndex} />;
                            case 'PRODUCTS_ORDER_MODAL':
                                return <OrderModalContainer key={modal.id} hideModal={() => this.props.hideModal(modal.id)} modalId={modal.id} zIndex={zIndex} />;
                            case 'MESSAGE_BOX_MODAL':
                                return <MessageBoxModal key={modal.id} hideModal={() => this.props.hideModal(modal.id)} title={modal.title} text={modal.text} modalId={modal.id} zIndex={zIndex} />;
                            default:
                                return null;
                        }
                    })
                }
            </div>
        )
    }
}

export default Modals;