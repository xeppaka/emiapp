import { connect } from 'react-redux';
import SaveCategoriesModal from '../components/admin/save/categories/savecategoriesmodal';
import { saveCategories } from '../state/admin/adminactions';
import { modifiedCategoriesListSelector } from '../state/selectors/admin/admincategoriesselector';

const mapStateToProps = (state) => {
    return {
        categories: modifiedCategoriesListSelector(state),
        saving: state.admin.saving
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (saveModalId) => dispatch(saveCategories(saveModalId))
    }
};

const SaveCategoriesModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveCategoriesModal);

export default SaveCategoriesModalContainer;