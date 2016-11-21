import { connect } from 'react-redux';
import { showSaveModificationsModal } from '../state/modals/modalsactions';
import { resetModifications } from '../state/admin/adminactions';
import { modifiedProductsCountSelector } from '../state/selectors/adminselector';
import AdminTotal from '../components/admin/admintotal';

const mapStateToProps = (state) => {
    let modifiedProductsCount = modifiedProductsCountSelector(state);

    return {
        productsModified: modifiedProductsCount,
        canSave: modifiedProductsCount > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetModifications: () => dispatch(resetModifications()),
        saveModifications: () => dispatch(showSaveModificationsModal())
    }
};

const AdminTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTotal);

export default AdminTotalContainer;