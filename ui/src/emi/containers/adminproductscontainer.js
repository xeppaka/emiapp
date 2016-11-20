import { connect } from 'react-redux';
import AdminProductsTable from '../components/admin/productstable/adminproductstable';
import { adminProductsSelector } from '../state/selectors/productsselector';
import { setProductName, setProductPrice } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    return {
        products: adminProductsSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductName: (productId, name) => {
            dispatch(setProductName(productId, name));
        },
        setProductPrice: (productId, price) => {
            dispatch(setProductPrice(productId, price));
        }
    }
};

const AdminProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProductsTable);

export default AdminProductsContainer;