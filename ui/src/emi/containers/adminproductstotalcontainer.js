import { connect } from 'react-redux';
import { showSaveProductsModal } from '../state/modals/modalsactions';
import { resetProducts } from '../state/admin/adminactions';
import { modifiedProductsCountSelector } from '../state/selectors/adminselector';
import AdminTotal from '../components/admin/productstable/adminproductstotal';

const mapStateToProps = (state) => {
    let modifiedProductsCount = modifiedProductsCountSelector(state);

    return {
        productsModified: modifiedProductsCount,
        canSave: modifiedProductsCount > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetModifications: () => dispatch(resetProducts()),
        saveModifications: () => dispatch(showSaveProductsModal())
    }
};

const AdminProductsTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTotal);

export default AdminProductsTotalContainer;