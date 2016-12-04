import { connect } from 'react-redux';
import { showSaveCategoriesModal } from '../state/modals/modalsactions';
import { resetCategories } from '../state/admin/adminactions';
import { modifiedCategoriesCountSelector } from '../state/selectors/adminselector';
import AdminCategoriesTotal from '../components/admin/categories/admincategoriestotal';

const mapStateToProps = (state) => {
    let modifiedCategoriesCount = modifiedCategoriesCountSelector(state);

    return {
        categoriesModified: modifiedCategoriesCount,
        canSave: modifiedCategoriesCount > 0
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onResetCategories: () => dispatch(resetCategories()),
        onSaveCategories: () => dispatch(showSaveCategoriesModal())
    }
};

const AdminCategoriesTotalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminCategoriesTotal);

export default AdminCategoriesTotalContainer;