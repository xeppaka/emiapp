import React, { PropTypes } from 'react';
import OrderModal from '../order/ordermodal';
import MessageBoxModal from './messageboxmodal';

class Modals extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.modals.map((modal) => {
                        switch (modal.type) {
                            case 'PRODUCTS_ORDER_MODAL':
                                return <OrderModal key={modal.id} hideModal={() => this.props.hideModal(modal.id)} order={modal.order} />;
                            case 'MESSAGE_BOX_MODAL':
                                return <MessageBoxModal key={modal.id} hideModal={() => this.props.hideModal(modal.id)} id={modal.id} text={modal.text} />;
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