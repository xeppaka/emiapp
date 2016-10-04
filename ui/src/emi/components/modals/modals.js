import React, { PropTypes } from 'react';
import OrderModalContainer from '../../containers/ordermodalcontainer';
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
                            case 'PRODUCTS_ORDER_MODAL':
                                return <OrderModalContainer key={modal.id} hideModal={() => this.props.hideModal(modal.id)} submitOrder={() => this.props.submitOrder(modal.id)} zIndex={zIndex} />;
                            case 'MESSAGE_BOX_MODAL':
                                return <MessageBoxModal key={modal.id} hideModal={() => this.props.hideModal(modal.id)} title={modal.title} text={modal.text} zIndex={zIndex} />;
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