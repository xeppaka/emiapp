import { connect } from 'react-redux';
import CustomerMain from '../components/customer/customermain';
import { bootstrapCustomer } from '../state/warehouse/warehouseactions';

const mapStateToProps = (state) => {
    return { }
};

const mapDispatchToProps = (dispatch) => {
    return {
        bootstrapCustomer: () => dispatch(bootstrapCustomer())
    }
};

const CustomerMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerMain);

export default CustomerMainContainer;
