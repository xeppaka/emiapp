import { connect } from 'react-redux';
import SaveCategoriesModal from '../components/admin/save/categories/savecategoriesmodal';
import { saveCategories } from '../state/admin/adminactions';
import { modifiedCategoriesSelector } from '../state/selectors/admin/admincategoriesselector';

const mapStateToProps = (state) => {
    return {
        categories: modifiedCategoriesSelector(state),
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